import { fireEvent, render, screen } from '@testing-library/react';
import { projectStackMap } from '../StackItems';

describe('StackItems', () => {
  it('renders a stack item tooltip', () => {
    const { container } = render(<div>{projectStackMap.imageserver[0]}</div>);
    const tooltip = container.querySelector('.tooltipContainer') as HTMLElement;
    fireEvent.mouseOver(tooltip);
    expect(screen.getByText('Python')).toBeInTheDocument();
    fireEvent.mouseOut(tooltip);
    expect(screen.queryByText('Python')).toBeNull();
  });

  it('renders shutdownsync stack items with Go and Bash', () => {
    const { container } = render(<div>{projectStackMap.shutdownsync}</div>);
    const tooltips = container.querySelectorAll('.tooltipContainer');

    fireEvent.mouseOver(tooltips[0]);
    expect(screen.getByText('Go')).toBeInTheDocument();
    fireEvent.mouseOut(tooltips[0]);

    fireEvent.mouseOver(tooltips[1]);
    expect(screen.getByText('Bash')).toBeInTheDocument();
  });
});
