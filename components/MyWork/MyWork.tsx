import styles from './MyWork.module.css';
import sharedStyles from '../SharedCss/SharedCss.module.css';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';

export default function MyWork(): JSX.Element {
  const { sectionHeader } = sharedStyles;
  const { disclaimer, myWorkWrapper } = styles;
  return (
    <section id="myWork" className={`project`}>
      <h2 className={sectionHeader}>myWork</h2>
      <p className={disclaimer}>* by the name means that I built it myself</p>
      <p className={styles.disclaimer}>
        ** by the name means that I worked on it with a team
      </p>
      <div className={myWorkWrapper}>
        {projects.map((p: ProjectObj) => (
          <Project project={p} key={p.projectStack} />
        ))}
      </div>
      <div className="border-bottom"></div>
    </section>
  );
}
