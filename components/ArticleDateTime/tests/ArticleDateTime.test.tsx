import { render, screen } from '@testing-library/react';
import { ArticleDateTime } from '../ArticleDateTime';

jest.mock('@/utils/articles', () => ({
  articles: [
    {
      title: 'A',
      imageUrl: 'img-a',
      lengthInMinutes: 5,
      publishedDate: 'Jan 1, 2024',
      articleUrl: '/articles/a',
    },
  ],
}));

describe('ArticleDateTime', () => {
  it('renders article date info', () => {
    render(<ArticleDateTime imageUrl="img-a" />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2024')).toBeInTheDocument();
  });
});
