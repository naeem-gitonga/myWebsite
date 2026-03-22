'use client';
import { useRef, useEffect } from 'react';
import styles from './MyWork.module.scss';
import { Project as ProjectObj, projects } from '../Project/projects';
import Project from '../Project/Project';
import PageHeader from '../PageHeader/PageHeader';

const loopedProjects = [...projects, ...projects, ...projects];

export default function MyWork(): React.JSX.Element {
  const {
    disclaimer,
    zeroMarginBottom,
    workWrapper,
    slotWindow,
    slotScroll,
    viewWrapper,
    slotItem,
  } = styles;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight / 3;
    });

    const handleScroll = () => {
      const third = el.scrollHeight / 3;
      if (el.scrollTop < third) {
        el.scrollTop += third;
      } else if (el.scrollTop > third * 2) {
        el.scrollTop -= third;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="myWork" className={workWrapper}>
      <PageHeader headerName="work" hideLinks={false} />
      <p className={`${disclaimer} ${zeroMarginBottom}`}>* I built it myself</p>
      <p className={disclaimer}>** I worked on it with a team</p>
      <div className={slotWindow}>
        <div className={slotScroll} ref={scrollRef}>
          <div className={viewWrapper}>
            {loopedProjects.map((p: ProjectObj, i: number) => (
              <div key={`${i}-${p.projectStack}`} className={slotItem}>
                <Project project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
