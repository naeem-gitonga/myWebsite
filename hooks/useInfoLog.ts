import { useEffect, useRef } from 'react';

export default function useInfoLog(): void {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    console.log('%cHi Everyone!', 'color: lime; font-size: 50px');
    console.log(
      "%cLife is short, so make it good. Love yourself, do for others, and take it, but take it light.",
      'color: lime; font-size: 30px'
    );
    console.log(
      "%c--Naeem",'color: lime; font-size: 30px'
    );
  }, []);
}
