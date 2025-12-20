import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Document from '../_document';

jest.mock('next/document', () => ({
  Html: ({ children }: { children: React.ReactNode }) => <html>{children}</html>,
  Head: ({ children }: { children: React.ReactNode }) => <head>{children}</head>,
  Main: () => <div data-testid="main" />,
  NextScript: () => <div data-testid="next-script" />,
}));

describe('Document', () => {
  it('renders document shell', () => {
    const { container, getByTestId } = render(<Document />);
    expect(getByTestId('main')).toBeInTheDocument();
    expect(getByTestId('next-script')).toBeInTheDocument();
  });
});
