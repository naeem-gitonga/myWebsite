'use client';
import { useRef, useEffect, useMemo } from 'react';
import styles from './SlotMachine.module.scss';

type SlotMachineProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function SlotMachine<T>({
  items,
  renderItem,
}: SlotMachineProps<T>): React.JSX.Element {
  const { slotWindow, slotScroll, viewWrapper } = styles;
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopedItems = useMemo(
    () => [...items, ...items, ...items],
    [items]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const mobileOffset = window.innerWidth <= 500 ? 125 : 0;
      const third = el.scrollHeight / 3;
      el.scrollTop = third - mobileOffset;
    });

    const handleScroll = () => {
      const mobileOffset = window.innerWidth <= 500 ? 125 : 0;
      const third = el.scrollHeight / 3;
      const adjustedThird = third - mobileOffset;
      if (el.scrollTop < adjustedThird) {
        el.scrollTop += third;
      } else if (el.scrollTop > adjustedThird + third) {
        el.scrollTop -= third;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={slotWindow}>
      <div className={slotScroll} ref={scrollRef} data-testid="slot-scroll">
        <div className={viewWrapper}>
          {loopedItems.map((item, i) => renderItem(item, i))}
        </div>
      </div>
    </div>
  );
}
