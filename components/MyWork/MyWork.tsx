import styles from './MyWork.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.css';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';

export default function MyWork(): JSX.Element {
  const { sectionHeader } = sharedStyles;
  const { disclaimer, myWorkWrapper, zeroMarginBottom } = styles;
  return (
    <section id="myWork">
      <h2 className={sectionHeader}>myWork</h2>
      <p className={`${disclaimer} ${zeroMarginBottom}`}>* I built it myself</p>
      <p className={styles.disclaimer}>** I worked on it with a team</p>
      <div className={myWorkWrapper}>
        {projects.map((p: ProjectObj) => (
          <Project project={p} key={p.projectStack} />
        ))}
      </div>
    </section>
  );
}
