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

jest.mock('../../Modal/Modal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}));

jest.mock('../../StartMenu/StartMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="start-menu" />,
}));

describe('Header', () => {
  it('renders header and opens the start menu', () => {
    render(<Header />);

    expect(screen.getByText('Naeem Gitonga')).toBeInTheDocument();
    const enterButton = screen.getByText('ENTER');
    fireEvent.click(enterButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('start-menu')).toBeInTheDocument();
  });
});
