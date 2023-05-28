import { useEffect } from 'react';

export default function useInfoLog(): void {
  useEffect(() => {
    console.log('%cHi Everyone!', 'color: lime; font-size: 50px');
    console.log(
      "%cHey if you're reading this you should hire me to build your next website, web or mobile app. I am an awesome engineer! So instead of snooping around in the console, call me! You can reach me at 404.670.0059. Leave a message or text if I don't answer. --Naeem",
      'color: lime; font-size: 30px'
    );
  }, []);
}
