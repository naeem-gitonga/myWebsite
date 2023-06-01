import styles from './Footer.module.scss';

export default function Footer(): JSX.Element {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const formattedYear = year.padStart(4, '0');
  const { footer, footerWrapper } = styles;
  return (
    <div id="footer" className={footerWrapper}>
      <footer className={footer}>GTNG {formattedYear}</footer>
    </div>
  );
}
