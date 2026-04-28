import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import * as analyticsApi from '@/utils/analyticsApi';
import AdminDashboard from '../AdminDashboard';

jest.mock('next/navigation');
jest.mock('@/hooks/useEnvConfig', () => ({
  __esModule: true,
  default: () => ({ SITE_URL: 'https://www.naeemgitonga.com' }),
}));
jest.mock('@/utils/analyticsApi', () => ({
  fetchAnalyticsData: jest.fn(),
  fetchTimelineData: jest.fn(),
}));

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ data, children }: any) => <div data-testid="bar-chart">{children}</div>,
  LineChart: ({ data, children }: any) => <div data-testid="line-chart">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Sankey: ({ data, children }: any) => <div data-testid="sankey">{children}</div>,
  Pie: () => null,
  Bar: () => null,
  Line: () => null,
  Cell: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

global.fetch = jest.fn();

describe('AdminDashboard component', () => {
  const mockPush = jest.fn();
  const mockAnalyticsData = [
    {
      timestamp: '2026-03-10T10:00:00Z',
      page: '/home',
      fromwebsite: 'google',
      sessionid: 'session1',
      device: 'mobile',
      eventtype: 'view',
      views: '100',
      unique_visitors: '50',
      unique_ips: '45',
    },
    {
      timestamp: '2026-03-10T11:00:00Z',
      page: '/blog',
      fromwebsite: 'direct',
      sessionid: 'session2',
      device: 'desktop',
      eventtype: 'click',
      views: '200',
      unique_visitors: '100',
      unique_ips: '95',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (analyticsApi.fetchAnalyticsData as jest.Mock).mockResolvedValue(mockAnalyticsData);
    (analyticsApi.fetchTimelineData as jest.Mock).mockResolvedValue([]);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ subscribers: [], count: 0 }),
    });
  });

  it('renders dashboard header and tab nav', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Admin/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
  });

  it('shows notifications view when Notifications tab is clicked', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Notifications/i }));

    expect(screen.getByText(/Select Article/i)).toBeInTheDocument();
    expect(screen.getByText(/Compose Notification/i)).toBeInTheDocument();
  });

  it('renders filter section', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByLabelText(/Month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Day/i)).toBeInTheDocument();
  });

  it('displays stat cards when data is available', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Views')).toBeInTheDocument();
      expect(screen.getByText('Unique Visitors')).toBeInTheDocument();
      expect(screen.getByText('Unique IPs')).toBeInTheDocument();
      expect(screen.getByText('Unique Sessions')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders data table', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Raw Data')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('logout button triggers logout function', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    });

    const logoutBtn = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });
  });
});
