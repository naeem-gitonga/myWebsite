import { render, screen } from '@testing-library/react';
import ClaudeCodeDiedRip from '../ClaudeCodeDiedRip';

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('@/components/ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/components/Tags/Tags', () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tags">{tags.join(',')}</div>
  ),
}));

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

describe('ClaudeCodeDiedRip', () => {
  it('renders the article heading and subheading', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByText('Claude Died, RIP')).toBeInTheDocument();
    expect(screen.getByText('I built a coding CLI. Then it beat the original.')).toBeInTheDocument();
  });

  it('renders the page header and return arrow', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('article');
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });

  it('renders the llama.cpp section', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByText('What is llama.cpp?')).toBeInTheDocument();
  });

  it('renders the memory problem section', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByText('The Memory Problem')).toBeInTheDocument();
  });

  it('renders the Claude quote about layers', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByText(/Self-attention — each token looks at all other tokens/)).toBeInTheDocument();
    expect(screen.getAllByText(/— Claude Sonnet 4\.6/).length).toBeGreaterThan(0);
  });

  it('renders article tags', () => {
    render(<ClaudeCodeDiedRip />);
    const tags = screen.getByTestId('tags').textContent ?? '';
    expect(tags).toContain('quantization');
    expect(tags).toContain('llama.cpp');
    expect(tags).toContain('DGX Spark');
    expect(tags).toContain('CLI tools');
  });

  it('renders the benchmark section and Qwen result', () => {
    render(<ClaudeCodeDiedRip />);
    expect(screen.getByText('The Benchmark')).toBeInTheDocument();
    expect(screen.getByText(/Their model's plan is better than mine/)).toBeInTheDocument();
  });
});
