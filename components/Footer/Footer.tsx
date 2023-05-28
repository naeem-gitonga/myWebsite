import styles from './Footer.module.css';

export default function Footer(): JSX.Element {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const formattedYear = year.padStart(4, '0');
  return (
    <div id="footer">
      <footer className={styles.footer}>GTNG {formattedYear}</footer>
    </div>
  );
}
