import styles from './MyWork.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';

export default function MyWork(): JSX.Element {
  const { sectionHeader, viewWrapper } = sharedStyles;
  const { disclaimer, zeroMarginBottom } = styles;
  return (
    <section id="myWork">
      <h2 className={sectionHeader}>myWork</h2>
      <p className={`${disclaimer} ${zeroMarginBottom}`}>* I built it myself</p>
      <p className={styles.disclaimer}>** I worked on it with a team</p>
      <div className={viewWrapper}>
        {projects.map((p: ProjectObj) => (
          <Project project={p} key={p.projectStack} />
        ))}
      </div>
    </section>
  );
}
