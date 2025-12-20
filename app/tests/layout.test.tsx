import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout, { metadata } from '../layout';

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <script data-testid="next-script" {...props} />
  ),
}));

describe('root layout', () => {
  it('renders children inside body', () => {
    const { container, getByText } = render(
      <RootLayout>
        <div>child</div>
      </RootLayout>
    );
    expect(getByText('child')).toBeInTheDocument();
  });

  it('exports metadata', () => {
    expect(metadata.title).toBe('Home | Naeem Gitonga');
  });
});
