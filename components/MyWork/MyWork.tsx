'use client';
import styles from './MyWork.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';
import PageHeader from '../PageHeader/PageHeader';
import useCart from '@/hooks/useCart';

export default function MyWork(): JSX.Element {
  const { viewWrapper } = sharedStyles;
  const [, cart] = useCart();
  const { disclaimer, zeroMarginBottom, workWrapper } = styles;
  return (
    <section id="myWork" className={workWrapper}>
      <PageHeader headerName="work" hideLinks={false} />
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
