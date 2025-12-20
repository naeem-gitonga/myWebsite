import { render, screen } from '@testing-library/react';
import LoadingScreen from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading screen text', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('LOADING NAEEMGITONGA.COM')).toBeInTheDocument();
  });
});
