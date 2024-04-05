'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import seeTheLight from '../../pictures/kids-eating-spaghetti.png';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ExplainServers(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, code, pre } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  // * &rdquo; &ldquo; &apos;
  return (
    <div id="servers" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Explain Servers to a 5 Year Old</h1>
        <ArticleDateTime imageUrl={'explservers'} />
        <div className={imageWrapper}>
          <Image
            alt="Kids eating pizza and pasta"
            loader={imageLoader}
            src={seeTheLight}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Kids eating pizza and pasta by Shutterstock</p>
        </div>
        <h2>What are servers?</h2>
        <p className={text}>
          If you Google &ldquo;what are servers&rdquo; a wiki page will pop up
          and have this to say:
        </p>
        <pre className={pre}>
          <code className={code}>
            {`In computing, a server is a computer program or a device that provides functionality for other programs or devices, called "clients".`}
          </code>
        </pre>
        <p className={text}>
          The client is typically another computer but can refer to the person
          using the other computer as well.
        </p>
        <h2>How do servers help us?</h2>
        <p className={text}>
          Servers are used to handle requests from the client. They do this
          through APIs.
        </p>
        <p className={text}>
          What does API stand for? &ldquo;Application Program Interface&rdquo;
          (API)
        </p>
        <p className={text}>What are APIs?</p>
        <p className={text}>
          A quick Google search will give us another wiki stating that:
        </p>
        <pre className={pre}>
          <code className={code}>
            {`An application programming interface is a computing interface which defines interactions between multiple software intermediaries. It defines the kinds of calls or requests that can be made, how to make them, the data formats that should be used, the conventions to follow, etc.`}
          </code>
        </pre>
        <p className={text}>
          You may also hear people refer to APIs as the individual routes that
          your server has defined.
        </p>
        <p className={text}>
          All of this may seem confusing now but let&apos;s try to tie it
          together with something we are already familiar with.
        </p>
        <h2>Let&apos;s explain servers to a five year old</h2>
        <p className={text}>Severs are like restaurants.</p>
        <p className={text}>
          So you go to the Italian restaurant one day. When you hit the door you
          are now the client. You are now ready to make requests. Your first
          request is to be seated.
        </p>
        <p className={text}>
          If the restaurant is busy you may end up waiting a long time to be
          seated. At some point you may get up and leave because you are tired
          of waiting. If this happens in computing, your server has just timed
          out. Not good. That would be an error, a{' '}
          <code className={code}>408</code> status code.
        </p>
        <p className={text}>
          But let&apos;s look at what would happen if you were seated in a
          timely manner. In computing, your first request was successful. To be
          more specific you just made a <code className={code}>GET</code>{' '}
          request and the server has responded by returning a table to you. The
          status code for this success is <code className={code}>200</code>.
        </p>
        <p className={text}>
          Once you are seated you begin to make more request. The waiter is the
          person that will help you to make your request from here on out. They
          are going to take your orders to the kitchen and you will then after
          some time get your food and beverage and whatever else you request.
        </p>
        <p className={text}>
          If you order a hamburger at the Italian restaurant, what do you expect
          the response to be? Your waiter would probably say, &ldquo;I
          apologize, we don&apos;t have that.&rdquo; In computers that would be
          equivalent to a <code className={code}>404</code> status code meaning
          &ldquo;not found&rdquo;.
        </p>
        <p className={text}>
          But if you order spaghetti and 10 minutes later the waiter brings you
          a big pile of spaghetti, you would call that a success! And once
          again, in computers that is equal to a status code of{' '}
          <code className={code}>200</code>.
        </p>
        <p className={text}>
          If you want more sauce on your spaghetti, you tell the waiter and they
          will take your plate to the back where they would add more sauce to
          your dish. The waiter would then return the plate to you with more
          sauce. In computing this type of request is called a{' '}
          <code className={code}>PUT</code>. It too was a success and has a
          status code of <code className={code}>200</code>.
        </p>
        <p className={text}>
          At the end of your meal the waiter brings you a bill of $22.50. You
          then give the waiter a $50 bill. They take your bill to the back, get
          you change, bring you your change, and say, &ldquo;thank you for
          dining with us; have a good night!&rdquo; In computing this would be a
          successful <code className={code}>POST</code> with a status code of
          what…you guessed it — <code className={code}>200</code>.
        </p>
        <p className={text}>
          Here I have briefly explained how a server works and a few status
          codes that one can expect when dealing with servers.
        </p>
        <p className={text}>Now... does that make sense?</p>
        <p className={text}>
          Please comment, encourage, share your thoughts. I wrote this for my
          students that have no knowledge or background in computer science. It
          seemed to help.
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Computer Science',
              'Servers',
              'Programming',
              'Information Technology',
              'APIs',
              'Application Programming Interface',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
