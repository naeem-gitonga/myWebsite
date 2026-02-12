'use client';

import { useState } from 'react';
import { projectStackMap } from '../StackItems/StackItems';
import { Project as ProjectObj } from './projects';
import styles from './Project.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import Link from 'next/link';
import LazyImage from '@/components/LazyImage/LazyImage';

type ProjectProps = { project: ProjectObj };

export default function Project(props: ProjectProps) {
  const { project } = props;
  const {
    padding10,
    imageWrapper,
    overlay,
    projectDescription,
    proLink,
    projectImage,
    projectLinks,
    text,
    title,
    projectStack,
    placeholderOverlay,
    placeholderHidden,
  } = styles;
  const [imageLoaded, setImageLoaded] = useState(false);
  const placeholderClasses = `${placeholderOverlay}${
    imageLoaded ? ` ${placeholderHidden}` : ''
  }`;

  return (
    <div className={imageWrapper}>
      <div className={placeholderClasses} aria-hidden="true" />
      <LazyImage
        width={350}
        height={350}
        className={projectImage}
        src={project.projectImg}
        alt={`app screenshot ${project.projectStack}`}
        unoptimized
        placeholder="empty"
        onLoad={() => setImageLoaded(true)}
      />

      <div className={overlay}>
        <div className={padding10}>
          <h2 className={`${title} ${text}`}>{project.title}</h2>
          <p className={`${projectDescription} ${text}`}>
            {project.projectDes}
          </p>
        </div>
        <div className={projectStack}>
          {projectStackMap[project.projectStack]}
        </div>
        <div className={projectLinks}>
          <ul className={sharedStyles.zeroPadding}>
            {project.projectLink && (
              <li>
                <Link
                  className={`${proLink} ${text}`}
                  href={project.projectLink}
                  target={project.target || '_blank'}
                >
                  {project.linkText || 'Live site'}
                </Link>
              </li>
            )}
            {project.secondaryLink && (
              <li>
                <Link
                  className={`${proLink} ${text}`}
                  href={project.secondaryLink}
                  target={project.secondaryTarget || '_blank'}
                >
                  {project.secondaryLinkText || 'Live site'}
                </Link>
              </li>
            )}
            {project.gitHubLink && (
              <li>
                <Link
                  className={`${proLink} ${text}`}
                  href={project.gitHubLink}
                  target="_blank"
                >
                  Source code
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
