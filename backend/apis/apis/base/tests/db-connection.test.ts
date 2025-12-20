/** @jest-environment node */
import { ServerErrors } from '../../../declarations/enums';

jest.mock('mongodb', () => ({
  MongoClient: { connect: jest.fn() },
  Db: jest.fn(),
}));

let MongoClient: { connect: jest.Mock };

describe('db-connection', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    MongoClient = (jest.requireMock('mongodb') as {
      MongoClient: { connect: jest.Mock };
    }).MongoClient;
    MongoClient.connect.mockReset();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  const loadModule = () => {
    let mod: typeof import('../db-connection');
    jest.isolateModules(() => {
      mod = require('../db-connection');
    });
    return mod;
  };

  it('returns undefined connection when DB_CONNECTION is missing', async () => {
    delete process.env.DB_CONNECTION;
    const { connect } = loadModule();
    const result = await connect();

    expect(result.db).toBeUndefined();
    expect(result.client).toBeUndefined();
    expect(result.close).toBeUndefined();
  });

  it('connects and caches the db', async () => {
    process.env.DB_CONNECTION = 'mongodb://localhost:27017';
    process.env.DB_NAME = 'testdb';
    const close = jest.fn();
    const db = { name: 'testdb' };
    MongoClient.connect.mockResolvedValue({
      db: jest.fn(() => db),
      close,
    });

    const { connect, retryConnection } = loadModule();
    const result = await connect();

    expect(MongoClient.connect).toHaveBeenCalledWith(
      process.env.DB_CONNECTION,
      { maxPoolSize: 50 }
    );
    expect(result.db).toEqual(db);
    expect(result.close).toBe(close);

    const cached = await retryConnection(2);
    expect(cached.db).toBe(db);
    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
  });

  it('retries until it throws when no connection is established', async () => {
    delete process.env.DB_CONNECTION;
    const { retryConnection } = loadModule();

    await expect(retryConnection(1)).rejects.toThrow(
      ServerErrors.CannotConnectDb
    );
  });
});
