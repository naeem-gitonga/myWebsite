import { fireEvent, render, screen } from '@testing-library/react';
import { projectStackMap } from '../StackItems/StackItems';
import Project from '../Project/Project';
import type { Project as ProjectType } from '../Project/projects';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className, target }: { children: React.ReactNode; href: string; className?: string; target?: string }) => (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  ),
}));

jest.mock('../LazyImage/LazyImage', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { unoptimized, ...rest } = props as React.ImgHTMLAttributes<HTMLImageElement> & {
      unoptimized?: boolean;
    };
    return <img {...rest} />;
  },
}));

describe('project stack and card', () => {
  it('renders a stack item tooltip', () => {
    const { container } = render(<div>{projectStackMap.imageserver[0]}</div>);
    const tooltip = container.querySelector('.tooltipContainer') as HTMLElement;
    fireEvent.mouseOver(tooltip);
    expect(screen.getByText('Python')).toBeInTheDocument();
    fireEvent.mouseOut(tooltip);
    expect(screen.queryByText('Python')).toBeNull();
  });

  it('renders project links and handles image load', () => {
    const project: ProjectType = {
      projectImg: '/images/test.webp',
      title: 'Test Project',
      projectDes: 'Desc',
      projectStack: 'polls',
      projectLink: '/test',
      gitHubLink: '/github',
      linkText: 'Live site',
      target: '_self',
    };

    const { container } = render(<Project project={project} />);
    const img = container.querySelector('img') as HTMLImageElement;
    fireEvent.load(img);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Live site')).toHaveAttribute('href', '/test');
    expect(screen.getByText('Source code')).toHaveAttribute('href', '/github');
  });
});
