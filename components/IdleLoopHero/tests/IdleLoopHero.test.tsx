import { render, screen } from '@testing-library/react';
import IdleLoopHero from '../IdleLoopHero';

describe('IdleLoopHero', () => {
  it('renders video with poster', () => {
    render(<IdleLoopHero />);
    const video = screen.getByLabelText('Idle loop animation');
    expect(video).toHaveAttribute('poster', '/images/idle-loop-poster-new.webp');
  });
});
