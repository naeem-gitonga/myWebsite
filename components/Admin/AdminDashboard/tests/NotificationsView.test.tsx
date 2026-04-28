import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationsView } from '../NotificationsView';
import { articles } from '@/utils/articles';

jest.mock('@/hooks/useEnvConfig', () => ({
  __esModule: true,
  default: () => ({ SITE_URL: 'https://www.naeemgitonga.com' }),
}));

global.fetch = jest.fn();

describe('NotificationsView', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ subscribers: [], count: 0 }),
    });
  });

  it('renders the article list and compose panel', () => {
    render(<NotificationsView />);
    expect(screen.getByText('Select Article')).toBeInTheDocument();
    expect(screen.getByText('Compose Notification')).toBeInTheDocument();
  });

  it('renders all articles from the articles list', () => {
    render(<NotificationsView />);
    articles.forEach((a) => {
      expect(screen.getByText(a.title)).toBeInTheDocument();
    });
  });

  it('shows placeholder when no article is selected', () => {
    render(<NotificationsView />);
    expect(screen.getByText(/select an article to compose/i)).toBeInTheDocument();
  });

  it('pre-fills form fields when an article is selected', () => {
    render(<NotificationsView />);
    const first = articles[0];
    fireEvent.click(screen.getByText(first.title));

    expect((screen.getByLabelText('Title') as HTMLInputElement).value).toBe(first.title);
    expect((screen.getByLabelText('URL') as HTMLInputElement).value).toBe(
      `https://www.naeemgitonga.com${first.articleUrl}`
    );
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toContain(first.publishedDate);
  });

  it('allows editing the pre-filled fields', () => {
    render(<NotificationsView />);
    fireEvent.click(screen.getByText(articles[0].title));

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Custom Title' } });
    expect(titleInput.value).toBe('Custom Title');
  });

  it('calls /api/admin/notify with the correct payload on send', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sent: 3 }),
    });

    render(<NotificationsView />);
    fireEvent.click(screen.getByText(articles[0].title));
    fireEvent.click(screen.getByRole('button', { name: /Send Notification/i }));

    await waitFor(() => {
      const notifyCall = (global.fetch as jest.Mock).mock.calls.find(([url]) => url === '/api/admin/notify');
      expect(notifyCall).toBeDefined();
      const [url, opts] = notifyCall!;
      expect(url).toBe('/api/admin/notify');
      expect(opts.method).toBe('POST');
      const body = JSON.parse(opts.body);
      expect(body.title).toBe(articles[0].title);
      expect(body.url).toContain(articles[0].articleUrl);
      expect(body.description).toBeTruthy();
    });
  });

  it('shows success message with sent count after successful send', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sent: 5 }),
    });

    render(<NotificationsView />);
    fireEvent.click(screen.getByText(articles[0].title));
    fireEvent.click(screen.getByRole('button', { name: /Send Notification/i }));

    await waitFor(() => {
      expect(screen.getByText(/sent to 5 subscribers/i)).toBeInTheDocument();
    });
  });

  it('shows no subscribers message when sent is 0', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sent: 0 }),
    });

    render(<NotificationsView />);
    fireEvent.click(screen.getByText(articles[0].title));
    fireEvent.click(screen.getByRole('button', { name: /Send Notification/i }));

    await waitFor(() => {
      expect(screen.getByText(/no subscribers to notify/i)).toBeInTheDocument();
    });
  });

  it('shows error message when send fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Unauthorized' }),
    });

    render(<NotificationsView />);
    fireEvent.click(screen.getByText(articles[0].title));
    fireEvent.click(screen.getByRole('button', { name: /Send Notification/i }));

    await waitFor(() => {
      expect(screen.getByText(/unauthorized/i)).toBeInTheDocument();
    });
  });
});
