import { useEffect } from 'react';

export default function useInfoLog(): void {
  useEffect(() => {
    console.log('%cHi Everyone!', 'color: lime; font-size: 50px');
    console.log(
      "%cLife is short, so make it good. Love yourself, do for others, and take it but take lite. --Naeem",
      'color: lime; font-size: 30px'
    );
  }, []);
}
