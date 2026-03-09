import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AiRuinedMyApp from '../AiRuinedMyApp';

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="page-header" />,
}));

jest.mock('@/components/Tags/Tags', () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tags">{tags.join(', ')}</div>
  ),
}));

jest.mock('@/components/ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-datetime" />,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('AiRuinedMyApp component', () => {
  it('renders the article title', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByRole('heading', { level: 1, name: /AI Ruined My App/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByText(/A cautionary tale about letting the machine drive/i)).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    render(<AiRuinedMyApp />);
    const image = screen.getByAltText(/AI and Application Development/i);
    expect(image).toBeInTheDocument();
  });

  it('renders main section headings', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByRole('heading', { level: 2, name: /Falling Asleep at the Wheel/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Building with AI/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /The Critical Mistake/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /The Lesson Learned/i })).toBeInTheDocument();
  });

  it('renders MongoDB code example', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getAllByText(/_id.*ObjectId/)).toHaveLength(3);
  });

  it('renders page header and navigation', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByTestId('tags')).toBeInTheDocument();
    expect(screen.getByText(/AI.*Claude.*Architecture/)).toBeInTheDocument();
  });

  it('renders article date and time', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByTestId('article-datetime')).toBeInTheDocument();
  });

  it('renders contact form link', () => {
    render(<AiRuinedMyApp />);
    const contactLink = screen.getByRole('link', { name: /contact form/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders ToLive.ai link', () => {
    render(<AiRuinedMyApp />);
    const toliveLink = screen.getByRole('link', { name: /ToLive\.ai/i });
    expect(toliveLink).toBeInTheDocument();
  });

  it('contains key concepts in text', () => {
    render(<AiRuinedMyApp />);
    expect(screen.getByText(/Claude is a really good Junior engineer/i)).toBeInTheDocument();
    expect(screen.getAllByText(/85% of the way there/i)).toHaveLength(2);
  });
});
