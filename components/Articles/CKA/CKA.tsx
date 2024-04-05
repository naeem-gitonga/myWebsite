'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import seeTheLight from '../../pictures/cka.jpg';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function CKA(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, grey } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="cka" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Do I really need a CKA certification?</h1>
        <ArticleDateTime imageUrl={'expcka'} />
        <div className={imageWrapper}>
          <Image
            alt="Unsure"
            loader={imageLoader}
            src={seeTheLight}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Unsure</p>
        </div>
        <p className={text}>
          I am a software engineer — first — and I recently earned the Certified
          Kubernetes Administrator (CKA) certification. Well… good for me,
          right? This is a way to validate my skills in the public face. But
          what does it actually mean? Am I some Kubernetes (K8S) wizard now that
          I have it? Does it help me in the job market? These are a few of the
          questions that I answer below.
        </p>
        <h2>What does it actually mean?</h2>
        <p className={text}>
          Well, for one, it means that I worked. I got my feet wet with K8S back
          when I worked at Cricket Wireless in 2020. Currently, I use it daily.
          However, that wasn&apos;t enough to prepare me for the exam. We use
          K8S in conjunction with other technologies. One of those is Helm. For
          those unfamiliar, Helm is another technology that assists with some
          K8S tasks and is a whole other thing one could be great at and make
          money.
        </p>
        <p className={text}>
          Now, back to the original question. What does it actually mean? It
          means that I went on killer.sh a total of nine times at $9.99 a pop to
          take the practice tests. I studied the K8S documentation and became
          good at traversing it to find what I needed. I put in hours watching
          the KodeKloud videos and taking their practice tests and quizzes in
          addition to Pluralsight&apos;s content on K8s for about eight weeks. I
          sat for the exam twice. The first time I failed it partly because of
          the skills gap and partly because I had to accustom myself to testing
          in Linux Foundations&apos; virtual environment (it is that different).
        </p>
        <p className={text}>
          You hear about people studying, sitting for it and passing it in one
          go. Good for them! With the exception of one person that I found
          online talking about their journey to passing this milestone, none of
          them suggested killer.sh. I learn different. I needed killer.sh. This
          certification requires you to be proficient at Linux and K8S as you
          will problem solve using both. You can&apos;t memorize a set of exam
          dumps and expect to pass it. No, you actually have to problem solve
          and execute under a time limit in an environment that you may not be
          accustomed to working in. This requires a developed skills set to
          solve the types of problems that are presented to you in the exam.
        </p>
        <h2>Am I some K8S wizard now that I have it?</h2>
        <p className={text}>
          Look, K8S has 123 API resources as of this article. Then you can turn
          around and add to that by making custom ones. How long of a career do
          you have to have to be considered a &ldquo;wizard&rdquo;,
          &ldquo;SME&rdquo;, or authority on K8S? I am good at K8S as a result
          of using it daily and having obtained this certification. I am better
          than most —the CKA proves it. I solve problems using it in a way that
          someone who does not have the cert may not. And most of all… I am
          still learning. I have experience using it in an enterprise setting.
          But if I go to some other job, I&apos;ll be learning how they use it
          in their environment. Having obtained the CKA means that, I have
          learned and my capacity for learning more K8S is great. But
          that&apos;s tech. Not one of us knows it all.
        </p>
        <h2>Does it help me in the job market?</h2>
        <p className={text}>
          To my knowledge, I have not been offered any positions or
          opportunities to interview based on me having obtained this
          certification. Although for some employers, there are obvious
          <a href="https://kubernetes.io/partners/" className={grey}>
            {' '}
            benefits
          </a>
          . However, as a holder of the CKA, prior to receiving it, recruiters
          had already begun sending me DevOps related job opportunities. While I
          have not noticed anything &ldquo;in&rdquo; the job market, at work, I
          am much more comfortable answering questions about K8S. I am more
          competent and confident about various API resources. The questions I
          ask have changed from basic &ldquo;how to&rdquo; to &ldquo;why have we
          implemented…&rdquo;, &ldquo;have we considered…&rdquo;, and most
          importantly &ldquo;do we truly need…&rdquo; types of questions.
          Without a doubt, I am a better K8S administrator. And I still have
          capacity to learn and improve beyond my current competencies. To
          answer the question presented in this section, yes!
        </p>
        <h2>En fin</h2>
        <p className={text}>
          I think the following is the case, not only for this but for other
          certifications as well. You will learn the basics and have a great
          understanding of the fundamentals after having completed this exam.
          You will gain knowledge and skills that you may not have even gained
          in a year of actual K8S work, on production clusters, in an enterprise
          environment. Are you a software engineer who uses K8S, a DevOps
          engineer using it or an enthusiast? If so and you want to learn and
          prove your knowledge, then maybe you&apos;d benefit from sitting this
          exam. It is a time-consuming investment but an investment nonetheless
          that will pay dividends. I am in no way promoting it, nor any other
          technology, or course mentioned in this article. I am simply saying
          that getting my{' '}
          <a
            className={grey}
            href="https://www.credly.com/badges/8bb3e026-79c2-4a36-948a-a0fbdc30a022/public_url"
            target="_blank"
          >
            CKA
          </a>{' '}
          has helped — in one way or another.
        </p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Kubernetes',
              'Software Development',
              'DevOps',
              'CKA',
              'Software Engineering',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
