'use client';
import PageHeader from '../PageHeader/PageHeader';
import styles from './AboutMe.module.scss';
import Link from 'next/link';

export default function AboutMe(): JSX.Element {
  const { aboutMe, headshot, about, textCenter, aboutMeWrapper } = styles;
  return (
    <div id="aboutMe" className={aboutMeWrapper}>
      <PageHeader headerName="aboutMe" hideLinks={false} />
      <div className={textCenter}>
        <div
          id="standard"
          data-alt="Naeem Gitonga headshot"
          className={headshot}
        />
      </div>
      <div className={aboutMe}>
        <p className={about}>
          Peace, I&apos;m Jaha Naeem Gitonga, but you can call me Naeem. I am
          from Clinton, NC &#40;born and raised&#41;. For all you recruiters out
          there, that means I do not need a work sponsorship to work in the USA,
          next question. I&apos;ve lead teams to deliver software, being
          responsible for guiding and overseeing the technical aspects of
          projects, collaborating with stakeholders and ensuring the team&apos;s
          adherence to best practices, as well as making key technical
          decisions.
        </p>
        <p className={about}>
          I build enterprise web applications. I teach software engineering,
          DevOps, and mentor students in coding a boot camp with GTNG
          Foundation, where the focus is the JavaScript MERN stack, AWS and a
          few other technologies. Outside of coding, I do more art. Yeah
          that&apos;s right--programming a computer, building apps and websites
          is an art!
        </p>
        <p className={about}>
          I enjoy designing applications, employing new technologies to create
          event driven systems. I am an author. I have written two books:{' '}
          <Link className="link" href="/item?item_id=1">
            Program Your Life
          </Link>
          ,{' '}
          <Link className="link" href="/item?item_id=2">
            Rapid Back-End
          </Link>
          . I write tech articles{' '}
          <Link className="link" href="/articles">
            here
          </Link>{' '}
          exploring various technologies that I know or am learning.
        </p>
        <p className={about}>
          Here you will see some samples of my work. If you hover over the
          screencaptures you&apos;ll see info about the app. Click on{' '}
          <span className="link">Live site</span> and you&apos;ll be able to
          play around with some stuff.
        </p>
        <p className={about}>
          Please, if you would like to work with me or just stopped by look
          around, click on the envelope icon above and drop me a line or two.
          Or, reach out to me on LinkedIn I will be sure to follow up. Enjoy and
          thanks for dropping by!
        </p>
      </div>
    </div>
  );
}
