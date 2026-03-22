import { render, screen } from '@testing-library/react';
import MyWork from '../MyWork';

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

jest.mock('../../Project/Project', () => ({
  __esModule: true,
  default: ({ project }: { project: { title: string } }) => (
    <div data-testid="project">{project.title}</div>
  ),
}));

jest.mock('../../Project/projects', () => ({
  projects: [
    { title: 'Project A', projectStack: 'polls' },
    { title: 'Project B', projectStack: 'gab' },
  ],
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('MyWork', () => {
  it('renders page header with work title', () => {
    render(<MyWork />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('work');
  });

  it('renders disclaimer text', () => {
    render(<MyWork />);
    expect(screen.getByText('* I built it myself')).toBeInTheDocument();
    expect(screen.getByText('** I worked on it with a team')).toBeInTheDocument();
  });

  it('passes all projects to SlotMachine for rendering', () => {
    render(<MyWork />);
    expect(screen.getAllByTestId('project')).toHaveLength(2);
  });

  it('renders project titles', () => {
    render(<MyWork />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });
});
