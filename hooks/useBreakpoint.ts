import { useState, useEffect, useCallback } from 'react';

export const MEDIA_SM = 480;
export const MEDIA_MD = 740;
export const MEDIA_LG = 1024;

const getDeviceSize = () => {
  const { innerWidth: width } = window;

  if (width >= MEDIA_LG) {
    return 'lg';
  }
  if (width >= MEDIA_MD) {
    return 'md';
  }
  if (width >= MEDIA_SM) {
    return 'sm';
  }

  return 'xs';
};

function throttle(func: any, duration: any) {
  let throttled = false;
  let queued = false;

  return function (...args: any) {
    if (throttled) {
      queued = true;
      return;
    }

    throttled = true;
    // @ts-ignore
    func.apply(this, args);

    setTimeout(() => {
      throttled = false;

      if (queued) {
        queued = false;
        // @ts-ignore
        func.apply(this, args);
      }
    }, duration);
  };
}

function useGlobalEventListener(type: string, handler: any) {
  useEffect(() => {
    window.addEventListener(type, handler);

    return () => window.removeEventListener(type, handler);
  }, [handler, type]);
}

export default function useBreakpoint(): string {
  const [size, setSize] = useState(false ? 'xs' : 'lg');

  const handleResize = useCallback(() => {
    setSize(getDeviceSize());
  }, []);

  useGlobalEventListener('resize', throttle(handleResize, 100));

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return size;
}
