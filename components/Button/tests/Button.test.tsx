import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('fires callback and prevents default', () => {
    const cb = jest.fn();
    render(<Button cb={cb}>Click</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(cb).toHaveBeenCalled();
  });
});
