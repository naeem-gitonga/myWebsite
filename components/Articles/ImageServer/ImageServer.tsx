'use client';
import LazyImage from '@/components/LazyImage/LazyImage';

import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import styles from './ImageServer.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import aiimage from '../../pictures/ai-generated-image.png';
import dashboard1 from '../../pictures/during-inference.png';
import dashboard2 from '../../pictures/after-inference.png';
import freeh1 from '../../pictures/after-inference-2.png';
import freeh2 from '../../pictures/during-inference-2.png';
import terminalwindow from '../../pictures/memory-profiling.png'

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function ImageServer(): React.JSX.Element {
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
        <h1>Image Server AI — GPU Inference in 55 Seconds</h1>
        <ArticleDateTime imageUrl={'aiimage'} />
        <div className={imageWrapper}>
          <LazyImage
            alt="Profile of AI robot"
            loader={imageLoader}
            src={aiimage}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Pensive robot by Image Server AI</p>
        </div>
        <h2>TL;DR</h2>
        <p className={text}>
          This post shares what I learned over three days of experimenting 
          with my DGX Spark while building a text-to-image inference app. 
          See the repo <Link className="link" href="/interstitial?url=https://www.github.com/naeem-gitonga/image-server&where=Image Server Repo">
            here
          </Link>.
        </p>

        <h2>Getting Started</h2>
        <p className={text}>
          It&apos;s been five days since I got my DGX Spark in the mail. It showed up on Friday, 
          but I waited until Sunday to start experimenting. 
        </p>

        <p className={text}>
          When I first watched Jensen Huang&apos;s talk on it, I knew then it would be a great idea for 
          anyone working in Machine Learning to own one. I primarily do MLOps, but my background 
          in software engineering often pulls me into building ML applications too. I was also 
          curious about diving deeper into machine learning concepts — and working with the DGX 
          Spark felt like the perfect way to start. 
        </p>

         <h2>Why Buy</h2>
        <p className={text}>
          Well, I like being first! My reservation number was <strong>#14127</strong>, but I saw people in the 
          forums with six-digit numbers, so I was still early. I was curious about the workflow. 
          I wanted to run models directly from my desktop, develop locally, and then move everything 
          to the cloud. The DGX Spark lets me do exactly that.
        </p>
       
        <p className={text}>
          And honestly — I&apos;ve only been using it for three days, so I&apos;m still just scratching the surface.
        </p>

        <h2>Learning</h2>
        <p className={text}>
          Inference on a single Blackwell GPU is about <strong>32x faster</strong> than on a 126 GB unified memory CPU.
        </p>

        <p className={text}>
          Simply put: what took 30 minutes on CPU took just 55 seconds on GPU. That&apos;s 
          a massive boost — and it makes sense why everyone&apos;s so hyped about GPUs.
        </p>
        <p className={text}>
          Did I need to buy the DGX Spark to know that? Probably not. I&apos;d seen similar 
          gains back when I turned on GPU usage for training models at Pluralsight. 
          Tasks that used to take four hours dropped to under 30 minutes.
        </p>
        <p className={text}>
          But the <i>gotcha</i> this time was that the hardware is so new, standard libraries 
          like PyTorch haven&apos;t officially released versions compatible with the <strong>CUDA 13.0 Toolkit</strong> yet.
        </p>
        <p className={text}>
          Fortunately, NVIDIA publishes its own version of PyTorch, and they maintain a Docker 
          image packed with the right dependencies for my setup. That image saved me.
        </p>

        <h2>Memory Management</h2>
        <p className={text}>
          Free up your memory!
        </p>
        <p className={text}>
          When the application first starts, memory usage sits around <strong>11-13GB</strong>. 
          But when a request kicks off inference, I watched it spike to <strong>116GB</strong>. 
          After inference, it stays near the peak — unless you explicitly clean up.
        </p>
        <p className={text}>
          Triggering <strong>garbage collection after sending the response</strong> drops memory usage back to the 
          <strong>mid-40GB</strong> range. The remaining ~30GB is likely tied to the loaded model, which the OS 
          keeps cached in memory.
        </p>
        <p className={text}>
          Being able to monitor memory in real time is a huge advantage when developing AI applications. In the absence 
          of the DGX Spark, there is tooling in both Linux and Python to help with this. But this makes it easy. 
          The screenshot below shows the <strong>DGX Dashboard</strong> during inference. 
        </p>

        <div className={imageWrapper}>
          <LazyImage
            alt="DGX dashboard during inference"
            loader={imageLoader}
            src={dashboard1}
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
          <p className={altText}>Dashboad spiked GPU, high CPU</p>
        </div>


        <p className={text}>
          You can&apos;t see it here, but CPU utilization rose gradually — while 
          GPU utilization surged almost instantly. It&apos;s doing exactly what it should. 
        </p>

        <div className={imageWrapper}>
          <LazyImage
            alt="Running free -h command in terminal during inference"
            loader={imageLoader}
            src={freeh2}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>High memory usage during inference</p>
        </div>

        <p className={text}>
          After clearing our pipeline and garbage collection, we see a huge change in 
          the available memory, used memory and free memory: 
        </p>

        <div className={imageWrapper}>
          <LazyImage
            alt="DGX dashboard after inference"
            loader={imageLoader}
            src={dashboard2}
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
          <p className={altText}>Dashboard showing low memory usage</p>
        </div>
        <div className={imageWrapper}>
          <LazyImage
            alt="Running free -h command in terminal after inference"
            loader={imageLoader}
            src={freeh1}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Terminal view low memory usage</p>
        </div>

        <p className={text}>
          In case you&apos;re wondering, clearing up memory at this stage does not affect
          how fast the model makes inference on subsequent requests. In fact, times are consistent
          across requests whether I cleared the memory or not. Still, I think it&apos;s best practice 
          to free up memory as you can do so safely.
        </p>
        

        <h2>{'<edit>'}</h2>
        <h2>Load Testing and Caching</h2>
         <p className={text}>
          While iterating on this project, I decided to dig deeper into memory behavior and see how caching my 
          model was truly affecting the application. I started adding some quick benchmarks and simple log 
          statements to understand what advantage I was losing by clearing the cache after every run.
          I also re-evaluated my approach. Initially, I was sending one request at a time. This time, I 
          disabled cleanup and sent multiple requests to simulate a real server environment — something 
          closer to what you&apos;d expect in production. Think of it like basic load testing.
         </p>
         <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${firstGist}`}>
              <iframe
                id="first-gist"
                src="https://gist.github.com/naeem-gitonga/02af5f42ba44010103ecb1bdb6c0d58e.pibb"
              ></iframe>
            </div>
          </div>
        </figure>
        <p className={text}>
          After a few requests, the results spoke for themselves.  
        </p>
        <h3>Running Load Test</h3>
        <p className={text}>
          First, I commented my <code className={code}>drop_cache()</code> function call.
          I didn&apos;t use any particular framework, I just opened a few terminal windows and
          sent the same request one immediately after the other. See the results below.
        </p>
        <div className={imageWrapper}>
          <LazyImage
            alt="Terminal instance with load results"
            loader={imageLoader}
            src={terminalwindow}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Benchmarking results with cached model</p>
        </div>

        <p className={text}>
          The first line <code className={code}>Init took: 17.4253... seconds</code>{' '}
          shows that after startup, the initiall run took nearly 18s. Subsequent runs 
          , with the pipeline cached, took between 1 and 10 seconds. That&apos;s a win. It may seem
          minor, but in a large-scale application handling millions of request per second,
          not caching the inference pipeline would cost serious time and compute. Inference
          consistently took between 55 (best case) and 59s.
        </p>

        <p className={text}>
          Out of curiosity, I re-enabled the <code className={code}>Drop_cache()</code> 
          function and sent multiple request again. Short 
          asnwer: I crashed not only the server but the computer that was serving the application.
          This not only points to the benefits of how chaching the pipeline helps, it also points
          to the need for possibly locking the pipeline initialization along with the inference
          to prevent any possible race condition.
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
