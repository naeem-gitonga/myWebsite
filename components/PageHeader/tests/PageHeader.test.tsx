import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  it('renders menu button when not hidden', () => {
    render(<PageHeader headerName="home" hideLinks={false} />);
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('hides menu button when requested', () => {
    render(<PageHeader headerName="home" hideLinks />);
    expect(screen.queryByRole('button', { name: 'Open menu' })).toBeNull();
  });
});
