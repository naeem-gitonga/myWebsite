'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import aiimage from '../../pictures/ai-generated-image.png';
import dashboard1 from '../../pictures/during-inference.png';
import dashboard2 from '../../pictures/after-inference.png';
import freeh1 from '../../pictures/after-inference-2.png';
import freeh2 from '../../pictures/during-inference-2.png';

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function ImageServer(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, code, pre } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  // * &rdquo; &ldquo; &apos;
  return (
    <div id="servers" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Image Server on DGX Spark — GPU Inference in 55 Seconds</h1>
        <ArticleDateTime imageUrl={'aiimage'} />
        <div className={imageWrapper}>
          <Image
            alt="Woman in mirror"
            loader={imageLoader}
            src={aiimage}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Pensive robot by Image Server AI</p>
        </div>
        <h2>TL/DR</h2>
        <p className={text}>
          TL;DR: This post shares what I learned over three days of experimenting 
          with my DGX Spark while building a small text-to-image inference app. 
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
          When I first watched Jensen Huang&apos;s talk about on it, I knew then it would be a great idea for 
          anyone working in Machine Learning to own one. I primarily do MLOps, but my background 
          in software engineering often pulls me into building ML applications too. I was also 
          curious about diving deeper into machine learning concepts — and working with the DGX 
          Spark felt like the perfect way to start. 
        </p>

         <h2>Why Buy</h2>
        <p className={text}>
          Well, I like being first! My reservation number was <strong>#14127</strong>, but I saw people in the 
          forums with six-digit numbers, so I was still early. I was curious about the workflow. 
          I wanted to run models directly from my desktop, practice locally, and then move everything 
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
          gains back when I was at Pluralsight and turned on GPU usage for training models. 
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
          When the application first starts, memory usage sits around <strong>11-13 GB</strong>. 
          But when a request kicks off inference, I watched it spike to <strong>116 GB</strong>. 
          After inference, it stays near the peak — unless you explicitly clean up.
        </p>
        <p className={text}>
          Triggering <strong>garbage collection after sending the response</strong> drops memory usage back to the 
          <strong>mid-40 GB</strong> range. The remaining ~30 GB is likely tied to the loaded model, which the OS 
          keeps cached in memory.
        </p>
        <p className={text}>
          Being able to monitor memory in real time is a huge advantage when developing AI applications. In the absence 
          of the DGX Spark, there is tooling in both Linux and Python to help with this. But this makes it easy. 
          The screenshot below shows the <strong>DGX Dashboard</strong> during inference. 
        </p>

        <div className={imageWrapper}>
          <Image
            alt="DGX dashboard during inference"
            loader={imageLoader}
            src={dashboard1}
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
          <p className={altText}>Dashboad spiked GPU, high CPU</p>
        </div>


        <p className={text}>
          You can’t see it here, but CPU utilization rose gradually — while 
          GPU utilization surged almost instantly. It&apos;s doing exactly what it should. 
        </p>

        <div className={imageWrapper}>
          <Image
            alt="Running free -h command in terminal during inference"
            loader={imageLoader}
            src={freeh2}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>High memory usage during inference</p>
        </div>

        <p className={text}>
          After clearing our pipeline and garbage collection we see huge change in 
          the available memory, used memory and free memory: 
        </p>

        <div className={imageWrapper}>
          <Image
            alt="DGX dashboard after inference"
            loader={imageLoader}
            src={dashboard2}
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
          <p className={altText}>Dashboard showing low memory usage</p>
        </div>
        <div className={imageWrapper}>
          <Image
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
          across requests whether I cleared the memory or not. Still, I think it is best practice 
          to free up memory as you can do so safely.
        </p>

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
          Here&apos;s the link to the project where you can see exactly what I built.
        </p>
        <p className={text}>
          Three days in, and I&apos;ve already learned a ton, more that I can share in this one post. 
          There&apos;s still more to explore — but the DGX Spark has been a powerful 
          hands-on way to push deeper into GPU workflows and text-to-image inference.
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
