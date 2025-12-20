import { render, screen } from '@testing-library/react';
import MyWork from '../MyWork';

jest.mock('../../Project/Project', () => ({
  __esModule: true,
  default: ({ project }: { project: { title: string } }) => (
    <div data-testid="project">{project.title}</div>
  ),
}));

jest.mock('../../Project/projects', () => ({
  projects: [
    { title: 'A', projectStack: 'polls' },
    { title: 'B', projectStack: 'gab' },
  ],
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('MyWork', () => {
  it('renders projects and disclaimers', () => {
    render(<MyWork />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('work');
    expect(screen.getByText('* I built it myself')).toBeInTheDocument();
    expect(screen.getByText('** I worked on it with a team')).toBeInTheDocument();
    expect(screen.getAllByTestId('project')).toHaveLength(2);
  });
});
