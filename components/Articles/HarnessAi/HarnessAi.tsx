'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function HarnessAi(): React.JSX.Element {
  const { innerWrapper, imageWrapper, altText, text } = articleStyles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="harness-ai" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Harnessing AI: Layer Cake and Platform Shift</h1>
        <ArticleDateTime imageUrl="harnessai" />
        <div className={imageWrapper}>
          <LazyImage
            alt="Jensen Huang and Larry Fink in conversation at the World Economic Forum"
            loader={imageLoader}
            src="/images/jensen-fink.webp"
            width={1060}
            height={513}
            style={{ objectFit: 'contain', maxWidth: '80%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}>Jensen Huang and Larry Fink discuss the AI platform shift</p>
        </div>

        <p className={text}>
          Jensen Huang had an insightful conversation with Larry Fink at the World Economic Forum
          about the state of AI. The framing that stuck with me was the &ldquo;AI layer cake&rdquo; and
          the reminder that real opportunity shows up where where knowledge and creativity meet each layer.
        </p>

        <h2>The AI Layer Cake</h2>
        <p className={text}>
          The story starts at the bottom and builds upward. Each layer needs the one beneath it to
          succeed:
        </p>
        <div className={imageWrapper}>
          <LazyImage
            alt="AI layer cake diagram showing the stack from energy to applications"
            loader={imageLoader}
            src="/images/ai-layer-cake.webp"
            width={1124}
            height={1678}
            style={{ objectFit: 'contain', width: '75%', maxWidth: '75%' }}
          />
          <p className={altText}>The AI layer cake, from energy to applications</p>
        </div>
        <ul className={text}>
          <li><strong>Energy</strong> - Everything scales with power, and demand is rising.</li>
          <li><strong>Chips and compute infrastructure</strong> - TSMC, Samsung, Micron, SK Hynix, Nvidia, Foxconn.</li>
          <li><strong>Cloud</strong> - AWS, GCP, Azure, and the rest of the infrastructure layer.</li>
          <li><strong>AI models</strong> - Open-source and proprietary foundation models.</li>
          <li><strong>Applications</strong> - This is where the economic benefit lands according to Jensen.</li>
        </ul>

        <p className={text}>
          The application layer gets the headlines, but it depends on every layer below it. There
          are opportunities at every tier. This will inform us of &ldquo;how to&rdquo; and where we can look for 
          opportunities in the job market with AI. 
        </p>
        <p className={text}>
          High schoolers and current 
          college students should think about majors that involve engineering that can be assisted 
          by AI versus something completely tasked based that can be performed by AI. Maybe mechanical engineering, 
          electrical engineering, trade skills related to the development of each layer are the best path
          forward.
        </p>

        <p className={text}>
          My personal bias is to not have anymore computer science majors. There may be a need to minor in it.
          However; I do not think it will serve students or society to major in it any more.
        </p>

        <h2>AI Is the Platform Shift</h2>
        <p className={text}>
          The way Jensen frames it: AI is the platform apps will be built on. You can build on
          OpenAI, Gemini, Claude, or your own model stack. That changes what computers can do and how
          we work with them.
        </p>

        <p className={text}>
          A few shifts stood out:
        </p>
        <ul className={text}>
          <li>Handling unstructured data (image, audio, video) and reasoning over it.</li>
          <li>Processing context in real time through prompts.</li>
          <li>Domain-specific intelligence in biology, physics, chemistry, and industrial science.</li>
        </ul>

        <h2>Jobs, Trades, and Purpose</h2>
        <p className={text}>
          The conversation also addressed labor. Energy and infrastructure are creating jobs, but
          there is a shortage of people who can build and maintain the stack. Think plumbers,
          electricians, network technicians, equipment installers. These roles become more important
          as AI infrastructure expands.
        </p>

        <p className={text}>
          &ldquo;It is essential to learn how to use AI: how to direct an AI, how to prompt an AI, how to manage 
          an AI, how to guardrail the AI, evaluate the AI, these skills are no different than leading people, 
          managing people.&rdquo; So, if you learn AI and how to do the aforementioned things with it. You will be 
          a great manager. Those managers that don&apos;t know how to do these things with AI are managers 
          of old as more AI become the modality of work. 
        </p>

        <p className={text}>
          Jensen&apos;s call was to &ldquo;fuse industrial applications with AI&rdquo;. Creativity will be worth more than ever. 
        </p>

        <h2>Where I Disagree</h2>
        <p className={text}>
          Jensen mentioned that everyone can be a programmer now. I do not fully buy that yet. There
          is still a learning curve around system architecture, scale, security, and reliability. AI can help
          you build a site, but end-to-end scalable systems still require skilled engineers and
          deep experience. For now, a knowledgeable human stays in the loop.
        </p>

        <h2>Regulated Compute Is Real</h2>
        <p className={text}>
          Jensen also echoed something I wrote about in the{' '}
          <Link href="/articles/regulated-compute">Regulated Compute</Link> article: access to high-end GPUs
          is scarce, and prices are rising. That is driven by energy constraints and a constrained
          chip supply. The platform shift is real, but the inputs are still limited.
        </p>

        <h2>Watch the Full Conversation</h2>
        <p className={text}>
          If you want the full context, the video is here:{' '}
          https://www.youtube.com/watch?v=hoDYYCyxMuE
        </p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'AI',
              'Nvidia',
              'Jensen Huang',
              'Platform Shift',
              'Infrastructure',
              'Jobs',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
