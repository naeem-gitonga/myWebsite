import fs from 'fs';
import path from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import Project from '../Project';
import { projects, type Project as ProjectType } from '../projects';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className, target }: { children: React.ReactNode; href: string; className?: string; target?: string }) => (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  ),
}));

jest.mock('../../LazyImage/LazyImage', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { unoptimized, ...rest } = props as React.ImgHTMLAttributes<HTMLImageElement> & {
      unoptimized?: boolean;
    };
    return <img {...rest} />;
  },
}));

describe('Project', () => {
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

  it('defaults project link text and target when not provided', () => {
    const project: ProjectType = {
      projectImg: '/images/test.webp',
      title: 'Test Project',
      projectDes: 'Desc',
      projectStack: 'polls',
      projectLink: '/test',
      gitHubLink: '/github',
    };

    render(<Project project={project} />);

    const liveLink = screen.getByText('Live site');
    expect(liveLink).toHaveAttribute('href', '/test');
    expect(liveLink).toHaveAttribute('target', '_blank');
  });

  it('exports projects list', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('renders imageWrapper as the outermost element', () => {
    const project: ProjectType = {
      projectImg: '/images/test.webp',
      title: 'Test Project',
      projectDes: 'Desc',
      projectStack: 'polls',
    };
    const { container } = render(<Project project={project} />);
    expect(container.firstChild).toHaveClass('imageWrapper');
  });
});

describe('Project image squareness (CSS contract)', () => {
  const scss = fs.readFileSync(
    path.resolve(__dirname, '../Project.module.scss'),
    'utf8'
  );

  it('imageWrapper has equal width and height on desktop', () => {
    // Extract direct properties only (stops before the first nested @media / > span block)
    const topLevel = scss.match(/\.imageWrapper\s*\{([^{]+)/)?.[1] ?? '';
    const width = topLevel.match(/width:\s*(\d+)px/)?.[1];
    const height = topLevel.match(/height:\s*(\d+)px/)?.[1];
    expect(width).toBeDefined();
    expect(height).toBeDefined();
    expect(width).toBe(height);
  });

  it('imageWrapper enforces square aspect-ratio on mobile', () => {
    expect(scss).toContain('@media');
    expect(scss).toContain('aspect-ratio: 1 / 1');
  });

  it('projectImage covers its container', () => {
    const projectImageBlock = scss.match(/\.projectImage\s*\{([^}]+)\}/)?.[1] ?? '';
    expect(projectImageBlock).toContain('width: 100%');
    expect(projectImageBlock).toContain('height: 100%');
    expect(projectImageBlock).toContain('object-fit: cover');
  });

  it('LazyImage span wrapper fills imageWrapper height', () => {
    expect(scss).toContain('> span');
    const spanBlock = scss.match(/>\s*span\s*\{([^}]+)\}/)?.[1] ?? '';
    expect(spanBlock).toContain('width: 100%');
    expect(spanBlock).toContain('height: 100%');
  });
});
