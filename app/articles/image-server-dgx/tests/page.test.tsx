import '@testing-library/jest-dom';
import Article from '../page';

const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  permanentRedirect: (path: string) => mockRedirect(path),
}));

describe('image-server-dgx page', () => {
  it('redirects to image-server-ai', async () => {
    await Article();
    expect(mockRedirect).toHaveBeenCalledWith('/articles/image-server-ai');
  });
});
