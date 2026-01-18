import { useState, useEffect } from 'react';
import styles from './Modal.module.scss';
import XMark from '../Icons/XMark';
import { MEDIA_SM } from '@/hooks/useBreakpoint';

type ModalProps = {
  hideClose: boolean;
  isOpen: boolean;
  children: unknown;
  setModalOpen: () => void;
};
export default function Modal(props: ModalProps): React.JSX.Element {
  const { isOpen, children, setModalOpen, hideClose } = props;
  const { modalWrapper, container, closeButton, closeButtonOutterWrapper, slideIn, slideOut } =
    styles;
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < MEDIA_SM);
    };
    checkScreenSize();
    setIsReady(true);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isOpen && isReady) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen, isReady]);

  useEffect(() => {
    if (!isOpen && shouldRender) {
      if (isSmallScreen) {
        setIsClosing(true);
        const timeoutId = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
        }, 300);
        return () => clearTimeout(timeoutId);
      }
      setShouldRender(false);
    }
  }, [isOpen, shouldRender, isSmallScreen]);

  useEffect(() => {
    const body = document.getElementById('body');
    if (!body) return;

    if (shouldRender) {
      body.classList.add('overflowHidden');
    } else {
      body.classList.remove('overflowHidden');
    }

    return () => {
      body.classList.remove('overflowHidden');
    };
  }, [shouldRender]);

  const handleClose = () => {
    if (isSmallScreen) {
      setIsClosing(true);
      setTimeout(() => {
        setShouldRender(false);
        setModalOpen();
      }, 300);
    } else {
      setShouldRender(false);
      setModalOpen();
    }
  };

  if (!shouldRender) {
    return <></>;
  }

  const containerClass = isSmallScreen
    ? `${container} ${isClosing ? slideOut : slideIn}`
    : container;

  return (
    <div id="modal" className={modalWrapper}>
      {isSmallScreen && !hideClose && (
        <div className={closeButtonOutterWrapper}>
          <div className={closeButton} onClick={handleClose}>
            <XMark fill="grey" />
          </div>
        </div>
      )}
      <div className={containerClass}>
        {!isSmallScreen && (
          <div className={closeButtonOutterWrapper}>
            {!hideClose && (
              <div className={closeButton} onClick={handleClose}>
                <XMark fill="grey" />
              </div>
            )}
          </div>
        )}
        {children as React.JSX.Element}
      </div>
    </div>
  );
}
