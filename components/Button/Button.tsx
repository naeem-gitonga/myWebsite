import { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children: unknown;
  cb: () => void;
  className?: string | undefined;
};

export default function Button(props: ButtonProps): JSX.Element {
  const {} = styles;
  const { children, cb, className } = props;
  return (
    <button
      className={className}
      onClick={(e): void => {
        e.preventDefault();
        cb();
      }}
    >
      {children as ReactNode}
    </button>
  );
}
