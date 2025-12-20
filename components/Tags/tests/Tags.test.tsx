import { render, screen } from '@testing-library/react';
import Tags from '../Tags';

describe('Tags', () => {
  it('renders tags list', () => {
    render(<Tags tags={['one', 'two']} />);
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
