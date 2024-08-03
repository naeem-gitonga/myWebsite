'use client';
import Image from 'next/image';
import Link from 'next/link';

import { imageLoader } from '@/utils/imageLoader';
import PageHeader from '../PageHeader/PageHeader';
import styles from './AboutMe.module.scss';

import ckaLogo from '@/components/pictures/cka.png';
import awsDevOpsProLogo from '@/components/pictures/aws-devops-pro.png';

import gtLogo from '@/components/pictures/gt-logo.png';
import uncwLogo from '@/components/pictures/uncw-logo.png';

export default function AboutMe(): JSX.Element {
  const {
    aboutMe,
    headshot,
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
        <div
          id="standard"
          data-alt="Naeem Gitonga headshot"
          className={headshot}
        />
      </div>
      <div className={aboutMe}>
        <p className={about}>
          Peace, I&apos;m Naeem Gitonga. I am from Clinton, NC &#40;born and
          raised&#41;. For all you recruiters out there, that means I do not
          need a work sponsorship to work in the USA, next question. I&apos;ve
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
            src={ckaLogo}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <Image
            alt="AWS DevOps Professional logo"
            loader={imageLoader}
            src={awsDevOpsProLogo}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
        </div>
        <h2 className={subhead}>More about me</h2>
        <p className={about}>
          I build enterprise web applications. I teach software engineering,
          DevOps, and mentor students in coding a boot camp with GTNG
          Foundation, where the focus is the JavaScript MERN stack, AWS and a
          few other technologies. Outside of coding, I do more art. Yeah
          that&apos;s right--programming a computer, building apps and websites
          is an art!
        </p>
        <p className={about}>
          Currently I'm working as a Senior MLOps engineer. I am also an evening
          MBA student at Georgia Tech. I finish in December 2025.
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
          exploring various technologies that I know or am learning. I&apos;ve
          been too busy with school and work to write new articles at the moment
          but stay tuned.
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
            src={gtLogo}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>
            Scheller MBA, Management of Information Resources and Marketing
            &apos;25
          </p>
          <Image
            alt="AWS DevOps Professional logo"
            loader={imageLoader}
            src={uncwLogo}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>UNCW Spanish, University Honors &apos;11</p>
        </div>
        <p className={about}>
          Please, if you would like to work with me or just stopped by look
          around, click <Link href="/contact">here</Link> and drop me a line or
          two. Or, reach out to me on LinkedIn I will be sure to follow up.
          Enjoy and thanks for dropping by!
        </p>
      </div>
    </div>
  );
}
