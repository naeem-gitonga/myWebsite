import styles from './IdleLoopHero.module.scss';

type IdleLoopHeroProps = {
  className?: string;
  preload?: 'auto' | 'metadata' | 'none';
};

export default function IdleLoopHero({
  className,
  preload = 'metadata',
}: IdleLoopHeroProps): React.JSX.Element {
  const wrapperClassName = className
    ? `${styles.wrapper} ${className}`
    : styles.wrapper;

  return (
    <div className={wrapperClassName}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload={preload}
        poster="/images/idle-loop-poster.webp"
        aria-label="Idle loop animation"
      >
        <source src="/videos/idle-loop.webm" type="video/webm" />
        <source src="/videos/idle-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
