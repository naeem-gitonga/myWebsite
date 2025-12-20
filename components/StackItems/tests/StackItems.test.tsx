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
});
