'use client';
import Image from 'next/image';
import Link from 'next/link';

import { imageLoader } from '@/utils/imageLoader';
import PageHeader from '../PageHeader/PageHeader';
import styles from './AboutMe.module.scss';
import IdleLoopHero from '@/components/IdleLoopHero/IdleLoopHero';

export default function AboutMe(): React.JSX.Element {
  const {
    aboutMe,
    idleLoop,
    idleLoopInner,
    about,
    textCenter,
    aboutMeWrapper,
    imageWrapper,
    subhead,
    altText,
  } = styles;
  return (
    <div id="aboutMe" className={aboutMeWrapper}>
      <PageHeader headerName="aboutMe" hideLinks={false} />
      <div className={textCenter}>
        <div className={idleLoop}>
          <IdleLoopHero className={idleLoopInner} preload="auto" />
        </div>
      </div>
      <div className={aboutMe}>
        <p className={about}>
          Peace, I&apos;m Naeem Gitonga. I am from Clinton, NC &#40;born and
          raised&#41;. I&apos;ve
          led teams to deliver software, being responsible for guiding and
          overseeing the technical aspects of projects, collaborating with
          stakeholders and ensuring the team&apos;s adherence to best practices,
          as well as making key technical decisions.
        </p>
        <h2 className={subhead}>Certifications</h2>
        <div id="certifications" className={imageWrapper}>
          <Image
            alt="Certified Kubernetes Administrator (CKA) logo"
            loader={imageLoader}
            src="/images/cka.webp"
            width={300}
            height={293}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
          />
          <Image
            alt="AWS DevOps Professional logo"
            loader={imageLoader}
            src="/images/aws-devops-pro.webp"
            width={300}
            height={300}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
          />
        </div>
        <h2 className={subhead}>More about me</h2>
        <p className={about}>
          I build enterprise applications. I practice software engineering,
          DevOps, MLOps, AI/ML, Business Development & Strategy, and mentor collegues students.
          I used to teach coding in a boot camp that I started with GTNG
          Foundation, where the focus was the JavaScript MERN stack, AWS and a
          few other technologies. Outside of coding, I do more art. Yeah
          that&apos;s right—programming a computer, building apps and websites
          is an art! I am also into General Aviation—real fly boy!
        </p>
        <p className={about}>
          Formerly I was working as a Senior MLOps engineer. I am an evening
          MBA student at Georgia Tech. I finish in May 2026.
        </p>
        <p className={about}>
          I enjoy designing and building applications &#40;not to be confused with UI design&#41;, employing
          new technologies to create event driven systems. I am an author. I
          have written two books:{' '}
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
          exploring various technologies that I know or am learning. I
          occasionally write articles, so stay tuned!
        </p>
        <p className={about}>
          Here you will see some samples of my work. If you hover over the
          screencaptures you&apos;ll see info about the app. Click on{' '}
          <span className="link">Live site</span> and you&apos;ll be able to
          play around with some stuff.
        </p>
        <h2 className={subhead}>Education</h2>
        <div id="education" className={imageWrapper}>
          <Image
            alt="Georgia Tech Logo"
            loader={imageLoader}
            src="/images/gt-logo.webp"
            width={1296}
            height={1296}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
          />
          <p className={altText}>
            Scheller MBA, TI&#x3a;GER &apos;26
          </p>
          <Image
            alt="UNCW logo"
            loader={imageLoader}
            src="/images/uncw-logo.webp"
            width={250}
            height={137}
            style={{ objectFit: 'contain'}}
          />
          <p className={altText}>UNCW Spanish, University Honors &apos;11</p>
        </div>
        <p className={about}>
          Please, if you would like to work with me or just stopped by to look
          around, click <Link href="/contact">here</Link> and drop me a line or
          two. Or, reach out to me on LinkedIn I will be sure to follow up.
          Enjoy and thanks for dropping by!
        </p>
        <div className={`${imageWrapper} ${styles.fullWidthImage}`}>
          <Image
            alt="Flying a Cessna in the cockpit"
            loader={imageLoader}
            src="/images/me-flying-cessna.webp"
            width={1200}
            height={900}
          />
          <p className={altText}>Me flying a Cessna around Stone Mountain, GA</p>
        </div>
      </div>
    </div>
  );
}
