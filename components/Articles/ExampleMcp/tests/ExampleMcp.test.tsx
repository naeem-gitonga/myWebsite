import { render, screen } from '@testing-library/react';
import ExampleMcp from '../ExampleMcp';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

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

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

jest.mock('@/components/Tags/Tags', () => ({
  __esModule: true,
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="tags">{tags.join(', ')}</div>
  ),
}));

describe('ExampleMcp', () => {
  it('renders the article heading and subheading', () => {
    render(<ExampleMcp />);

    expect(screen.getByText('Example MCP')).toBeInTheDocument();
    expect(
      screen.getByText('Understanding the Model Context Protocol')
    ).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    render(<ExampleMcp />);
    const heroImage = screen.getByAltText('MCP README Summary Server');

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/images/example-mcp.webp');
  });

  it('renders the three primitives section', () => {
    render(<ExampleMcp />);

    expect(screen.getByText('The Three Primitives')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Prompts')).toBeInTheDocument();
  });

  it('renders the architecture section with image', () => {
    render(<ExampleMcp />);

    expect(screen.getByText('Architecture')).toBeInTheDocument();
    const archImage = screen.getByAltText(
      'MCP Architecture diagram showing Claude Code as MCP Host'
    );
    expect(archImage).toBeInTheDocument();
    expect(archImage).toHaveAttribute('src', '/images/mcp-architecture.webp');
  });

  it('renders the JSON-RPC section', () => {
    render(<ExampleMcp />);

    expect(screen.getByText('JSON-RPC 2.0')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<ExampleMcp />);

    expect(screen.getByTestId('tags')).toHaveTextContent('MCP');
    expect(screen.getByTestId('tags')).toHaveTextContent('Model Context Protocol');
    expect(screen.getByTestId('tags')).toHaveTextContent('Claude');
  });
});
