/** @jest-environment node */
import BaseService from '../base-service';
import { ServerErrors } from '../../../declarations/enums';
import { ObjectId } from 'bson';

jest.mock('@aws-sdk/client-s3', () => {
  const sendMock = jest.fn();
  return {
    S3Client: jest.fn(() => ({ send: sendMock })),
    GetObjectCommand: jest.fn((params) => ({ params })),
    PutObjectCommand: jest.fn((params) => ({ params })),
    __sendMock: sendMock,
  };
});

const { __sendMock } = jest.requireMock('@aws-sdk/client-s3') as {
  __sendMock: jest.Mock;
};

const createEvent = (path: string, method = 'GET') =>
  ({ path, httpMethod: method } as any);

describe('BaseService', () => {
  beforeEach(() => {
    __sendMock.mockReset();
  });

  it('maps exact route matches', () => {
    const service = new BaseService(createEvent('/api/items'), {
      GET: { list: '/api/items' },
    });

    expect(service.mapRequestRouteToMethod()).toBe('list');
  });

  it('maps dynamic route params and stores object ids', () => {
    const id = new ObjectId().toHexString();
    const service = new BaseService(createEvent(`/api/items/${id}`), {
      GET: { getById: '/api/items/{id}' },
    });

    expect(service.mapRequestRouteToMethod()).toBe('getById');
    const ids = service.getAllIds();
    expect(Object.keys(ids)).toEqual(['{id}']);
    expect(ids['{id}']).toBeInstanceOf(ObjectId);
  });

  it('throws when no route matches', () => {
    const service = new BaseService(createEvent('/api/missing'), {
      GET: { list: '/api/items' },
    });

    expect(() => service.mapRequestRouteToMethod()).toThrow(
      `${ServerErrors.RouteNotFound} /api/missing`
    );
  });

  it('coerces filter params to intended types', () => {
    const objectId = new ObjectId().toHexString();
    const extraId = new ObjectId().toHexString();
    const filter = {
      deleted: 'true',
      checkin: '2024-01-01',
      id: objectId,
      page: '2',
      role: '3',
      objectIds: `${objectId},${extraId}`,
    } as Record<string, unknown>;

    const service = new BaseService(createEvent('/api/items'));
    const result = service.handleFilter(filter);

    expect(result.deleted).toBe(true);
    expect(result.checkin).toBeInstanceOf(Date);
    expect(result.id).toBeInstanceOf(ObjectId);
    expect(result.page).toBe(2);
    expect(result.role).toBe(3);
    expect(result.objectIds).toHaveLength(2);
    expect((result.objectIds as ObjectId[])[0]).toBeInstanceOf(ObjectId);
  });

  it('coerces boolean false values', () => {
    const filter = { deleted: 'false' } as Record<string, unknown>;
    const service = new BaseService(createEvent('/api/items'));

    const result = service.handleFilter(filter);

    expect(result.deleted).toBe(false);
  });

  it('handles s3 get and create calls', async () => {
    __sendMock.mockResolvedValueOnce({
      Body: {
        transformToString: jest
          .fn()
          .mockResolvedValueOnce(JSON.stringify([{ id: 1 }])),
      },
    });
    const service = new BaseService(createEvent('/api/items'));

    const data = await service.get({ Bucket: 'bucket', Key: 'key' });
    expect(data).toEqual([{ id: 1 }]);

    __sendMock.mockResolvedValueOnce({ ok: true });
    const result = await service.create({
      Bucket: 'bucket',
      Key: 'key',
      Body: 'body',
    });
    expect(result).toEqual({ ok: true });
  });
});
