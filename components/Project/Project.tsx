import { projectStackMap } from './StackItems';
import { Project as ProjectObj } from './projects';
import styles from './Project.module.css';

type ProjectProps = { project: ProjectObj; key: string };

export default function Project(props: ProjectProps): JSX.Element {
  const { project, key } = props;
  const {
    imageWrapper,
    overlay,
    projectDescription,
    projectImage,
    text,
    title,
  } = styles;
  return (
    <div className={imageWrapper} key={key}>
      <img
        className={projectImage}
        src={project.projectImg}
        alt={`app screenshot ${project.projectStack}`}
      />
      <div className={overlay}>
        <h2 className={`${title} ${text}`}>{project.title}</h2>
        <p className={`${projectDescription} ${text}`}>{project.projectDes}</p>
        <div className="project-stack">
          {projectStackMap[project.projectStack]}
        </div>
        <div className="project-links">
          <ul>
            <li className="project-link project-link-live">
              <a
                className="pro-link text"
                href={project.projectLink}
                target="_blank"
              >
                Live demo
              </a>
            </li>
            <li className="project-link project-link-github">
              <a
                className="pro-link text"
                href={project.gitHubLink}
                target="_blank"
              >
                Source code
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
