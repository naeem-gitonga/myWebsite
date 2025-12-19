import { fireEvent, render, screen } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('shows and hides tooltip text on hover', () => {
    const { container, queryByText } = render(
      <Tooltip text="help">
        <span>hover me</span>
      </Tooltip>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(queryByText('help')).toBeNull();
    fireEvent.mouseOver(wrapper);
    expect(screen.getByText('help')).toBeInTheDocument();
    fireEvent.mouseOut(wrapper);
    expect(queryByText('help')).toBeNull();
  });
});
