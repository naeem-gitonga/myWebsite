import styles from './Header.module.css';
import Link from 'next/link';
type HeaderProps = {
  setWhichSection: any;
};
export default function Header(props: HeaderProps): JSX.Element {
  const { setWhichSection } = props;
  return (
    <div id="header">
      <div className={styles.wrapper}>
        <header>
          <div id="top-div" className={styles['main-nav']}>
            <h1 className={styles.myName}>Jaha Naeem Gitonga</h1>
            <h5 className={styles.myTitle}>Tech Lead</h5>
            <ul className={styles.firstUl}>
              <li id="aboutMe-link" onClick={() => setWhichSection('aboutMe')}>
                <Link className={styles.firstUlLink} href="#aboutMe">
                  aboutMe
                </Link>
              </li>
              <li id="work-link" onClick={() => setWhichSection('myWork')}>
                <Link href="#myWork" className={styles.firstUlLink}>
                  myWork
                </Link>
              </li>
              <li
                id="articles-link"
                onClick={() => setWhichSection('articles')}
              >
                <Link href="#articles" className={styles.firstUlLink}>
                  myArticles
                </Link>
              </li>
            </ul>
            <div className={styles.links}>
              <Link href="#contact" onClick={() => setWhichSection('contact')}>
                <i
                  className={`fa fa-envelope fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                href="/interstitial?url=https://www.linkedin.com/in/ngitonga/&where=LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className={`fa fa-linkedin-square fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                href="/interstitial?url=https://www.github.com/JNaeemGitonga&where=Github"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className={`fa fa-github fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                id="donate-link"
                href="#donate"
                rel="noreferrer"
                onClick={() => setWhichSection('donate')}
              >
                <i
                  className={`fa fa-btc fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
