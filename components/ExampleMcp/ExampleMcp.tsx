'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import Image from 'next/image';
import Link from 'next/link';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ExampleMcp(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    pre,
    subtext,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="example-mcp" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Example MCP</h1>
        <p className={subtext}>Understanding the Model Context Protocol</p>
        <ArticleDateTime imageUrl={'examplemcp'} />
        <div className={imageWrapper}>
          <Image
            src="/images/example-mcp.webp"
            alt="MCP README Summary Server"
            width={400}
            height={400}
            priority
          />
          <p className={altText}>MCP README Summary Server</p>
        </div>

        <h2>What is MCP?</h2>

        <p className={text}>
          So, have you ever heard of MCPs? Well if you&apos;re anywhere near the
          technology, specifically AI, it&apos;s all the rage. MCP stands for
          Model Context Protocol. A protocol is a set of established rules,
          standards, or procedures that govern how data, systems, or entities
          communicate and interact, ensuring consistent and effective
          exchange&mdash;according to Google&apos;s AI Overview.
        </p>
        <p className={text}>
          So this is a way to establish some rules and standards on how models
          can interact with other systems.
        </p>

        <h2>The Three Primitives</h2>
        <p className={text}>
          MCPs have three primitives: <strong>tools</strong>,{' '}
          <strong>resources</strong>, and <strong>prompts</strong>. In Example
          MCP we exhibit all primitives.
        </p>

        <h3>Tools</h3>
        <p className={text}>
          Starting with tools, we have <code className={code}>readme_summary</code>{' '}
          and <code className={code}>readme_from_git</code>. Tools are actions&mdash;the
          LLM can call them to do something and get a result back.
        </p>
        <p className={text}>
          If you are integrating this into an AI application where you have
          built your own AI, you will need to ensure that you are using an LLM
          that is capable of calling tools (tool calling). The Llama 3.1 and 3.2
          families are two such models that have this capability.
        </p>

        <h3>Resources</h3>
        <p className={text}>
          Resources, another primitive, is something stateful that the LLM can
          read from and ingest as context. In this example we use the README.md
          in the root dir. However, it can be whatever you want it to be.
        </p>
        <p className={text}>
          Resources are not limited to one type. They can be of almost any data
          type. They can be static or dynamic. That means they can be generated
          and then accessed by a template later (e.g.,{' '}
          <code className={code}>resource://logs/&#123;date&#125;</code>).
        </p>

        <h3>Prompts</h3>
        <p className={text}>
          And then there are Prompts. They differ in that they are
          user-initiated. The user explicitly selects them, usually through a UI
          or command. The prompt then provides a pre-filled template that gets
          sent to the LLM.
        </p>
        <div className={imageWrapper}>
          <Image
            src="/images/mcp-prompt.webp"
            alt="MCP Prompt example in Claude"
            width={822}
            height={56}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className={altText}>MCP Prompt selection in Claude</p>
        </div>

        <h2>Architecture</h2>
        <p className={text}>
          In our example, we&apos;ve hooked the MCP up to Claude. Here Claude is
          the MCP Host which has an MCP Client which talks to my MCP server. The
          information that the server sends the client, the client uses when
          talking to the Claude LLM.
        </p>
        <div className={imageWrapper}>
          <Image
            src="/images/mcp-architecture.webp"
            alt="MCP Architecture diagram showing Claude Code as MCP Host"
            width={516}
            height={152}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className={altText}>MCP Architecture Overview</p>
        </div>

        <h2>JSON-RPC 2.0</h2>
        <p className={text}>
          MCPs use JSON-RPC 2.0. If you want to learn more about it visit{' '}
          https://www.jsonrpc.org. Its core is JSON. So if you are familiar with JSON and JavaScript,
          you&apos;ve got this one figured out too. It is specifically used for
          MCP-model communications.
        </p>

        <h2>Getting Started</h2>
        <p className={text}>
          Great! You&apos;ve made it this far. This will give you a basic
          understanding of how MCPs work. If you understand this and understand
          how general web servers work, you&apos;re in great shape to begin
          engineering.
        </p>
        <p className={text}>
          It is important to mention that this example is an example of 
          Retrieval&#45;Augmented Generation &#40;RAG&#41;. While this is not
          Embedding&#45;based RAG it still is retreiving information and from 
          what is retreived we get a modified output. We&apos;ll cover embedding in 
          our next article.
        </p>
        <p className={text}>
          The rest is foundational, fundamental coding and DevOps best
          practices, mostly. In this example we show how to use the Example MCP with
          Claude. Stay tuned as I build more AI systems. Go view the repo for Example 
          MCP; click <Link href="/interstitial?url=https://github.com/naeem-gitonga/example-mcp/tree/master&where=GitHub">here</Link>.
          Try it for yourself.
        </p>
        
        <p className={text}>
          Thanks for dropping by! Make sure to repost.
        </p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'MCP',
              'Model Context Protocol',
              'AI',
              'Claude',
              'LLM',
              'JSON-RPC',
              'RAG'
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
