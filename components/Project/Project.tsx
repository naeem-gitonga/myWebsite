import { projectStackMap } from '../StackItems/StackItems';
import { Project as ProjectObj } from './projects';
import styles from './Project.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import Link from 'next/link';

type ProjectProps = { project: ProjectObj };

export default function Project(props: ProjectProps): JSX.Element {
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
      <img
        className={projectImage}
        src={project.projectImg}
        alt={`app screenshot ${project.projectStack}`}
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
