import { render, screen } from '@testing-library/react';
import AboutMe from '../AboutMe';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => <img alt={props.alt} src={props.src} />,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock PageHeader
jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('AboutMe', () => {
  it('renders the aboutMe wrapper with correct id', () => {
    const { container } = render(<AboutMe />);
    const wrapper = container.querySelector('#aboutMe');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders PageHeader with aboutMe prop', () => {
    render(<AboutMe />);
    const header = screen.getByTestId('page-header');
    expect(header).toHaveTextContent('aboutMe');
  });

  it('renders certification images', () => {
    render(<AboutMe />);
    expect(screen.getByAltText('Certified Kubernetes Administrator (CKA) logo')).toBeInTheDocument();
    expect(screen.getByAltText('AWS DevOps Professional logo')).toBeInTheDocument();
  });

  it('renders education section with university logos', () => {
    render(<AboutMe />);
    expect(screen.getByAltText('Georgia Tech Logo')).toBeInTheDocument();
    expect(screen.getByAltText('UNCW logo')).toBeInTheDocument();
  });

  it('renders links to books and articles', () => {
    render(<AboutMe />);
    expect(screen.getByRole('link', { name: /Program Your Life/i })).toHaveAttribute('href', '/item?item_id=1');
    expect(screen.getByRole('link', { name: /Rapid Back-End/i })).toHaveAttribute('href', '/item?item_id=2');
    const hereLinks = screen.getAllByRole('link', { name: /here/i });
    expect(hereLinks).toHaveLength(2);
    expect(hereLinks[0]).toHaveAttribute('href', '/articles');
    expect(hereLinks[1]).toHaveAttribute('href', '/contact');
  });
});
