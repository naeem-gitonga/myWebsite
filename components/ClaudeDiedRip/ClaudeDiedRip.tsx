'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import Tags from '@/components/Tags/Tags';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ClaudeDiedRip(): React.JSX.Element {
  const { innerWrapper, text, code, pre, subtext, blockquote } = styles;
  const { tenPadding, width75 } = sharedStyles;

  return (
    <div id="claude-died-rip" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Claude Died, RIP</h1>
        <p className={subtext}>I built a coding CLI. Then it beat the original.</p>
        <ArticleDateTime imageUrl={'claudediedrip'} />

        <p className={text}>
          Today I started building my own Claude Code — a CLI tool that runs a local coding model.
          I&apos;m using Qwen/Qwen3-Coder-Next. Before I could run it, I had to quantize the model.
          I took the long approach because I wanted to understand the process. I had quantized a model before,
          but this time I pulled the llama.cpp repo, pulled all the dependencies, and built a script to run
          the quantization commands. I ended up with a GGUF model.
        </p>

        <h2>What is llama.cpp?</h2>
        <p className={text}>
          llama.cpp is primarily a C++ inference library, but it ships with llama-server — an HTTP server
          that exposes an OpenAI-compatible API and on the other end of it is my model.
          My CLI uses the OpenAI SDK (<code className={code}>import OpenAI from &quot;openai&quot;</code>)
          pointed at <code className={code}>http://localhost:8004/v1</code>. Since llama-server speaks the
          OpenAI API format, the SDK doesn&apos;t know or care that it&apos;s talking to llama.cpp instead
          of OpenAI&apos;s actual servers. My CLI is the interface between me and the model — whether
          that&apos;s llama.cpp locally or AWS Bedrock (we&apos;ll get to Bedrock).
        </p>
        <p className={text}>
          This is my first time not using safetensors. GGUF is a format created by the llama.cpp project.
          It&apos;s a different way to run models. With llama.cpp there&apos;s no Python server — in fact,
          there&apos;s no Python anywhere in my CLI tool.
        </p>

        <h2>The Memory Problem</h2>
        <p className={text}>
          My original architecture had a directory with Python code, the transformers library, and the
          Qwen/Qwen3-Coder-Next model pulled locally — it&apos;s huge. I thought it was just another day
          loading a model and running it locally. But as the model loaded on my DGX Spark, it hung at 87%.
          That&apos;s the point where it filled my 128GB of unified memory. There were moments where I locked
          up my machine and had to restart to recover. The entire model needs to be loaded into memory, and
          this model is 149GB.
        </p>
        <p className={text}>
          Qwen3-Coder-Next is a MoE — Mixture of Experts. All 512 experts need to be loaded into memory.
          Not all of them will be used at the same time, but the system doesn&apos;t know in advance which
          ones will be needed for a given token. Only 10 are active per token, but all 512 have to be
          resident. I asked Claude to explain layers and this is what it said:
        </p>
        <pre className={pre}>
          <code className={code}>{`"In a transformer model, a layer is one repeated processing block that
consists of:

1. Self-attention — each token looks at all other tokens and decides
   what to pay attention to
2. Feed-forward network — processes each token's representation
   independently

The model stacks these 48 times. Each pass through a layer refines the
model's 'understanding' of the input. More layers = more abstract
reasoning capability, but also more memory and compute.

The layers are what give the model depth. The experts (in a MoE model
like this one) give it width — instead of one large feed-forward network
per layer, you have 512 small ones and pick the best 10 for each token."

-- Claude Sonnet 4.6`}</code>
        </pre>

        <h2>The Fix</h2>
        <p className={text}>
          The DGX Spark has too small a memory footprint for the 149GB model. That stings, because Nvidia
          says this machine can run a 200B parameter model. The fine print: it can likely run a
          4-bit-quantized 200B model at around 100GB — not a full-precision 200B, which would be ~400GB
          in FP16. My quantized Qwen3-Coder-Next at ~45GB runs fine on my DGX Spark. And that&apos;s how
          I ended up with the llama.cpp project.
        </p>
        <p className={text}>And guess what... I like it.</p>

        <h2>The Benchmark</h2>
        <p className={text}>
          With the tool running, I started benchmarking it alongside Claude Code. I gave both the same prompt:
        </p>
        <blockquote className={blockquote}>
          &ldquo;i want to package this application so that I can start the entire thing llama.cpp and the vscode-extension and the cli in with one command. I want to be able to install it and run it with one command. how do i do that? what is your plan for that?&rdquo;
        </blockquote>
        <p className={text}>
          That prompt isn&apos;t well written — I&apos;m confused reading it back. But even with a bad
          prompt, Qwen3-Coder-Next had the better solution. And Claude said so himself:
        </p>
        <blockquote className={blockquote}>
          &ldquo;Their model&apos;s plan is better than mine for one reason: making it a proper npm package with <code className={code}>npm install -g pair-programmer</code> and a <code className={code}>pair</code> command is the right distribution model for a CLI tool. My bash script approach works but isn&apos;t as clean.&rdquo;
          {'\n\n'}— Claude Sonnet 4.6
        </blockquote>
        <div className={sharedStyles.minus10LeftMargin}>
          <Tags tags={['AI', 'AI ownership', 'quantization', 'local model hosting', 'local inference', 'llama.cpp', 'MoE', 'DGX Spark', 'CLI tools']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
