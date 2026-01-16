import { render, screen } from '@testing-library/react';
import SpeechAvatar from '../SpeechAvatar';

describe('SpeechAvatar', () => {
  it('renders video with default url', () => {
    render(<SpeechAvatar />);
    const video = screen.getByLabelText('Speech avatar demo video');
    expect(video).toBeInTheDocument();

    const source = video.querySelector('source');
    expect(source).toHaveAttribute(
      'src',
      'https://d2j3yisnywcb30.cloudfront.net/pix/careers_u_demo_compressed.mp4'
    );
  });

  it('renders video with custom url', () => {
    const customUrl = 'https://example.com/custom-video.mp4';
    render(<SpeechAvatar videoUrl={customUrl} />);
    const video = screen.getByLabelText('Speech avatar demo video');

    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', customUrl);
  });

  it('renders video with controls', () => {
    render(<SpeechAvatar />);
    const video = screen.getByLabelText('Speech avatar demo video');
    expect(video).toHaveAttribute('controls');
  });

  it('renders the heading', () => {
    render(<SpeechAvatar />);
    expect(
      screen.getByRole('heading', { name: /Real-time.*Conversational Speech Avatar/i })
    ).toBeInTheDocument();
  });

  it('renders the commentary about H100 GPU', () => {
    render(<SpeechAvatar />);
    expect(
      screen.getByText(/H100 x 8 GPU which costs about \$50 per hour/i)
    ).toBeInTheDocument();
  });
});
