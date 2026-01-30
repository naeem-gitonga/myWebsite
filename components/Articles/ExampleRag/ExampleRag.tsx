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

        <h2>Query + chat flow &#40;RAG with generation&#41;</h2>
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

        <h2>RAG thresholding (relevance control)</h2>
        <p className={text}>
          One of the most relavant sub-topics in an embedding-based RAG system is relevance control.
          At first, when using the app I would get back results that were not related at all to 
          my query. After looking into it, I discovered that I needed to perform thresholding on the
          results returned from the vector search.
        </p>

        <p className={text}>
          A top‑K vector search always returns “something,” even when it’s irrelevant. To keep
          answers grounded, I add a similarity threshold and filter out matches that are too far
          away in embedding space.
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
          Cosine distance gives you a simple numeric guardrail: lower is more similar, and a default
          threshold like <code>0.8</code> removes loosely related matches without being overly
          aggressive. Tune this with real data — a tight threshold improves precision, while a
          looser one improves recall.
        </p>

        <h2>Why this local serverless style works</h2>
        <p className={text}>
          The biggest advantage is production parity. Each “Lambda” has a single responsibility,
          storage goes through S3‑style interfaces, and the gateway owns WebSocket state — exactly
          how a cloud deployment would be structured. That keeps your local architecture honest and
          makes the eventual cloud migration much smaller.
        </p>

        <h2>What’s next</h2>
        <p className={text}>
          The follow‑up article will cover the cloud deployment details — swapping local services
          for AWS Lambda, S3, and API Gateway, and the small changes required to run at scale. The
          point of this build is that those changes stay contained, not architectural.
        </p>

        <h2>Top‑K vector search (implementation details)</h2>
        <p className={text}>
          The vector store is LanceDB (<code>@lancedb/lancedb</code>), and retrieval happens in
          <code>searchSimilar()</code> in <code>shared/src/db/operations.ts</code>. The Top‑K value is
          controlled by the <code>limit</code> parameter:
        </p>

        <pre className={pre}>
          <code className={code}>
{`const results = await table
  .search(queryVector)
  .limit(limit)  // <-- Top-K parameter
  .toArray();`}
          </code>
        </pre>

        <p className={text}>Top‑K values used in this project:</p>
        <ul className={text}>
          <li className={text}>
            <strong>General queries:</strong> K = 5 (default, configurable via <code>limit</code>)
          </li>
          <li className={text}>
            <strong>RAG context retrieval:</strong> K = 3 (hardcoded in the chat service)
          </li>
        </ul>

        <p className={text}>
          After Top‑K retrieval, results are filtered by a distance threshold to remove semantically
          dissimilar matches:
        </p>

        <pre className={pre}>
          <code className={code}>
            {`.filter((result) => result.score <= maxDistance)`}
          </code>
        </pre>

        <p className={text}>
          So the pipeline is: retrieve Top‑K results → filter by distance score → return relevant
          matches.
        </p>

        <h2>Similarity threshold, cosine distance, and the system prompt</h2>
        <p className={text}>
          The RAG search uses a similarity score threshold to filter out irrelevant results. This
          prevents the system from returning unrelated journal entries when the user's query doesn't
          match any content.
        </p>

        <p className={text}>
          <strong>Configuration</strong> (<code>shared/src/db/operations.ts</code> called by
          <code>chat/src/services/chat.service.ts</code>):
        </p>

        <pre className={pre}>
          <code className={code}>{`searchSimilar(table, queryVector, limit, maxDistance = 1.2)`}</code>
        </pre>

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

        <p className={text}>
          <strong>How it works:</strong>
        </p>
        <ul className={text}>
          <li className={text}>LanceDB returns results with a <code>_distance</code> field (cosine distance)</li>
          <li className={text}>Distance ranges from 0 (identical) to 2 (opposite vectors)</li>
          <li className={text}>Results with distance &gt; <code>maxDistance</code> are filtered out</li>
          <li className={text}>If no results pass the threshold, RAG context is empty</li>
        </ul>

        <p className={text}>
          <strong>Tuning guidance:</strong>
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Threshold</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.5</td>
              <td>Strict - only highly relevant results</td>
            </tr>
            <tr>
              <td>0.8</td>
              <td>Moderate - may miss semantically related but differently phrased content</td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>Balanced (default) - catches related content with different phrasing</td>
            </tr>
            <tr>
              <td>1.5+</td>
              <td>Very permissive - rarely filters anything</td>
            </tr>
          </tbody>
        </table>

        <p className={text}>
          <strong>Example:</strong>
        </p>
        <ul className={text}>
          <li className={text}>
            User asks "hey" → no journal entries about greetings → high distance scores → filtered out
          </li>
          <li className={text}>
            User asks "how was my trip to Paris?" → journal entry about Paris trip → low distance → included
          </li>
        </ul>

        <p className={text}>
          <strong>Why this matters:</strong> Without a threshold, vector search always returns the top
          N results regardless of relevance. A query like "hey" would return whatever entries happen
          to be least dissimilar, even if they're completely unrelated (e.g., an entry about gold).
          The threshold ensures only genuinely relevant context is passed to the LLM.
        </p>

        <h3>System Prompt</h3>
        <p className={text}>
          The <strong>system prompt</strong> is the instruction set that tells the LLM who it is, how
          to behave, and what context it has available. It's the primary mechanism for customizing
          LLM behavior without retraining the model.
        </p>

        <p className={text}>
          <strong>Location:</strong> <code>chat/src/services/chat.service.ts</code> →{' '}
          <code>buildSystemPrompt()</code>
        </p>

        <p className={text}>
          <strong>Structure:</strong>
        </p>

        <pre className={pre}>
          <code className={code}>
{`function buildSystemPrompt(ragContext: RagContext[]): string {
  if (ragContext.length === 0) {
    return \`You are a helpful assistant for a personal journal application.
The user is asking a question, but no relevant journal entries were found.
Respond helpfully and suggest they might want to add more journal entries or rephrase their question.\`;
  }

  const contextEntries = ragContext
    .map((ctx) => \`[\${ctx.entry_date}] \${ctx.text_snippet}\`)
    .join("\\n\\n");

  return \`You are a helpful assistant for a personal journal application.
Use the following journal entries to answer the user's question.
Be conversational and reference specific details from the entries when relevant.
If the entries don't contain enough information to answer, say so honestly.

Relevant journal entries:
\${contextEntries}\`;
}`}
          </code>
        </pre>

        <p className={text}>
          <strong>How it works:</strong>
        </p>

        <p className={text}>
          The system prompt is sent to the LLM as the first message in the conversation, before the
          user's message:
        </p>

        <pre className={pre}>
          <code className={code}>
{`Messages sent to LLM:
┌─────────────────────────────────────────────────────────────┐
│ role: "system"                                              │
│ content: "You are a helpful assistant for a personal        │
│          journal application. Use the following journal     │
│          entries to answer the user's question...           │
│                                                             │
│          Relevant journal entries:                          │
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
              <td>"You are a helpful assistant for a personal journal application" tells the LLM its role and domain</td>
            </tr>
            <tr>
              <td><strong>Behavior</strong></td>
              <td>"Be conversational and reference specific details" shapes response style</td>
            </tr>
            <tr>
              <td><strong>Boundaries</strong></td>
              <td>"If the entries don't contain enough information, say so honestly" prevents hallucination</td>
            </tr>
            <tr>
              <td><strong>Context injection</strong></td>
              <td>RAG results are embedded directly in the prompt, giving the LLM access to user's data</td>
            </tr>
          </tbody>
        </table>

        <p className={text}>
          <strong>Without a system prompt</strong>, the LLM would be a generic assistant with no
          knowledge of:
        </p>
        <ul className={text}>
          <li className={text}>Its purpose (journaling)</li>
          <li className={text}>The user's data (journal entries)</li>
          <li className={text}>How to respond (conversational, honest about limitations)</li>
        </ul>

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
              <td>"Respond in a professional, formal tone"</td>
            </tr>
            <tr>
              <td>Therapy-style</td>
              <td>"You are a supportive listener. Ask reflective questions about the user's feelings"</td>
            </tr>
            <tr>
              <td>Data analysis</td>
              <td>"Analyze patterns across journal entries. Look for trends in mood, topics, and frequency"</td>
            </tr>
            <tr>
              <td>Strict factual</td>
              <td>"Only answer questions that can be directly answered from the journal entries. Never speculate"</td>
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
          This is both a limitation (context window size) and a feature (you control exactly what
          the LLM knows).
        </p>

        <div className={minus10LeftMargin}>
          <Tags tags={['RAG', 'Embedding', 'AI', 'LLM', 'Machine Learning', 'serverless']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
