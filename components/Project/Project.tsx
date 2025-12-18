import { projectStackMap } from '../StackItems/StackItems';
import { Project as ProjectObj } from './projects';
import styles from './Project.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import Link from 'next/link';
import Image from 'next/image';

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
  } = styles;
  return (
    <div className={imageWrapper}>
      <Image
        width={350}
        height={350}
        className={projectImage}
        src={project.projectImg}
        alt={`app screenshot ${project.projectStack}`}
        loading="lazy"
        unoptimized
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANL1C4u7W+kW3upYIm2lY0cgKMDjA+VVpSlTksZiWz//2Q=="
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
