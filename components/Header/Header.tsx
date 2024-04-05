import Link from 'next/link';
import Envelope from 'components/Icons/Envelope';
import Bitcoin from 'components/Icons/Bitcoin';
import styles from './Header.module.scss';

type HeaderProps = {
  setWhichSection: any;
};

export default function Header(props: HeaderProps): JSX.Element {
  const { setWhichSection } = props;
  const showShop = process.env.NEXT_PUBLIC_SHOW_SHOP == 'true';
  return (
    <div id="header">
      <div className={styles.wrapper}>
        <header>
          <div id="top-div" className={styles['main-nav']}>
            <h1 className={styles.myName}>Naeem Gitonga</h1>
            <ul className={styles.firstUl}>
              <li id="aboutMe-link" onClick={() => setWhichSection('aboutMe')}>
                <Link className={styles.firstUlLink} href="/about">
                  aboutMe
                </Link>
              </li>
              <li id="work-link">
                <Link href="/work" className={styles.firstUlLink}>
                  myWork
                </Link>
              </li>
              <li id="articles-link">
                <Link href="/articles" className={styles.firstUlLink}>
                  myArticles
                </Link>
              </li>
              {showShop && (
                <li id="shop-link">
                  <Link href="/shop" className={styles.firstUlLink}>
                    shop
                  </Link>
                </li>
              )}
            </ul>
            <div className={styles.links}>
              <Link href="#contact" onClick={() => setWhichSection('contact')}>
                <Envelope />
              </Link>

              <Link
                id="donate-link"
                href="#donate"
                rel="noreferrer"
                onClick={() => setWhichSection('donate')}
              >
                <Bitcoin />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
