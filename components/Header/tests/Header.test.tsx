import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className, onClick, id }: { children: React.ReactNode; href: string; className?: string; onClick?: () => void; id?: string }) => (
    <a href={href} className={className} onClick={onClick} id={id}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('renders header links and handles donate click', () => {
    process.env.NEXT_PUBLIC_SHOW_SHOP = 'true';
    const setWhichSection = jest.fn();
    render(<Header setWhichSection={setWhichSection} />);

    expect(screen.getByText('aboutMe')).toBeInTheDocument();
    expect(screen.getByText('myWork')).toBeInTheDocument();
    expect(screen.getByText('myArticles')).toBeInTheDocument();
    expect(screen.getByText('shop')).toBeInTheDocument();

    const donateLink = document.querySelector('#donate-link') as HTMLElement;
    fireEvent.click(donateLink);
    expect(setWhichSection).toHaveBeenCalledWith('donate');
  });

  it('hides shop link when disabled', () => {
    process.env.NEXT_PUBLIC_SHOW_SHOP = 'false';
    render(<Header setWhichSection={jest.fn()} />);
    expect(screen.queryByText('shop')).toBeNull();
  });
});
