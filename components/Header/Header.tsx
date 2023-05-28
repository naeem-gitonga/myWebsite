import styles from './Header.module.css';
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
                <a className={styles.firstUlLink} href="#aboutMe">
                  aboutMe
                </a>
              </li>
              <li id="work-link" onClick={() => setWhichSection('myWork')}>
                <a href="#myWork" className={styles.firstUlLink}>
                  myWork
                </a>
              </li>
              <li id="contact-link">
                <a href="/articles" className={styles.firstUlLink}>
                  articles
                </a>
              </li>
            </ul>
            <div className={styles.links}>
              <a href="#contact" onClick={() => setWhichSection('contact')}>
                <i
                  className={`fa fa-envelope fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ngitonga/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className={`fa fa-linkedin-square fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://www.github.com/JNaeemGitonga"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className={`fa fa-github fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </a>
              <a
                id="donate-link"
                href="#donate"
                rel="noreferrer"
                onClick={() => setWhichSection('donate')}
              >
                <i
                  className={`fa fa-btc fa-3x ${styles.icon}`}
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
