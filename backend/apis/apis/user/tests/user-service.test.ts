/** @jest-environment node */
import UserService from '../user-service';

const createEvent = (body: unknown) => ({
  body: JSON.stringify(body),
} as any);

describe('UserService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('writes users to the development prefix', async () => {
    process.env.NODE_ENV = 'development';
    const createSpy = jest
      .spyOn(UserService.prototype, 'create')
      .mockResolvedValue('ok');

    const service = new UserService(createEvent({}));
    await service.createUser({ _id: 'user-1' } as any);

    expect(createSpy).toHaveBeenCalledWith({
      Bucket: 'rapidbackend',
      Key: 'development-users/user-1.json',
      Body: JSON.stringify({ _id: 'user-1' }),
    });
  });

  it('writes users without the development prefix in production', async () => {
    process.env.NODE_ENV = 'production';
    const createSpy = jest
      .spyOn(UserService.prototype, 'create')
      .mockResolvedValue('ok');

    const service = new UserService(createEvent({}));
    await service.createUser({ _id: 'user-2' } as any);

    expect(createSpy).toHaveBeenCalledWith({
      Bucket: 'rapidbackend',
      Key: 'users/user-2.json',
      Body: JSON.stringify({ _id: 'user-2' }),
    });
  });
});
