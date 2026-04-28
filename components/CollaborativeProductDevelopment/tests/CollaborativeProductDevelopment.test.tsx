import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CollaborativeProductDevelopment from '../CollaborativeProductDevelopment';

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="page-header" />,
}));

jest.mock('@/components/ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

describe('CollaborativeProductDevelopment', () => {
  it('renders the article title', () => {
    render(<CollaborativeProductDevelopment />);
    expect(screen.getByText('Collaborative Product Development')).toBeInTheDocument();
  });

  it('renders the page header and return arrow', () => {
    render(<CollaborativeProductDevelopment />);
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });

  it('renders the article date time', () => {
    render(<CollaborativeProductDevelopment />);
    expect(screen.getByTestId('article-date-time')).toBeInTheDocument();
  });

  it('renders key article sections', () => {
    render(<CollaborativeProductDevelopment />);
    expect(screen.getAllByText('Echo Inventory').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Design Doc' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Image Processing and Tool Calling' })).toBeInTheDocument();
  });

  it('renders the architecture image', () => {
    render(<CollaborativeProductDevelopment />);
    expect(screen.getByAltText('Echo Inventory architecture diagram')).toBeInTheDocument();
  });
});
