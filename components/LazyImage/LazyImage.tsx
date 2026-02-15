'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react';
import Modal from '@/components/Modal/Modal';
import styles from '@/components/Modal/Modal.module.scss';

export default function LazyImage({ loading = 'lazy', onClick, style, ...props }: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = (event: ReactMouseEvent<HTMLSpanElement>) => {
    onClick?.(event as unknown as ReactMouseEvent<HTMLImageElement>);
    setIsOpen(true);
  };

  const handleKeyOpen = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const modalImageProps = { ...props };
  if ('width' in modalImageProps) {
    delete (modalImageProps as { width?: number }).width;
  }
  if ('height' in modalImageProps) {
    delete (modalImageProps as { height?: number }).height;
  }

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyOpen}
        aria-label={props.alt ? `Open ${props.alt}` : 'Open image'}
        style={{ display: 'inline-block', cursor: 'zoom-in' }}
      >
        <Image loading={loading} {...props} style={{ ...style }} />
      </span>
      <Modal
        isOpen={isOpen}
        setModalOpen={() => setIsOpen(false)}
        hideClose={false}
        wrapperClassName={styles.fullscreenWrapper}
        containerClassName={styles.fullscreenContainer}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              maxHeight: '800px',
            }}
          >
            <Image
              {...modalImageProps}
              alt={props.alt}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              loading="eager"
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
