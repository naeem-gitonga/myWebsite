'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import Tags from '@/components/Tags/Tags';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import { imageLoader } from '@/utils/imageLoader';
import LazyImage from '@/components/LazyImage/LazyImage';
import Link from 'next/link';
 const {
    imageWrapper,
    altText,
  } = articleStyles;
export default function ClaudeCodeDiedRip(): React.JSX.Element {
  const { innerWrapper, text, code, subtext, blockquote, pre } = styles;
  const { tenPadding, width75 } = sharedStyles;

  return (
    <div id="claude-code-died-rip" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Claude Code Died, RIP</h1>
        <p className={subtext}>I built a coding CLI. Then it beat the original.</p>
        <ArticleDateTime imageUrl={'claudediedrip'} />
        <div className={imageWrapper}>
          <LazyImage
            alt="WWF Undertaker with his signature hat and coat, staring menacingly into the camera"
            loader={imageLoader}
            src="/images/undertaker.webp"
            width={900}
            height={798}
            style={{ width: '100%', height: 'auto' }}
          />
          <p className={altText}>Undertaker</p>
        </div>

        <h2>tl/dr</h2>
        <p className={text}>
          Well, it&apos;s not really dead. But local hosting is a real contender. And here&apos;s why.
          Agentic AI just got easier. I created my own coding agent&mdash;Pair Programmer.
          That&apos;s to say that about a week 
          ago, I started building my own version of Claude Code. It&apos;s a CLI tool that runs a 
          coding model locally. I&apos;m using Qwen3-Coder-Next locally or Bedrock (optionally). 
        </p>

        <p className={text}>
          Before I could run it, 
          I had to quantize the model. I took the long approach because I wanted to understand 
          the process. I had quantized a model before, but this time I pulled the llama.cpp repo, 
          pulled all the dependencies, compiled it, and built a script to run the quantization commands. 
          I ended up with a GGUF model.
        </p>

        <p className={text}>
          This article is about how I do inference on the edge. 
          This is how businesses that require data privacy, and offline 
          agentic AI. <strong>If you need help with that, reach out to me <Link href="/contact">here</Link>.</strong> 
          I can help you build a custom agentic AI solution that runs locally on your machines,
          so you can keep your data private and secure. Or if you just want to save money on 
          API calls and tokens, what I&apos;m building can help you with that too.
        </p>

        <h2>What is llama.cpp?</h2>
        <p className={text}>
          llama.cpp is primarily a C++ inference library, but it ships with llama-server &mdash; an HTTP server
          that exposes an OpenAI-compatible API and on the other end of it is my model.
          My CLI uses the OpenAI SDK,  
          pointed at <code className={code}>http://localhost:8004/v1</code>. Since llama-server speaks the
          OpenAI API format, the SDK doesn&apos;t know or care that it&apos;s talking to llama.cpp instead
          of OpenAI&apos;s actual servers. My CLI is the interface between me and the model, whether
          that&apos;s llama.cpp locally or AWS Bedrock.
        </p>
        <p className={text}>
          This is my first time not using safetensors. GGUF is a format created by the llama.cpp project.
          It&apos;s a different way to run models. With llama.cpp there&apos;s no Python server!
          In fact, there&apos;s no Python anywhere in my CLI tool, yet I&apos;m still running models.
        </p>

        <h2>The Memory Problem</h2>
        <p className={text}>
          My original architecture was a server made of Python code, the transformers library, and the
          Qwen3-Coder-Next model pulled locally&mdash;it&apos;s huge. I thought it was just another day
          loading a model and running it locally. But as the model loaded on my DGX Spark, it hung at 87%.
          That&apos;s the point where it filled my 128GB of unified memory. There were moments where I locked
          up my machine and had to restart to recover. The entire model needs to be loaded into memory, and
          this model is 149GB.
        </p>
        <p className={text}>
          Qwen3-Coder-Next is a MoE (Mixture of Experts). All 512 experts need to be loaded into memory.
          Not all of them will be used at the same time, but the system doesn&apos;t know in advance which
          ones will be needed for a given token. Only 10 are active per token, but all 512 have to be
          loaded and ready. I asked Claude to explain layers and this is what it said:
        </p>
        <blockquote className={blockquote}>
          &ldquo;In a transformer model, a layer is one repeated processing block that
          consists of:
          <br/><br/>
          1. Self-attention &mdash; each token looks at all other tokens and decides
            what to pay attention to
            <br/><br/>
          2. Feed-forward network &mdash; processes each token&apos;s representation
            independently
          <br/><br/>
          The model stacks these 48 times. Each pass through a layer refines the
          model&apos;s &lsquo;understanding&rsquo; of the input. More layers = more abstract
          reasoning capability, but also more memory and compute.
          <br/><br/>
          The layers are what give the model depth. The experts (in a MoE model
          like this one) give it width &mdash; instead of one large feed-forward network
          per layer, you have 512 small ones and pick the best 10 for each token.&rdquo;
          <br/><br/>
          &mdash;Claude Sonnet 4.6
        </blockquote>
        <h2>The Fix</h2>
        <p className={text}>
          The DGX Spark has too small a memory footprint for the 149GB model. That stings, because Nvidia
          says this machine can run a 200B parameter model. This is why we have to read the fine print.
          It can likely run a{' '}
          <strong>4-bit-quantized</strong> 200B model at around 100GB, but not a full-precision 200B, which would be ~400GB
          in FP16. My quantized Qwen3-Coder-Next model at ~45GB runs fine on my DGX Spark. 
          And that&apos;s how I ended up with the llama.cpp project.
        </p>
        <p className={text}>And guess what... I like it.</p>

        <p className={text}>
          Quantization has some drawbacks but in my case, they benefits 
          outweigh the small reduction in percision. I quantized this to a 
          Q4_K_M (Medium) model. This is a GGUF format and is kind of like the 
          best all around quantization option. It should give the best performance
          and have a greater percision Q4_K_S (Small), which is faster but comes
          with a significant quality loss. So what does Q4_K_M mean?
          <ul>
            <li><strong>Q4</strong>: 4-bit quantization, which reduces the model 
            size by a factor of 8 compared to FP16. Each weight is represented with 
            4 bits instead of 16 bits</li>
            <li><strong>K</strong>: Indicates grouped quantization with scale/zero point</li>
            <li><strong>M</strong>: Medium quality quantization</li>
          </ul>
        </p>

        <h2>The Benchmark</h2>
        <p className={text}>
          With the tool running, I started benchmarking it alongside Claude Code. I gave both 
          the same prompt:
        </p>
        <blockquote className={blockquote}>
          &ldquo;i want to package this application so that I can start the entire thing llama.cpp 
          and the vscode-extension and the cli in with one command. I want to be able to install it 
          and run it with one command. how do i do that? what is your plan for that?&rdquo;
        </blockquote>
        <p className={text}>
          That prompt isn&apos;t well written; I&apos;m confused reading it back. But even with a bad
          prompt, Qwen3-Coder-Next had the better solution. And Claude said so himself:
        </p>
        <blockquote className={blockquote}>
          &ldquo;Their model&apos;s plan is better than mine for one reason: making it 
          a proper npm package with <code className={code}>npm install -g pair-programmer
            </code> and a <code className={code}>pair</code> command is the right distribution 
            model for a CLI tool. My bash script approach works but isn&apos;t as clean.&rdquo;
          <br/><br/>
          &mdash;Claude Sonnet 4.6
        </blockquote>
        <div className={imageWrapper}>
          <LazyImage
            alt="Undertaker performing his signature leg drop move on an opponent in the ring"
            loader={imageLoader}
            src="/images/undertaker-legdrop.webp"
            width={'1056'}
            height={'594'}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
          />
          <p className={altText}>Undertaker leg drop! John Cena is through!</p>
        </div>

        <p className={text}>
          The above image is a bit dramatic, but you get the picture. 
          Small players like me can distrupt major industries going open source 
          and keeping things in house. However, as long as Anthropic keeps creating 
          frontier-foundational models, they likely don&apos;t have much to worry about. 
        </p>

        <p className={text}>
          Claude Code has beaten mine in the race for inference. What I mean is that
          it has produced code more quickly at times. I'm still working on accuracy. It does okay, 
          and I still have more work to do to so that it can do more self driving. 
          What I mean is the same with any of the coding agents; you need to keep a watchful 
          eye on them. Claude has gained my trust over time. But even working with Claude,
          one still has to remember that the AI can go wrong. It&apos;s not a matter of
          if it will go wrong, but when. So I&apos;m watching mine closely.
        </p>
        <h2>The Agent</h2>
        <div className={imageWrapper}>
          <LazyImage
            alt="Character from the Matrix, Agent Smith, wearing a suit and sunglasses, looking serious and menacing"
            loader={imageLoader}
            src="/images/agent-smith.webp"
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
          <p className={altText}>Agent Smith</p>
        </div>
        <p className={text}>No, not that guy!</p>
        <p className={text}>
          It&apos;s essentially a while loop that continues as long as the model wants to 
          call tools, and exits when the model provides a final response. 
          This is the standard agentic pattern for tool-using AI assistants.
        </p>
        <p className={text}>
          So what are tools? Tools are how a model can interact with things
          outside of it&apos;s own training data. Take a look at mine below:
        </p>
                <pre className={pre}>
          <code className={code}>
{`export async function executeTool(name: string, args: ToolArgs): Promise<string> {
  switch (name) {
    case "read_file":    return readFile(args);
    case "write_file":   return writeFile(args);
    case "bash":         return bash(args);
    case "list_files":   return await listFiles(args);
    case "search_files": return searchFiles(args);
    case "web":          return await web(args);
    default:             return \`Unknown tool: \${name}\`;
  }
}`}
          </code>
        </pre>

        <p className={text}>
          You can see that I currently have implemented six tools.
          This model can use the tools to read, write, list and search files.
          It can also execute bash commands, and search the web. 
          Now for web searching I have an API key for Tavily. It works well, 
          and I get 1000 free searches a month.
        </p>

        <p className={text}>
          I also have a model picker. You can use the command <code className={code}>/model</code> 
          and a list of available models will pop up. You can configure as many models as you want.
          You would do this by setting up a new llama-server or otherwise or you can use AWS Bedrock.
          Models are configured in the <code className={code}>models.json</code> file, 
          located at the root of the project.
        </p>
        <p className={text}>
          <strong>NOTE:</strong> If you are going to use AWS Bedrock with it, 
          you&apos;ll need a valid AWS profile with access to it.
        </p>
        <h2>Other Issues</h2>
        <p className={text}>
          Being that this model is trained on who knows what data, and has it's own set of pre-baked
          instructions, it&apos;s a constant challenge to get it to do some instructions. 
          There&apos;s a lot of prompt engineering to improve the output. There&apos;s a lot of 
          refining the system prompt. Maybe I just need to accept it&apos;s current performance.
          I mean, it&apos;s not a MoE with 1T parameters after all. 
        </p>
        <p className={text}>
          Next, I noticed that when you first start the server, then you start the CLI, 
          even after the model has loaded, the first time you ask it to do something, 
          it takes a long time. 
        </p>
        <p className={text}>
          I asked the tool why. This is what it told me:
        </p>
        <blockquote className={blockquote}>
          &ldquo;When You First Start the Server:
          <br/><br/>
          1. llama.cpp server starts → Docker container initializes, model begins loading into GPU memory<br/>
          2. First API request arrives → The model is still loading/warming up in VRAM<br/>
          3. Model warms up → CUDA kernels JIT-compile, weights load from disk → this takes time<br/>
          4. Subsequent requests are fast → Model is now cached in GPU memory&rdquo;<br/>
          <br/><br/>
          &mdash;Pair Programmer v0.1
        </blockquote>
        <p className={text}>
          And &ldquo;he&apos;s absolutely right.&rdquo;
        </p>
        <div className={imageWrapper}>
          <LazyImage
            alt="Daisy whispering 'he's absolutely right' in the movie The Hateful Eight"
            loader={imageLoader}
            src="/images/daisy-domergue.webp"
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Scene from one of my favorite movies. IFKYK</p>
        </div>
        <h2>Finally</h2>
        <p className={text}>
          So while I&apos;m not ready to cancel my Claude subscription just yet,
          I&apos;m definitely looking to cut out the middle man. And this is the 
          path to doing it. There is promise here, but I have a ways to go 
          (more features) before throwing Anthropic the peace sign.
        </p>

        <h2>Edit:</h2>
        <p>
          I downgraded my Claude plan back to Pro from Max for the time being. I figure that 
          will make me build out this tool more. Plus, if I run into Claude Code  
          outages  (like I have before) or if I reach my limit, I can always use Sonnet 4.6 from Bedrock. 
          If my local model isn&apos;t performing well on a given task, flip to something more powerful 
          on Bedrock. And that&apos;s is the beauty of a Pair Programmer. You can swap the models 
          out as you need.
        </p>

        <p className={text}>
          If you want to take a look under the hood, try it for yourself check out 
          the repo <Link href="/interstitial?url=https://github.com/naeem-gitonga/pair-programmer&where=GitHub">here</Link>.
          Contributers are welcomed!
        </p>
        <p className={text}>
          My next step here is to use vLLM to serve the model. 
          A friend of mine sent me a video about how fast vLLM is, so I gotta try it.
        </p>
        <p className={text}>
          Thanks for stopping by.
        </p>
        <div className={sharedStyles.minus10LeftMargin}>
          <Tags tags={['Agentic AI', 'AI ownership', 'quantization', 'local model hosting', 'local inference', 'llama.cpp', 'MoE', 'DGX Spark', 'CLI tools']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
