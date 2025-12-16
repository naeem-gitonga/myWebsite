'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import tigergroup from '../../pictures/tiger-group.png';
import tigerClassPhoto from '../../pictures/tiger-class-photo.jpg';


import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function TigerExperience(): JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
  } = articleStyles;
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

        <h2>The Setup</h2>
        <p className={text}>
          For the uninformed, TI:GER stands for Technology Innovation: Generating Economic Results. This 
          was a huge factor in why I decided to go to Georgia Tech for my MBA. At the time of my application, 
          students were paired with real start-up companies so that they could solve real business problems 
          as part of their course of study.  
        </p>

        <p className={text}>
          Well, fast-forward to my first TI:GER class and I find out that due to no fault of the faculty and staff 
          of the TI:GER program, things have changed, meaning that they were no longer pairing us with &ldquo;real-live&rdquo; 
          businesses. Instead, we&apos;d be building a greenfield project and working from a textbook called Disciplined Entrepreneurship. 
        </p>

        <p className={text}>
          MBA school is all about group work and you learn early who your style complements. I reached 
          out to a guy that I had worked with before and we teamed up to interview our other group members. 
          This was great, we had four to five people &ldquo;interview&rdquo; with us and we picked two. Throughout the 
          semester we would get to know one another and build a business from an idea. 
        </p>
       
       <h2>How TI:GER Defines Innovation</h2>
        <p className={text}>
          In the first week of TI:GER you get the definition of innovation. If you asked around, hey what&apos;s 
          innovation? You might hear, &ldquo;something new&rdquo;, &ldquo;something fresh&rdquo;, &ldquo;something 
          the world has never seen (repeat)&rdquo;. 
        </p>

        <p className={text}>
          But in TI:GER, we live by a different code. Innovation is simple: <strong>&ldquo;invention x commercialization.&rdquo;</strong> 
          {' '}Therefore, without one or the other, there is no innovation. This causes the innovator to think about 
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

        <h2>Where This Breaks Down in Practice</h2>
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
          product for the 35-40% of their revenue base. For revenue-protection and/or growth—<strong>bad decision</strong>. 
          The answer to the second question was they built an AI chatbot. 
        </p>

        <p className={text}>
          Without blaming any one person you may see where things like economics, product knowledge, technical 
          expertise, market knowledge, finance, basic accounting, and plain old common sense come into play. 
        </p>

        <p className={text}>
            This is where TI:GER shines. It is an exercise of the aforementioned domains/skills. 
            TI:GER is where you get to employ good decision making using all of the previously mentioned skills.
        </p>
 
        <p className={text}>
            In the face of economic headwinds and as a result of the decision to spend millions of dollars and thousands 
            of man hours in the development of their AI project, the company RIF&apos;d most of their AI team that built their 
            chatbot, leaving enough people to “keep the lights on”, in an effort to improve their bottom line.
        </p>

        <h2>My Takeaways</h2>
        <p className={text}>
            Lesson here, <strong>take care of your main revenue stream</strong>, think holistically, and build products that support and promote 
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

        <p className={text}>
            I shared some ideas with insiders but unfortunately that came after the company had millions 
            of dollars in sunk costs in their fledgling AI chatbot. 
        </p>

        <p className={text}>
            Suffice it to say, I think the company made the right choice in their RIF and I would have done the same 
            given the circumstances. When you notice that you have an expense that does not drive revenue nor supports 
            the viability or value of your core—<strong>cut it!</strong> 
        </p>

        <p className={text}>
          TI:GER taught me how to gather the necessary data, analyze that data, see the signals, and develop a 
          plan of action based on all findings; therefore, avoid that situation entirely.
        </p>

        <p className={text}>
          I still have to make small-regular deposits into themy bank of experience, education, and training. Yet unlike many others in management 
          and leadership roles, my tool belt prepares me for multi-faceted, multi-modal approaches to solving problems regarding 
          business, people, and technology.
        </p>
        <p className={text}>
          I don&apos;t think the TI:GER concentration is the end-all-be-all when it comes to MBA programs or concentrations. 
          There are many great business schools out here that do not have an official TI:GER concentration. However, I am a 
          better manager, leader, and person because of the work I completed in Georgia Tech&apos;s TI:GER program.
        </p>

        <p className={text}>
          <strong>Thank you TI:GER!</strong>
        </p>
        <div className={imageWrapper}>
          <Image
            alt="pic of many people"
            loader={imageLoader}
            src={tigerClassPhoto}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>
            Class photo
          </p>
        </div>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Scheller College of Business',
              'Software Engineering',
              'Business Strategy',
              'TI:GER',
              'Georgia Institute of Technology',
              'MBA',
              'Product Development',
              'Customer Discovery',
              'business development'
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
