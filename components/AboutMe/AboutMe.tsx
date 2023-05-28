import styles from './AboutMe.module.css';

export default function AboutMe(): JSX.Element {
  const { aboutMe, headshot, about, textCenter, myWorkWrapper } = styles;
  return (
    <div id="aboutMe" className={styles['work-and-stuff']}>
      <div className={textCenter}>
        <img
          id="standard"
          className={headshot}
          src="https://d2j3yisnywcb30.cloudfront.net/pix/standardPic.jpeg"
          alt="JNG"
        />
      </div>
      <h2 className={aboutMe}>aboutMe</h2>
      <p className={about}>
        Peace, I&apos;m Jaha Naeem Gitonga, but you can call me Naeem. I am the
        tech lead. I&apos;ve been delivering software for the last six years. I
        am the founder of{' '}
        <a href="http://www.gtng.tech" className="link">
          GTNG
        </a>
        . I buld enterprise web applications. I teach software engineering,
        DevOps and mentor students in coding a boot camp with{' '}
        <a
          href="https://www.gtngfoundation.org"
          target="_blank"
          rel="noreferrer"
        >
          GTNG Foundation
        </a>
        , where focus is the JavaScript MERN stack, AWS and a few other
        technologies. Outside of coding, I do more art. Yeah that&apos;s
        right--programming a computer, building apps and websites is an art!
      </p>
      <p className={about}>
        I enjoy designing applications, employing new technologies as well as
        some older ones to create SOLID systems. I am an author. I have written
        a book{' '}
        <a
          className="link"
          href="https://www.amazon.com/Program-Your-Life-Naeem-Gitonga/dp/1733442405/ref=sr_1_1?keywords=program+your+life+jaha+naeem+gitonga&qid=1580526523&sr=8-1"
          target="_blank"
          rel="noreferrer"
        >
          Program Your Life
        </a>
        , and I write tech articles on{' '}
        <a className="link" href="https://naeemgtng.medium.com/">
          Medium
        </a>{' '}
        exploring various technologies that I know or have learned.
      </p>
      <p className={about}>
        Here you will see some samples of my work. If you hover over the
        screencaptures you&apos;ll see info about the app. Click on{' '}
        <span className="link">Live Demo</span> and you&apos;ll be able to play
        around with some stuff.
        <span className="aviso">Notice:</span> Some of those apps are demos and
        are hosted on Heroku which offers developers some <em>free</em> tools to
        show their work. So if it seems like it&apos;s taking a little long to
        load up, bear in mind that the server is starting and getting its ducks
        in a row so that you can experience the app.
      </p>
      <p className={about}>
        Please, if you would like to work with me or just to stopped by look
        around, click on the <span className="link">contactMe</span> link above
        and drop me a line or two. I will be sure to follow up. Enjoy and thanks
        for dropping by!
      </p>
    </div>
  );
}
