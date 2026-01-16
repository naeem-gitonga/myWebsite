'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function DontPayForTokens(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    pre,
    subtext,
    table,
    gatedWrapper,
    gatedContent,
    gatedOverlay,
    gatedOverlayInner,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="dont-pay-for-tokens" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>I Don&apos;t Pay For Tokens</h1>
        <p className={subtext}>The Difference Between Using AI and Building AI</p>
        <ArticleDateTime imageUrl={'dontpaytokens'} />
        <div className={imageWrapper}>
          <video
            src="https://d2j3yisnywcb30.cloudfront.net/pix/dont-pay.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(event) => event.preventDefault()}
            style={{ maxWidth: '75%' }}
          />
          <p className={altText}>AI generated video</p>
        </div>
        <h2>A Conversation That Revealed a Knowledge Gap</h2>
        <p className={text}>
          &ldquo;So it cost you $700 because of the tokens?&rdquo;
        </p>
        <p className={text}>
          This question from a technology management consultant stopped me cold.
          I had just explained that producing a 6-minute demo video of my
          AI-powered application cost $700. His assumption&mdash;that I was
          paying per-token to some AI provider&mdash;revealed a fundamental
          misunderstanding about what I had built.
        </p>
        <p className={text}>
          &ldquo;No,&rdquo; I explained. &ldquo;I don&apos;t pay for tokens. I
          built my own AI. My cost is compute&mdash;$50 per hour for the GPU
          servers that run my models.&rdquo;
        </p>
        <p className={text}>
          His response: &ldquo;Yeah, we have an API key that we use to hit a
          server and interact with AI.&rdquo;
        </p>
        <div className={gatedWrapper}>
          <div className={gatedContent}>
            <p className={text}>
              Maybe he didn&apos;t understand the significance of what I had built.
              Even after I explicitly stated that I had built my own AI, he seemed
              only knowledgable of consuming someone else&apos;s. This wasn&apos;t a
              failure of explanation&mdash;it was a gap in understanding that
              exists across much of the technology industry. If a technology
              consultant doesn&apos;t grasp the distinction, how many others share
              this blind spot?
            </p>
            <p className={text}>This is my attempt to bridge that gap.</p>
            <hr />
            <h2>Two Fundamentally Different Worlds</h2>
            <h3>World 1: The API Consumer</h3>
            <p className={text}>
              Many companies interact with AI through APIs. They sign up for OpenAI,
              Anthropic, or Google, receive an API key, and make requests. Each
              request costs tokens&mdash;fractions of a cent per word processed. The
              experience is simple:
            </p>
            <pre className={pre}>
              <code className={code}>
                {`Send text -> Receive response -> Pay per token`}
              </code>
            </pre>
            <p className={text}>
              The infrastructure is invisible. Someone else trained the model.
              Someone else manages the GPUs. Someone else handles the complexity.
              You just pay for what you use. There could be many reasons for this.
              The main reason comes down to dollars and cents.
            </p>
            <p className={text}>
              This is <strong>using</strong> AI.
            </p>
            <h3>World 2: The AI Builder</h3>
            <p className={text}>
              What I built is fundamentally different. There is no API key. There
              is no per-token billing. Instead, there are:
            </p>
            <ul>
              <li className={text}>
                <strong>14 billion parameter models</strong> loaded into GPU memory
              </li>
              <li className={text}>
                <strong>Multi-GPU distributed inference</strong> across 8 NVIDIA
                H100 GPUs
              </li>
              <li className={text}>
                <strong>Real-time video synthesis</strong> generating talking
                avatars
              </li>
              <li className={text}>
                <strong>Concurrent AI services</strong> (speech recognition,
                language models, text-to-speech, video generation) orchestrated
                across shared hardware
              </li>
              <li className={text}>
                <strong>CUDA memory management</strong> down to the byte level
              </li>
              <li className={text}>
                <strong>Model weight distribution</strong> across GPU clusters using
                tensor parallelism
              </li>
            </ul>
            <p className={text}>The cost model is entirely different:</p>
            <pre className={pre}>
              <code className={code}>
                {`Reserve GPU servers -> Load models into memory -> Pay per hour of compute`}
              </code>
            </pre>
            <p className={text}>
              When I generate a video, I&apos;m not paying someone else&apos;s
              margin on top of their compute costs. I&apos;m paying directly for the
              silicon that runs my models. The models themselves? I own them. They
              run on servers I control.
            </p>
            <p className={text}>
              This is <strong>building</strong> AI.
            </p>
            <hr />
            <h2>The Technical Reality</h2>
            <p className={text}>
              Let me show you what &ldquo;building your own AI&rdquo; actually
              involves.
            </p>
            <h3>The Hardware</h3>
            <p className={text}>
              This application requires a minimum of <strong>~$50/hour</strong> in
              GPU compute. That&apos;s not a markup&mdash;that&apos;s the raw cost of
              renting the hardware capable of running these models:
            </p>
            <table className={table}>
              <thead>
                <tr>
                  <th>Instance Type</th>
                  <th>GPUs</th>
                  <th>Memory</th>
                  <th>Cost/Hour</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8x H100 SXM</td>
                  <td>8</td>
                  <td>640 GB HBM3</td>
                  <td>$50-88</td>
                  <td>Production deployment</td>
                </tr>
                <tr>
                  <td>8x A100 SXM</td>
                  <td>8</td>
                  <td>640 GB HBM2e</td>
                  <td>$25-40</td>
                  <td>Development &amp; testing</td>
                </tr>
                <tr>
                  <td>4x A6000</td>
                  <td>4</td>
                  <td>192 GB</td>
                  <td>$8-15</td>
                  <td>Image building &amp; compilation</td>
                </tr>
                <tr>
                  <td>DGX Spark</td>
                  <td>1</td>
                  <td>128 GB</td>
                  <td>&ldquo;Free&rdquo;, my personal hardware</td>
                  <td>Single-GPU development</td>
                </tr>
              </tbody>
            </table>
            <p className={text}>
              Here&apos;s the reality of that $700: the actual demo&mdash;recording
              a 6-minute video of the running application&mdash;took about an hour
              on an H100 instance, roughly $50. The bulk of that hour was getting
              the instance started and configured. They can take 25is minutes to
              start. And after installing all the needed drivers you must restart
              the instance to get everything in running/working order. The other
              $650 was the <strong>learning curve of GPU development itself</strong>
              .
            </p>
            <p className={text}>That $650 included:</p>
            <ul>
              <li className={text}>
                Building Docker images on A6000/A100 instances (CUDA/C++ kernel
                compilation takes 40-50 minutes per build)
              </li>
              <li className={text}>Development and debugging on A100 x 8 instances</li>
              <li className={text}>
                Learning that <strong>GPU architecture matters</strong>&mdash;code
                that works on one GPU may fail on another
              </li>
              <li className={text}>
                Discovering that you must develop on the same architecture you&apos;ll
                deploy on, or the closest equivalent
              </li>
            </ul>
            <p className={text}>
              One critical lesson: the A100 and H100 share architectural
              similarities that make the A100 an ideal development GPU. Both
              support <strong>BF16 (bfloat16)</strong>&mdash;a 16-bit floating point
              format that keeps the same numerical range as 32-bit floats while
              halving memory usage. Modern ML models run almost exclusively in BF16,
              and because both GPUs have native BF16 Tensor Core support, code
              developed on the A100 transfers cleanly to the H100. At half the
              hourly cost, the A100 becomes the practical choice for extended
              development work.
            </p>
            <p className={text}>
              The A6000, while cheaper still, uses GDDR6 memory instead of HBM and
              has a different Tensor Core configuration&mdash;useful for building
              images and compilation, but not for validating inference code.
            </p>
            <p className={text}>
              But here&apos;s the painful truth: even with architectural
              similarities, you won&apos;t know exactly how your application behaves
              until it runs on production hardware. Subtle differences in memory
              bandwidth, thermal throttling, driver behavior, and multi-GPU
              communication mean that an application running perfectly on A100s
              might hit edge cases on H100s. The only way to be certain is to test
              on the actual hardware&mdash;at $50-80/hour. This is one of the hidden
              costs of building AI: the final validation always happens on the most
              expensive tier.
            </p>
            <h3>The Software Architecture</h3>
            <p className={text}>
              This isn&apos;t a single model behind an API. It&apos;s an orchestrated
              system of multiple AI services:
            </p>
            <p className={text}>
              <strong>Speech-to-Text (STT)</strong>
            </p>
            <ul>
              <li className={text}>Whisper Large v3 model</li>
              <li className={text}>Real-time streaming transcription</li>
              <li className={text}>~2GB GPU memory</li>
            </ul>
            <p className={text}>
              <strong>Large Language Model (LLM)</strong>
            </p>
            <ul>
              <li className={text}>Llama 3.2 3B Instruct</li>
              <li className={text}>Conversational AI backbone</li>
              <li className={text}>~8GB GPU memory</li>
            </ul>
            <p className={text}>
              <strong>Text-to-Speech (TTS)</strong>
            </p>
            <ul>
              <li className={text}>F5-TTS model</li>
              <li className={text}>Natural voice synthesis</li>
              <li className={text}>~2GB GPU memory</li>
            </ul>
            <p className={text}>
              <strong>Audio-to-Talking-Video (ATTV)</strong>
            </p>
            <ul>
              <li className={text}>LiveAvatar 14B parameter model</li>
              <li className={text}>Real-time avatar video generation</li>
              <li className={text}>~50GB GPU memory (with offloading)</li>
              <li className={text}>
                Multi-GPU tensor parallelism across 5 GPUs
              </li>
            </ul>
            <p className={text}>
              Each service runs as a containerized microservice, communicating via
              gRPC, sharing GPU resources, and coordinating CUDA memory allocation
              in real-time.
            </p>
            <h3>The Engineering Challenges</h3>
            <p className={text}>
              Here&apos;s a sample of the problems I solved in the past week alone:
            </p>
            <p className={text}>
              <strong>GPU Memory Contention</strong>
            </p>
            <p className={text}>
              When multiple AI services share a single GPU, they compete for CUDA
              contexts. A seemingly innocuous Python import&mdash;
              <code className={code}>import torch.distributed</code>&mdash;at the
              module level caused all services to fail on startup. The fix required
              understanding how PyTorch initializes CUDA contexts and deferring
              imports until they&apos;re actually needed.
            </p>
            <p className={text}>
              <strong>Multi-GPU Distributed Inference</strong>
            </p>
            <p className={text}>
              A 14B parameter model runs slow, in fact let&apos;s say extremely slow
              on a single GPU. I implemented tensor parallelism using PyTorch&apos;s
              distributed framework, coordinating model weights across multiple
              GPUs, broadcasting generation requests between ranks, and handling
              video frame handoffs between the GPU that generates and the GPU that
              serves.
            </p>
            <p className={text}>
              <strong>NVSwitch and Fabric Manager</strong>
            </p>
            <p className={text}>
              On cloud instances with SXM GPUs (the high-bandwidth variant used in
              data centers), inter-GPU communication requires NVSwitch fabric. I
              spent hours debugging &ldquo;Error 802: system not yet
              initialized&rdquo;&mdash;<code className={code}>nvidia-smi</code>{' '}
              showed all 8 GPUs, but CUDA refused to initialize. The culprit? I had
              installed the consumer driver (
              <code className={code}>nvidia-driver-580</code>) instead of the server
              variant (<code className={code}>nvidia-driver-580-server</code>). SXM
              GPUs require the Fabric Manager service to coordinate the NVSwitch
              mesh, and Fabric Manager only works with server drivers. The fix was
              three commands and a reboot&mdash;but finding those three commands
              cost.
            </p>
            <p className={text}>
              <strong>KV Cache Memory Limits</strong>
            </p>
            <p className={text}>
              The video model maintains a key-value cache for temporal consistency.
              This cache has a hard limit of ~8 seconds of audio. Exceeding it
              causes tensor size mismatches. Understanding this required reading
              the model architecture code and calculating memory requirements from
              first principles.
            </p>
            <hr />
            <h2>Why This Matters</h2>
            <h3>The Skills Gap</h3>
            <p className={text}>
              The technology consultant I spoke with advises companies on
              technology strategy. He helps organizations make decisions about AI
              adoption. Yet he couldn&apos;t distinguish between consuming an API
              and running your own infrastructure.
            </p>
            <p className={text}>
              This isn&apos;t a criticism&mdash;it&apos;s an observation about where
              the industry is. The vast majority of &ldquo;AI adoption&rdquo; means
              getting an API key and integrating it into existing systems.
              That&apos;s valuable work, but it&apos;s a different discipline
              entirely from what I&apos;m describing.
            </p>
            <p className={text}>
              The skills required to build AI infrastructure include:
            </p>
            <ul>
              <li className={text}>
                <strong>ML Engineering</strong>: Model loading, inference
                optimization, memory management
              </li>
              <li className={text}>
                <strong>Distributed Systems</strong>: Multi-GPU coordination, tensor
                parallelism, process synchronization
              </li>
              <li className={text}>
                <strong>Systems Programming</strong>: CUDA contexts, GPU drivers,
                kernel-level debugging
              </li>
              <li className={text}>
                <strong>DevOps</strong>: Container orchestration, GPU scheduling,
                resource allocation
              </li>
              <li className={text}>
                <strong>Full-Stack Development</strong>: Service architecture,
                real-time streaming, WebSocket protocols
              </li>
            </ul>
            <p className={text}>
              This combination is rare. Most ML engineers don&apos;t do DevOps. Most
              DevOps engineers don&apos;t understand CUDA. Most full-stack
              developers have never touched GPU programming.
            </p>
            <h3>The Economic Difference</h3>
            <p className={text}>When you use an API, you&apos;re paying:</p>
            <ul>
              <li className={text}>The compute cost</li>
              <li className={text}>The provider&apos;s margin</li>
              <li className={text}>The amortized training cost</li>
              <li className={text}>The convenience premium</li>
            </ul>
            <p className={text}>When you build your own, you&apos;re paying:</p>
            <ul>
              <li className={text}>The compute cost</li>
            </ul>
            <p className={text}>
              That&apos;s it. For high-volume applications, the economics are
              transformative. But more importantly, you gain <strong>control</strong>
              . You can:
            </p>
            <ul>
              <li className={text}>Modify the models</li>
              <li className={text}>Optimize for your specific use case</li>
              <li className={text}>Run offline or air-gapped</li>
              <li className={text}>Avoid vendor lock-in</li>
              <li className={text}>Scale without negotiating enterprise contracts</li>
            </ul>
            <h3>The Capability Difference</h3>
            <p className={text}>
              API providers offer general-purpose models optimized for broad
              applicability. When you run your own infrastructure, you can:
            </p>
            <ul>
              <li className={text}>Fine-tune models on proprietary data</li>
              <li className={text}>
                Chain multiple models in ways APIs don&apos;t support
              </li>
              <li className={text}>
                Achieve latencies impossible through network round-trips
              </li>
              <li className={text}>
                Build capabilities that don&apos;t exist as services yet
              </li>
            </ul>
            <p className={text}>
              The talking avatar in my application? You can get a Speech Avatar
              from several places. But you won&apos;t own the data the models, nor
              the infrastructure. Plus, you will have to apply for permission to us
              one of them. But none of the ones that I saw have the level of detail
              nor resulution that mine has. I mean, I can see the imperfections in
              my skin. None of the ones tat I&apos;ve seen thus far share this level
              of detail and are as high res.
            </p>
            <hr />
            <h2>The Real Cost of &ldquo;Building Your Own AI&rdquo;</h2>
            <p className={text}>Let me be direct about what this requires:</p>
            <p className={text}>
              <strong>Financial Investment</strong>
            </p>
            <ul>
              <li className={text}>
                Development time on GPU servers ranging from $8-80/hour depending on
                the task
              </li>
              <li className={text}>
                Strategic use of cheaper GPUs for compilation, mid-tier for
                development, top-tier only for final testing
              </li>
              <li className={text}>
                Base image creation to avoid repeated 40-50 minute compilation
                cycles
              </li>
              <li className={text}>
                Months of iteration learning GPU-specific behaviors
              </li>
            </ul>
            <p className={text}>
              <strong>Knowledge Investment</strong>
            </p>
            <ul>
              <li className={text}>Deep understanding of ML model architectures</li>
              <li className={text}>GPU programming and CUDA internals</li>
              <li className={text}>
                <strong>GPU architecture differences</strong> and their implications
                (compute capabilities, memory hierarchies, driver requirements)
              </li>
              <li className={text}>Distributed systems design</li>
              <li className={text}>Container orchestration at the GPU level</li>
              <li className={text}>
                Build optimization (base images, layer caching, compilation
                strategies)
              </li>
            </ul>
            <p className={text}>
              <strong>Time Investment</strong>
            </p>
            <ul>
              <li className={text}>Problems that take days to diagnose</li>
              <li className={text}>Documentation that doesn&apos;t exist</li>
              <li className={text}>
                Edge cases unique to specific GPU architectures
              </li>
              <li className={text}>Learning which GPU to use for which task</li>
            </ul>
            <p className={text}>
              The $700 wasn&apos;t the cost of running a 6-minute demo&mdash;that was
              only ~$50. The $700 was the cost of{' '}
              <strong>learning how to develop on GPUs</strong> and that&apos;s not
              including the $4,000+ price of the DGX Spark: understanding that
              A6000s are cost-effective for building images, A100s are ideal for
              development for this applicationbecause they share architecture with
              H100s at half the cost, and that deploying on H100s requires code
              validated on compatible hardware. It was learning that a Python import
              statement can crash your entire GPU stack. It was discovering that
              SXM GPUs need fabric manager and server drivers.
            </p>
            <p className={text}>
              This knowledge doesn&apos;t exist in tutorials. It&apos;s earned
              through $50-per-hour mistakes.
            </p>
            <hr />
            <h2>Conclusion</h2>
            <p className={text}>
              When someone says they&apos;re &ldquo;using AI,&rdquo; they almost
              always mean they have an API key to someone else&apos;s servers.
              That&apos;s legitimate, useful, and increasingly essential for modern
              businesses.
            </p>
            <p className={text}>
              But when someone says they&apos;ve &ldquo;built their own AI,&rdquo;
              the question to ask is: &ldquo;Do you own the models? Do you manage
              the GPUs? Do you handle the CUDA contexts, the memory allocation, the
              distributed inference?&rdquo;
            </p>
            <p className={text}>
              If the answer is yes, you&apos;re talking to someone operating in a
              different world&mdash;one where the cost is measured in compute hours
              rather than tokens, where problems are solved at the driver level
              rather than the API level, and where the result is ownership rather
              than rental.
            </p>
            <p className={text}>
              That&apos;s the world this project lives in. And if you&apos;re
              reading this without fully understanding the difference, you&apos;re
              not alone. But now, perhaps, you understand a little better.
            </p>
            <hr />
            <p className={text}>
              <em>
                The system described in this article runs multiple AI models (14B+
                parameters) across GPU clusters, generating real-time talking avatar
                videos from text input. Production cost: ~$50/hour on H100s.
                Development cost: the education required to get there, Nvidia DGX
                Spark, developing on various GPU architectures. Token cost: $0.
              </em>
            </p>
            <div className={minus10LeftMargin}>
              <Tags
                tags={[
                  'AI Infrastructure',
                  'GPU Computing',
                  'Machine Learning',
                  'CUDA',
                  'Distributed Systems',
                  'DevOps',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
