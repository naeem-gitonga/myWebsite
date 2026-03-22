import { render, screen } from '@testing-library/react';
import ArticleTileView from '../ArticleTileView';

jest.mock('../../SlotMachine/SlotMachine', () => ({
  __esModule: true,
  default: ({
    items,
    renderItem,
  }: {
    items: any[];
    renderItem: (item: any, i: number) => React.ReactNode;
  }) => <>{items.map((item: any, i: number) => renderItem(item, i))}</>,
}));

jest.mock('../../ArticleTile/ArticleTile', () => ({
  __esModule: true,
  default: () => <div data-testid="article-tile" />,
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('../../ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('../../SubscriberBanner/SubscriberBanner', () => ({
  __esModule: true,
  default: () => <div data-testid="subscriber-banner" />,
}));

jest.mock('@/utils/articles', () => ({
  articles: [
    {
      title: 'A',
      imageUrl: 'img-a',
      lengthInMinutes: 5,
      publishedDate: 'Jan 1',
      articleUrl: '/a',
    },
    {
      title: 'B',
      imageUrl: 'img-b',
      lengthInMinutes: 3,
      publishedDate: 'Feb 1',
      articleUrl: '/b',
    },
  ],
}));

describe('ArticleTileView', () => {
  it('renders shared header', () => {
    render(<ArticleTileView sharedHeader />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('myArticles');
  });

  it('renders section header when sharedHeader is false', () => {
    render(<ArticleTileView sharedHeader={false} />);
    expect(screen.getByText('myArticles')).toBeInTheDocument();
    expect(screen.queryByTestId('page-header')).not.toBeInTheDocument();
  });

  it('renders return arrow', () => {
    render(<ArticleTileView sharedHeader />);
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });

  it('renders subscriber banner', () => {
    render(<ArticleTileView sharedHeader />);
    expect(screen.getByTestId('subscriber-banner')).toBeInTheDocument();
  });

  it('passes all articles to SlotMachine for rendering', () => {
    render(<ArticleTileView sharedHeader />);
    expect(screen.getAllByTestId('article-tile')).toHaveLength(2);
  });
});
