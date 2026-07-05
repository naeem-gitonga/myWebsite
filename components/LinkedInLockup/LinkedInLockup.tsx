'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import Tags from '@/components/Tags/Tags';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import { imageLoader } from '@/utils/imageLoader';
import LazyImage from '@/components/LazyImage/LazyImage';
import Link from 'next/link';

export default function LinkedInLockup(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    subtext,
    table,
  } = articleStyles;
  const { tenPadding, width75 } = sharedStyles;
  return (
    <div id="linkedin-lockup" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>LinkedIn Lockup: The Lead Vetter Story</h1>
        <p className={subtext}>How I built a Chrome extension to vet LinkedIn leads, 
          got flagged as a bot, and learned about behavioral analytics the hard way.</p>
        <ArticleDateTime imageUrl={'linkedinlockup'} />
        <div className={imageWrapper}>
          <LazyImage
            alt="LinkedIn jail - account restricted message"
            loader={imageLoader}
            src="/images/linkedin-lockup.webp"
            width={800}
            height={800}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <p className={text}>
          As I attempt to do customer discovery, I find that I need hot, high priority leads. 
          I have to talk to the right people. So how do I get the right people? Well, it 
          started out using the LinkedIn search tool. I would then use some software to 
          import everyone captured in that search. The search was not narrow enough though&mdash;
          real issue for me. That is of no fault of my own. Perhaps if I had the LinkedIn 
          recruiter package, it would be better. Any recruiters out there that can tell me 
          if this is true, please shout it out.
        </p>
        <p className={text}>
          My search term was &ldquo;paralegal.&rdquo; But that is too broad. So, I tried to narrow 
          it down using LinkedIn&apos;s filters. The problem there is the filtering is not 
          specific enough. So, here&apos;s the new problem. I now have to manually click on 
          every profile or scroll until I find one worthy of clicking. What do I mean by worthy?
        </p>
        <p className={text}>
          Here are my criteria:
        </p>
        <ul>
          <li className={text}>Job title, current job title is either paralegal, legal assistant, or attorney. And they are currently employed as such</li>
          <li className={text}>They must have been active in some way (post, repost, reacted or commented within the past month).</li>
          <li className={text}>Have a company size of 1 &ndash; 10 employees.</li>
        </ul>
        <p className={text}>
          So, I&apos;m left guessing that by LinkedIn&apos;s standards, if you&apos;re not dishing 
          out major cash, you have to do it all manually. I refuse. I know too much and as an engineer 
          I design and build things to make my life easier. In all areas of my life.
        </p>
        <p className={text}>
          So, I got the bright idea to build the <strong>Lead Vetter</strong> Chrome extension. 
          Now don&apos;t judge me. I did not read the terms of use policy no more than you did when 
          I created my LinkedIn profile 10 years ago. So I vibe code this thing. I get it working and 
          I&apos;m testing it with my main LinkedIn account. For about 36 hours, I ran through hundreds of profiles. And then I got the dreaded account restricted message. It was only restricted for a few hours. So how did LinkedIn detect that I was using a &ldquo;bot&rdquo;?
        </p>

        <h2>What the Lead Vetter Does</h2>
       
        <ol>
          <li className={text}>Pull a list of LinkedIn users from some other software (profile URL, name, job title, etc.).</li>
          <li className={text}>Pull their activity info</li>
          <li className={text}>Pull their experience info</li>
          <li className={text}>Try to click into their company.</li>
          <li className={text}>If it can open their company&apos;s LinkedIn page, it will copy some basic company information (specifically the company size which I wanted to be between 1 &ndash;10 employees if you recall).</li>
          <li className={text}>Send all of that information to my locally hosted LLM</li>
          <li className={text}>The LLM was tasked to check each lead against those three criteria.</li>
          <li className={text}>If all three criteria were met, it would add that profile URL to a Hot Leads list, if they had not had any recent activity but had the correct job title and the correct company size it would add that profile to a Worth Checking Out list.</li>
          <li className={text}>Finally, it would send me the two lists back once it finished in two .csv files</li>
        </ol>

        <p className={text}>
          I could get through 247 leads in less than 15 minutes. I mean it was a complete 
          game changer for me. I had my high priority and medium priority leads without 
          having to sacrifice hours clicking between profiles.
        </p>

        <h2>How LinkedIn Detected the Bot</h2>
        <p className={text}>
          So, can you beat the bot detection? Well let&apos;s get back to the part where I asked 
          how did LinkedIn know to begin with. Any time we use apps like LinkedIn we are 
          subject to analytics, behavioral analytics. Meaning there are signals that the 
          app or website uses to tell if you are in fact a human or another computer. Behavior 
          signals like no mouse moves before page scrolls is a big one. My extension scrolled 
          with JavaScript. In the browser <code className={code}>event.isTrusted</code> was always 
          false with each synthetic session. No keyboard events during a single session are another 
          telltale sign. And the worst of all, I had perfectly timed intervals between every action. 
          Those together were dead giveaways that a bot was in full operation.
        </p>
        <p className={text}>
          LinkedIn had built a profile of my usage and I&apos;m surprised it took them as long as it did. 
          But once that profile was built there is nearly nothing that one can do to evade detection. 
          What I imagine would really help beat the bot is to have a piece of hardware that could randomly 
          click and scroll the page using an actual mouse, maybe even click random links between runs. 
          But hey, let someone else figure that out.
        </p>
        <p className={text}>
          LinkedIn and platforms like it&mdash;that want to deter and stop bot activity&mdash;will use  
          software like: Cloudflare Bot Management, Imperva Bot Defense, Akamai Bot Manager, 
          HUMAN Security, DataDome and the list goes on. Detection techniques are built into 
          these systems such as those seen in the table below.
        </p>

        <div className={table}>
          <table>
            <thead>
              <tr>
                <th>Technique</th>
                <th>What it catches</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event isTrusted ratio</td>
                <td>Synthetic events (JS-dispatched) vs real hardware input</td>
              </tr>
              <tr>
                <td>Mouse trajectory analysis</td>
                <td>Linear/absent movement, no micro-corrections</td>
              </tr>
              <tr>
                <td>Scroll physics</td>
                <td>Uniform velocity, no momentum, wrong deceleration curve</td>
              </tr>
              <tr>
                <td>Interaction entropy</td>
                <td>Too regular = bot, humans have high variance</td>
              </tr>
              <tr>
                <td>TLS fingerprinting (JA3/JA4)</td>
                <td>Identifies the client by its TLS handshake signature</td>
              </tr>
              <tr>
                <td>Canvas/WebGL fingerprinting</td>
                <td>Device fingerprint consistency across sessions</td>
              </tr>
              <tr>
                <td>navigator.webdriver</td>
                <td>True in Selenium/Playwright unless patched</td>
              </tr>
              <tr>
                <td>Chrome DevTools Protocol (CDP) detection</td>
                <td>Exposed runtime properties in automated Chrome</td>
              </tr>
              <tr>
                <td>Font/plugin enumeration</td>
                <td>Headless Chrome has different font sets</td>
              </tr>
              <tr>
                <td>Request velocity</td>
                <td>Too many profile views per hour/day</td>
              </tr>
              <tr>
                <td>Absence of organic navigation</td>
                <td>Only ever visits profile pages, never feed/search</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className={text}>
          So, Can it be beat? Probably, but I&apos;ll let someone else solve that puzzle. I 
          actually want to use my LinkedIn account in the future and If I continue to violate 
          their terms, a permanent ban will likely follow.
        </p>
        <p className={text}>
          I mean I pled my case to LinkedIn though. See the screenshot below. They didn&apos;t 
          respond. But hey! It was worth a shot.
        </p>

        <div className={imageWrapper}>
          <LazyImage
            alt="Pleading with LinkedIn support"
            loader={imageLoader}
            src="/images/pleading-with-linkedin.webp"
            width={600}
            height={400}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className={altText}>My appeal to LinkedIn support</p>
        </div>

        <p className={text}>
          But hey, I had fun building the bot and this just shows the type of automation 
          that is capable with AI. I mean, how many salespeople or otherwise need to vet 
          something or someone and have hundreds of whatever it is to parse. This is a true 
          benefit of having AI. Thank God for my AI powers!
        </p>
        <p className={text}>
          If you want to check out the code for the Lead Vetter software, see it 
          <Link href="/interstitial?url=https://github.com/naeem-gitonga/lead-vetter&where=GitHub">here</Link>. 
          Now, do not judge me on the code quality. Since this software is not something that I can actively 
          use I didn&apos;t bother to architect it and up as I would something that I am interested in scaling 
          or maintaining. This is for demonstrative purposes ONLY.
        </p>
        <p className={text}>
          Consider the ethical and legal implications before deploying automation.
        </p>
        <p className={text}>
          As always, thanks for stopping by and I&apos;ll see you next time!
        </p>

        <Tags
          tags={[
            'LinkedIn',
            'Bot Detection',
            'Behavioral Analytics',
            'Chrome Extension',
            'Lead Vetter',
            'Automation',
            'AI',
            'Web Scraping',
          ]}
        />
      </div>
      <ReturnArrow />
    </div>
  );
}
