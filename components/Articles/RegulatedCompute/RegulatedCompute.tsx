'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import IdleLoopHero from '@/components/IdleLoopHero/IdleLoopHero';

export default function RegulatedCompute(): React.JSX.Element {
  const { innerWrapper, imageWrapper, altText, text } = articleStyles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="regulated-compute" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Regulated Compute: Chasing H100s for a Real-Time Avatar</h1>
        <ArticleDateTime imageUrl="regulatedcompute" />
        <div className={imageWrapper}>
          <LazyImage
            alt="Frustrated engineer staring at a laptop"
            loader={imageLoader}
            src="/images/frustrated-man.webp"
            width={1024}
            height={1024}
            style={{ objectFit: 'contain', maxWidth: '65%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}>The reality of waiting for GPU quotas</p>
        </div>

        <p className={text}>
          In less than two weeks, I built a real-time AI Conversational Speech Avatar. The project is
          the prototype for the business that my TI:GER group and I built. I deviated a bit from using
          the Speech Avatar by Azure and decided to &ldquo;roll my own&rdquo;. The model that produces the
          real-time Avatar requires five H100 GPUs, enter the big cloud providers.
        </p>

        <p className={text}>
          I have been trying to get capacity on AWS for the past five days. The perception
          (real/imagined) is that H100 capacity is in so high demand that capacity is limited and
          &ldquo;hard&rdquo; to come by. Ok, and unlike other instances <code>p5.48xlarge</code> instances are
          not readily available to the independent entrepreneur. That&apos;s right! If you went to AWS
          and created an account today, you would not be able to spin up that instance class without
          begin granted permission first.
        </p>

        <p className={text}>
          I have spent the last five days making support case after support case, appeal after appeal,
          email after email, phone call after phone call, to get the proper quota to be able to create
          an on-demand <code>p5.48xlarge</code> EC2 instance and still do not have the quota for each
          US availability zone. After three days they did finally approve me for <code>us-east-1</code>
          and <code>us-west-2</code>. Now for the lay person this means that they have not approved me
          to use their computers across all of their US regions.
        </p>

        <p className={text}>I got one message the other day that said... well, you read it.</p>
        <div className={imageWrapper}>
          <LazyImage
            alt="Screenshot of a cloud provider quota response"
            loader={imageLoader}
            src="/images/regulated-compute-1.webp"
            width={973}
            height={496}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
          />
          <p className={altText}>One of several quota replies</p>
        </div>

        <p className={text}>
          Like I need your help. There was even one instance where they approved me for a quota of 8
          but the required quota for the instance that I need is 192. It makes no sense at all. That
          was one that I had to appeal. I started to include the following in the original quota
          request. We&apos;ll see what that gets me.
        </p>
        <div className={imageWrapper}>
          <LazyImage
            alt="Screenshot of a quota request explanation"
            loader={imageLoader}
            src="/images/regulated-compute-2.webp"
            width={972}
            height={203}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
          />
          <p className={altText}>The statement I began adding to requests</p>
        </div>

        <h2>Regulated Compute</h2>
        <p className={text}>
          I am a credentialed user, and my account age will show that I have years using the platform.
          I can handle whatever I take on. But hey, this isn&apos;t just about me or AWS. I experienced
          this type of gate keeping from all of the major cloud providers and some of the smaller ones.
          AWS was the most frustrating because I&apos;ve used their services for almost a decade. For
          whatever reason it is done. The technology is not as democratized as one AWS executive
          preaches. And to get what I need, I got to continue learning (silver lining).
        </p>

        <p className={text}>
          Compute is regulated. I had to get it from a smaller provider, and their process was more
          streamlined. I did not have to jump through so many hoops. I have the money to pay for what
          I use, and I use what I need. AWS, GCP, and Azure will not miss the few hundred dollars that
          I spend developing my application but for the engineers out there for some things we have to
          find better options and they are out there.
        </p>

        <h2>Final Takeaway</h2>
        <p className={text}>
          It helps to include in the request the use case like I included above,
          but that is still no guarantee that they will allow you to use their computers to do your
          work.
        </p>

        <IdleLoopHero />
        <p className={text}>You may recognize the above image. It's the idle video like real-time speech
          avatars use during inference pauses or simple idle time. That one was created using my
          real-time avatar model from my profile picture. My children love it. My five
          year old refers to it as &ldquo;daddy's talking picture.&rdquo;
        </p>

        <p className={text}>
          Another gotcha when first attempting to use a large instance at AWS is that if terraforming
          the instance, you may get an error that is extremely misleading. Take a look at the following
          error message:
        </p>

        <p className={text}>[image will be place here this is placeholder text]</p>

        <p className={text}>
          Just reading that you would assume that well, I can just come back another time and try
          again. But the truth could be that you may not have enough quota to make the instance. And it took AWS
          an hour to give that message. Talk about a long feedback loop. After trying this in all of
          the availability zones, I contacted AWS and was told that I indeed did not have sufficient
          quota to make the instance. But I didn&apos;t know that. 
          That was four hours wasted. I was super unhappy.
        </p>

        <p className={text}>
          I now have a source of compute, I will keep you updated on the real-time inference. There are
          still some things to work out in the cloud regarding distributed inference. That&apos;s what
          I&apos;m currently working through. It cost me about $200 yesterday for a few hours. It ain&apos;t
          cheap, so give me some time.
        </p>
        
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Regulated Compute',
              'H100',
              'AWS',
              'GCP',
              'Azure',
              'GPU',
              'Cloud Infrastructure',
              'Startups',
              'MLOps',
              'Quotas',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
