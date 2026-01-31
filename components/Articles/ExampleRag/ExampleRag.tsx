'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import ExampleRagServiceTable from '@/components/Articles/ExampleRag/ExampleRagServiceTable';

export default function ExampleRag(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    pre,
    code,
    gatedOverlay,
    gatedOverlayInner,
    gatedContent,
    gatedWrapper,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  // * &rdquo; &ldquo; &apos;
  return (
    <div id="example-rag" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Embedding&#45;Based RAG, Locally: A Serverless&#45;Style Architecture You Can Ship</h1>
        <ArticleDateTime imageUrl="examplerag" />
        <div className={imageWrapper}>
          <LazyImage
            alt="Local RAG architecture diagram"
            loader={imageLoader}
            src="/images/example-rag-architecture.webp"
            width={745}
            height={512}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}>Local AWS&#45;style RAG architecture.</p>
        </div>

        <p className={text}>
          Retrieval&#45;Augmented Generation &#40;RAG&#41; is only as good as the retrieval it does. In practice,
          that means building a clean ingestion pipeline, predictable query behavior, and a
          generation path that uses the retrieved context without leaking architecture complexity
          into the rest of your system. This article shows a practical, embedding&#45;based RAG design
          and why I intentionally built it to feel like AWS serverless — but run entirely locally.
        </p>

        <h2>Why I built a local AWS&#45;style RAG</h2>
        <p className={text}>
          I was inspired by AWS&apos;s serverless RAG architecture and wanted to build the same
          idea locally so I could iterate fast, keep feedback loops tight, and still deploy to AWS
          later with minimal refactoring. The AWS article that is the inspiration for this project
          is below:
        </p>

        <pre className={pre}>
          <code className={code}>
            https://aws.amazon.com/startups/learn/serverless-retrieval-augmented-generation-on-aws?lang=en-US
          </code>
        </pre>

        <p className={text}>
          The goal is local parity with cloud services: the same request shapes, the same separation
          of responsibilities, and the same operational boundaries. In this example 
          we have a complete system that &ldquo;should&rdquo;  easily be deployable to AWS when the user is ready.
        </p>
        <h2>Embedding&#45;based RAG in one loop</h2>
        <p className={text}>Here&apos;s the core loop were designing for:</p>
        <ul className={text}>
          <li className={text}>
            <strong>Ingest</strong>: turn documents into embeddings and store them in a vector
            database.
          </li>
          <li className={text}>
            <strong>Retrieve</strong>: embed a user query and retrieve the closest vectors.
          </li>
          <li className={text}>
            <strong>Generate</strong>: send the retrieved context to the LLM to ground its response.
          </li>
        </ul>

        <h2>End&#45;to&#45;end architecture &#40;local AWS&#45;style&#41;</h2>
        <p className={text}>
          The system is organized as a set of small services with clear boundaries. Each services maps
          directly to an AWS  service:
        </p>

        <ExampleRagServiceTable />

        <p className={text}>
          You can see the 1:1 mapping of each service — but every
          component runs locally so we can iterate quickly and keep architecture drift low.
        </p>

        <h2>Ingestion flow (practical walkthrough)</h2>
        <p className={text}>
          Documents are ingested through the gateway, embedded, and stored in LanceDB:
        </p>
        <ol className={text}>
          <li className={text}>Client sends a document over WebSocket.</li>
          <li className={text}>Gateway invokes the ingestion service.</li>
          <li className={text}>Ingestion calls the embedding service.</li>
          <li className={text}>Embeddings are stored in LanceDB.</li>
        </ol>

        <h2>Query + chat flow</h2>
        <p className={text}>
          The chat flow pulls context from the vector store and then passes it to the LLM:
        </p>
        <ol className={text}>
          <li className={text}>Client sends a user query.</li>
          <li className={text}>Chat service embeds the query and retrieves similar entries.</li>
          <li className={text}>Gateway streams tokens from the LLM back to the client.</li>
          <li className={text}>Assistant response is saved with its RAG context.</li>
        </ol>

        <p className={text}>
          And that&apos;s the core RAG loop: ingest documents, retrieve relevant context, and generate
          grounded responses. Much easier said than done. So let&apos;s take a look at how we tune the 
          system to give us the most relevant results.
        </p>

        <h2>RAG thresholding &#40;relevance control&#41;</h2>
        <p className={text}>
          One of the most relavant sub-topics in an embedding-based RAG system is relevance control.
          At first, when using the app I would get back results that were not related at to 
          my query. After looking into it, I discovered that I needed to perform thresholding on the
          results returned from the vector search.
        </p>

        <p className={text}>
          A <strong>Top&#45;K</strong> vector search could return something, even when it&apos;s irrelevant. To keep
          answers grounded, I added a similarity threshold and filter out matches that are too far
          away in embedding space. Top&#45;K seeks to limit token selection to the <em>k</em>{' '}
          most probable next words during text generation.
        </p>

        <pre className={pre}>
          <code className={code}>
{`const results = await table
  .vectorSearch(embedding)
  .limit(limit)
  .toArray();

return results.filter((result) => result.score <= maxDistance);`}
          </code>
        </pre>

        <p className={text}>
          <strong>Cosine distance</strong> is an important term in machine learning embeddings.
          To put it plainly, it gives us a simple numeric guardrail. I needed to to 
          tune this value to get relevant results for my use case. The range is 0 &#40;identical&#41; to 2 
          &#40;opposite&#41;. I ended up picking a value of 1.2.
          Why? It just worked well for the entries that I made. And that's where the art of RAG 
          comes in and also the need for MLOps so that you can monitor the performance 
          of your RAG system over time.
        </p>

         <table className={styles.table}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>maxDistance</td>
              <td>1.2</td>
              <td>Maximum cosine distance allowed (lower = more similar)</td>
            </tr>
          </tbody>
        </table>

        <h2>Top&#45;K vector search &#40;implementation details&#41;</h2>
        <p className={text}>
          For this app, the vector store that we use is LanceDB and retrieval happens in
          <code className={code}>searchSimilar()</code> in <code className={code}>shared/src/db/operations.ts</code>. 
          The Top&#45;K value is controlled by the <code className={code}>limit</code> parameter:
        </p>

        <p className={text}>Top&#45;K values used in this project:</p>
        <ul className={text}>
          <li className={text}>
            <strong>General queries:</strong> K &#61; 5 &#40;default, configurable via <code>limit</code>&#41;
          </li>
          <li className={text}>
            <strong>RAG context retrieval:</strong> K &#61; 3 &#40;hardcoded in the chat service&#41;
          </li>
        </ul>

        <p className={text}>
          After Top&#45;K retrieval, results are filtered by a distance threshold to remove semantically
          dissimilar matches:
        </p>

        <pre className={pre}>
          <code className={code}>
            {`.filter((result) => result.score <= maxDistance)`}
          </code>
        </pre>

        <p className={text}>
          So the pipeline is: retrieve Top&#45;K results &rarr; filter by distance score &rarr; return relevant
          matches.
        </p>

        <h2>Similarity threshold, cosine distance, and the system prompt</h2>
        <p className={text}>
          The RAG search uses a similarity score threshold to filter out irrelevant results. This
          prevents the system from returning unrelated entries when the user's query doesn't
          match any content.
        </p>

        <p className={text}>
          <strong>Configuration</strong> <code className={code}>shared/src/db/operations.ts</code> called by{' '}
          <code className={code}>chat/src/services/chat.service.ts</code>:
        </p>

        <pre className={pre}>
          <code className={code}>{`searchSimilar(table, queryVector, limit, maxDistance = 1.2)`}</code>
        </pre>

        <p className={text}>
          <strong>Why this matters:</strong> Without a threshold, vector search always returns the top
          N results regardless of relevance. A query like &rdquo;hey&ldquo; would return whatever entries happen
          to be least dissimilar, even if they're completely unrelated.
          The threshold ensures only genuinely relevant context is passed to the LLM.
        </p>
        <h2>From prompt to response</h2>
        <p className={text}>
          The <strong>system prompt</strong> is the instruction set that tells the LLM who it is, how
          to behave, and what context it has available. It&apos;s the primary mechanism for customizing
          LLM behavior without retraining the model.
        </p>

        <p className={text}>
          <strong>Location:</strong> <code className={code}>chat/src/services/chat.service.ts</code> &rarr;{' '}
          <code className={code}>buildSystemPrompt()</code>
        </p>

        <p className={text}>
          <strong>Structure:</strong>
        </p>

        <pre className={pre}>
          <code className={code}>
{`function buildSystemPrompt(ragContext: RagContext[]): string {
  if (ragContext.length === 0) {
    return \`You are a helpful assistant.
      The user is asking a question, but no relevant entries 
      were found. Respond helpfully and suggest they might 
      want to add more entries or rephrase their 
      question.
    \`;
  }

  const contextEntries = ragContext
    .map((ctx) => \`[\${ctx.entry_date}] \${ctx.text_snippet}\`)
    .join("\\n\\n");

  return \`You are a helpful assistant. Use the following 
    entries to answer the user's question. Be conversational and 
    reference specific details from the entries when relevant.
    If the entries don't contain enough information to answer, 
    say so honestly.

    Relevant entries:
    \${contextEntries}
  \`;
}`}
          </code>
        </pre>

        <p className={text}>
          <strong>How it works:</strong>
        </p>

        <p className={text}>
          The system prompt is sent to the LLM as the first message in the conversation, before the
          user&apos;s message:
        </p>

        <pre className={pre}>
          <code className={code}>
{`Messages sent to LLM:
┌─────────────────────────────────────────────────────────────┐
│ role: "system"                                              │
│ content: "You are a helpful assistant. Use the following.   │
│          entries to answer the user's question...           │
│                                                             │
│          Relevant entries:                                  │
│          [2026-01-27] the price of gold is $5,220.50..."    │
├─────────────────────────────────────────────────────────────┤
│ role: "user"                                                │
│ content: "what's the current price of gold?"                │
└─────────────────────────────────────────────────────────────┘`}
          </code>
        </pre>

        <p className={text}>
          <strong>Why it matters:</strong>
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Identity</strong></td>
              <td>&rdquo;You are a helpful assistant for a personal application&ldquo; tells the LLM its role and domain</td>
            </tr>
            <tr>
              <td><strong>Behavior</strong></td>
              <td>&rdquo;Be conversational and reference specific details&ldquo; shapes response style</td>
            </tr>
            <tr>
              <td><strong>Boundaries</strong></td>
              <td>&rdquo;If the entries don't contain enough information, say so honestly&ldquo; prevents hallucination</td>
            </tr>
            <tr>
              <td><strong>Context injection</strong></td>
              <td>RAG results are embedded directly in the prompt, giving the LLM access to user's data</td>
            </tr>
          </tbody>
        </table>

        <p className={text}>
          <strong>Without a system prompt</strong>, the LLM would be not know it was an 
          assistant and would not have any context about or knowledge of:
        </p>
        <ul className={text}>
          <li className={text}>Its purpose</li>
          <li className={text}>The user's data</li>
          <li className={text}>How to respond &#40;conversational, honest about limitations&#41;</li>
        </ul>

        <p className={text}>
          This would leave it prone to hallucinations and other undesired behaviors. Remember,
          this is still a computer so, garbage in, garbage out.
        </p>

        <p className={text}>
          <strong>Customization examples:</strong>
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Use Case</th>
              <th>System Prompt Modification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>More formal tone</td>
              <td>&rdquo;Respond in a professional, formal tone&ldquo;</td>
            </tr>
            <tr>
              <td>Therapy-style</td>
              <td>&rdquo;You are a supportive listener. Ask reflective questions about the user's feelings&ldquo;</td>
            </tr>
            <tr>
              <td>Data analysis</td>
              <td>&rdquo;Analyze patterns across entries. Look for trends in mood, topics, and frequency&ldquo;</td>
            </tr>
            <tr>
              <td>Strict factual</td>
              <td>&rdquo;Only answer questions that can be directly answered from the entries. Never speculate&ldquo;</td>
            </tr>
          </tbody>
        </table>

        <p className={text}>
          <strong>The RAG + System Prompt pattern:</strong> This is the core of how RAG applications
          work:
        </p>

        <pre className={pre}>
          <code className={code}>
{`1. User asks a question
2. System searches vector database for relevant content
3. Relevant content is injected into the system prompt
4. LLM receives: system prompt (with context) + user message
5. LLM generates response grounded in the provided context`}
          </code>
        </pre>

        <p className={text}>
          The LLM doesn't have direct database access—it only sees what's included in the prompt.
          This is both a limitation &#40;context window size&#41; and a feature &#40;you control exactly what
          the LLM knows&#41;.
        </p>

        <h2>Why this local serverless style works</h2>
        <p className={text}>
          The biggest advantage is production parity. Each &rdquo;Lambda&ldquo; has a single responsibility,
          storage goes through S3&#45;style interfaces, and the gateway owns WebSocket state — exactly
          how a cloud deployment would be structured. That keeps your local architecture honest and
          makes the eventual cloud migration much smaller.
        </p>

        <h2>What&apos;s next</h2>
        <p className={text}>
          The follow&#45;up article will cover the cloud deployment details — swapping local services
          for AWS Lambda, S3, and API Gateway, and the small changes required to run at scale. The
          point of this build is that those changes stay contained, not architectural.
        </p>

        <div className={minus10LeftMargin}>
          <Tags tags={['RAG', 'Embedding', 'AI', 'LLM', 'Machine Learning', 'serverless']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
