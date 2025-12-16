'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import styles from './TigerExperience.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import tigergroup from '../../pictures/tiger-group.png';
import dashboard1 from '../../pictures/during-inference.png';
import dashboard2 from '../../pictures/after-inference.png';
import freeh1 from '../../pictures/after-inference-2.png';
import freeh2 from '../../pictures/during-inference-2.png';
import terminalwindow from '../../pictures/memory-profiling.png'

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function TigerExperience(): JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    figure,
    firstInner,
    secondInner,
  } = articleStyles;
  const {firstGist} = styles
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  // * &rdquo; &ldquo; &apos;
  return (
    <div id="servers" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>My TI:GER Experience</h1>
        <ArticleDateTime imageUrl={'tigergroup'} />
        <div className={imageWrapper}>
          <Image
            alt="group of four guys"
            loader={imageLoader}
            src={tigergroup}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>From left-right: Aman Jonathan Prakash, Me, James &ldquo;Jimmy&rdquo; Storm, Rakim Hirji</p>
        </div>
        <p className={text}><strong>This isn&apos;t an endorsement of the program. This is my experience.</strong></p>

        <p className={text}>
          For the uninformed, TI:GER stands for Technology Innovation: Generating Economic Results. This 
          was a huge factor in why I decided to go to Georgia Tech for my MBA. At the time of my application, 
          students were paired with real start-up companies so that they could solve real business problems 
          as part of their course of study.  
        </p>

        <p className={text}>
          Well, fast-forward to my first TI:GER class and I find out that due to no fault of the faculty and staff 
          of the TI:GER program things have changed, meaning that they were no longer pairing us with &ldquo;real-live&rdquo; 
          businesses. Instead, we&apos;d be building a greenfield project and working from a textbook called Disciplined Entrepreneurship. 
        </p>

         <h2>On B School</h2>
        <p className={text}>
          MBA school is all about group work and you learn early who your style complements. I reached 
          out to a guy that I had worked with before and we teamed up to interview our other group members. 
          This was great, we had four to five people &ldquo;interview&rdquo; with us and we picked two. Throughout the 
          semester we would get to know one another and build a business from an idea. 
        </p>
       
        <p className={text}>
          In the first week of TI:GER you get the definition of innovation. If you asked around, hey what&apos;s 
          innovation? You might hear, &ldquo;something new&rdquo;, &ldquo;something fresh&rdquo;, &ldquo;something 
          the world has never seen (repeat)&rdquo;. 
        </p>

        <p className={text}>
          But in TI:GER, we live by a different code. Innovation is simple: <strong>&ldquo;invention x commercialization.&rdquo;</strong> 
          Therefore, without one or the other, there is no innovation. This causes the innovator to think about 
          the invention <em>and</em> know the business. 
        </p>

        <p className={text}>
          Side note, you always want to say &ldquo;yes, AND...&rdquo; it helps to foster a more inclusive atmosphere. My MBA Jackets know this.
        </p>

        <p className={text}>
          Our focus is IDE—<strong>Innovation-Driven Enterprise</strong>—and all this time as a software engineer, I thought it only meant 
          integrated development environment—IYKYK. Our focus is big markets. Our small businesses need to capture large 
          market share. Simply put, we need to scale. 
        </p>
        <p className={text}>
          Some of this stuff is 1:1 with an engineering mindset. However, over the last two semesters I had to call on all of my previously 
          learned skills whether from practice in my day job or from a course in my MBA program and learn new ones in order to innovate. 
          Those skills include but are not limited to finance, strategy, marketing, and accounting.
        </p>

        <p className={text}>
            A new skill for me was customer discovery. It was great to talk to people again. Being a senior MLOps Engineer, I definitely got 
            to talk to people but to speak to a customer other than another engineer was one of the best parts about this program. 
        </p>

        <h2>?</h2>
        <p className={text}>
          We put together a real product and had real data to help us do so. There was one particular book that I 
          recommended to my group that helped us all. If you are interested in the name of it, contact me directly 
          and I&apos;ll share it with you. 
        </p>

        <p className={text}>
          Customer discovery is an art. You need to be able to read the room, hear what is being said, and 
          listen for what they&apos;re not saying. The hardest part is getting people to talk to you, but I 
          literally can do these all day long and not get bored.
        </p>

        <p className={text}>
          As an engineer, we&apos;ll often make things that we think are useful but when “the thing” is put on the open 
          market we find that it isn&apos;t getting the use that we had intended. The main reason for that is because we 
          don&apos;t have one or two things, commercialization or invention, or even worse neither of the two! TI:GER gave 
          me the tools to think through the process of creating new products. 
        </p>

        <p className={text}>
          The best example that I have is from a company that I am familiar with. This company&apos;s main business was 
          selling content. They had two economic buyers, 1) corporate enterprises (B2B) and 2) other individuals (B2C). 
          Their B2B customers made up about 60-65% of their revenue. 
        </p>

        <p className={text}>
          This company wanted to employ AI in their platform during the beginning of the AI Boom. 
          So who did they make their AI product for? And how did they use the AI? 
        </p>

        <p className={text}>
          Well, the answer to the first question may seem obvious, but they chose to make their AI 
          product for the 35-40% of their revenue base. For revenue-protection and/or growth—bad decision. 
          The answer to the second question was they built an AI chatbot. 
        </p>

        <p className={text}>
          Without blaming any one person you may see where things like economics, product knowledge, technical 
          expertise, market knowledge, finance, basic accounting, and plain old common sense come into play. 
        </p>

        <h2>?</h2>
        <p className={text}>
            This is where TI:GER shines. It is an exercise of the aforementioned domains/skills. 
            TI:GER is where you get to employ good decision making using all of the previously mentioned skills.
        </p>
 
        <p className={text}>
            In the face of economic headwinds and as a result of the decision to spend millions of dollars and thousands 
            of man hours in the development of their AI project, the company RIF&apos;d most of their AI team that built their 
            chatbot, leaving enough people to “keep the lights on”, in an effort to improve their bottom line.
        </p>

        <p className={text}>
            Lesson here, take care of your main revenue stream, think holistically, and build products that support and promote 
            the value that made your primary market choose you over other vendors in the first place. Chasing fads will most 
            certainly have you chasing the next as the previous one dies. Meanwhile, you have lost time and the opportunity to 
            create real value that can grow your business, your competitors outpace you, and you struggle to make shareholders happy.
        </p>

        <p className={text}>
            Here&apos;s an idea, instead of chasing the latest AI fad, think big picture, look at what will help you to deliver 
            faster, more efficiently to your primary market.
        </p>

        <p className={text}>
            In that company&apos;s case, an AI tool that helped to deliver content faster would have been the proper use 
            of its resources. Why? Because 100% of their revenue comes from the content that they create and up to 
            65% of their revenue comes from their enterprise customers who ONLY consume the content. That&apos;s to say they 
            will never interact with their AI chatbot.
        </p>
        <h3>Why It Works</h3>
        <p className={text}>
          Without caching, I have an instant performance killer.
        </p>
        <ul>
          <li className={text}>For your 57s inference, adding 17s overhead = <strong>30% slower</strong></li>
          <li className={text}>Over 100 requests: 1700s wasted just reloading</li>
        </ul>

        <p className={text}>
          With caching, I have some solid wins.
        </p>
        <ul>
          <li className={text}>Keeps weights in memory — avoiding the 17s reload</li>
          <li className={text}>Avoids overhead, ~16s saved per request</li>
        </ul>
        <h2>{'</edit>'}</h2>

        <h2>The Setup</h2>
        <p className={text}>
          When I first started working on the Image Server, I followed my usual 
          Python workflow — using tools like <code className={code}>uv</code> and{' '} 
          <code className={code}>.venv</code>. But that approach 
          wasn&apos;t giving me what I needed.
        </p>

        <p className={text}>
          I ran into this weird issue where, because the app was using a <code className={code}>venv</code>{' '} 
          inside a container, it couldn&apos;t access the system-level CUDA dependencies. 
          Basically, it was trapped inside a virtual environment <em>inside</em> another virtual environment.
        </p>
        <p className={text}>
          After a lot of trial and error, I started digging through 
          the NVIDIA forums. I found a post that described exactly what I was running into. 
          I left a comment, and a moderator plus an NVIDIA engineer pointed me to the company&apos;s 
          proprietary PyTorch Docker image — the one with full CUDA 13.0 support built in.
        </p>
        <p className={text}>
          You can see that thread <Link className="link" href="/interstitial?url=https://forums.developer.nvidia.com/t/effective-pytorch-and-cuda/348230&where=Nvidia Forum">
            here
          </Link>. 
        </p>
        <p className={text}>
          Once I realized the <code className={code}>venv</code> setup was blocking me, I scrapped it. I started 
          developing directly inside the container, did a quick <code className={code}>pip install</code>{' '} for my 
          dependencies, and — <i>voilà</i> — I was using the GPU.
        </p>

        <h2>Wrapping Up</h2>
        <p className={text}>
          Three days in, and I&apos;ve already learned a ton, more that I can share in this one post. 
          There&apos;s still more to explore — but the DGX Spark has been a powerful 
          hands-on way to push deeper into GPU workflows and text-to-image inference.
        </p>
        <p className={text}>
          As always, thanks for reading and look out for the follow-up!
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'AI',
              'MLOps',
              'ML Engineering',
              'Python',
              'Cuda',
              'Image-to-text',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
