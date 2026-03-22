'use client';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';
import PageHeader from '../PageHeader/PageHeader';
import SlotMachine from '../SlotMachine/SlotMachine';
import styles from './MyWork.module.scss';

export default function MyWork(): React.JSX.Element {
  const { disclaimer, fixedMargins, workWrapper, slotItem } = styles;

  return (
    <section id="myWork" className={workWrapper}>
      <PageHeader headerName="work" hideLinks={false} />
      <p className={`${disclaimer} ${fixedMargins}`}>* I built it myself</p>
      <p className={disclaimer}>** I worked on it with a team</p>
      <SlotMachine
        items={projects}
        renderItem={(p: ProjectObj, i: number) => (
          <div key={`${i}-${p.projectStack}`} className={slotItem}>
            <Project project={p} />
          </div>
        )}
      />
    </section>
  );
}
