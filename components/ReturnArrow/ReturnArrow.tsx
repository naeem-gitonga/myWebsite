import { useEffect } from 'react';
import styles from './ReturnArrow.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function ReturnArrow(): JSX.Element {
  const { upArrowLink, arrowBox, fas } = styles;
  useEffect(() => {
    const windowScroll = window.pageYOffset;
    const arrowElement = document.getElementById('arrow');

    showArrow(arrowElement, windowScroll);
  }, []);

  const scrollTop = (yOff: any): void => {
    function scroll(n: any) {
      if (n > 5) {
        setTimeout(function () {
          const newLocation = n / 1.03;
          window.scrollTo(0, newLocation);
          scroll(newLocation);
        }, 0);
      }
    }

    scroll(yOff);
  };

  const showArrow = (arrowElement: any, windowScroll: any): void => {
    if (windowScroll < 500) {
      arrowElement.style.display = 'none';
    }

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        arrowElement.style.display = 'initial';
      } else {
        arrowElement.style.display = 'none';
      }
    });
  };
  return (
    <a
      className={upArrowLink}
      onClick={() => {
        const yOffset = window.pageYOffset;
        scrollTop(yOffset);
      }}
    >
      <div id="arrow" className={arrowBox}>
        <FontAwesomeIcon className={fas} icon={faAngleUp} />
      </div>
    </a>
  );
}
