'use client';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader/PageHeader';
import Tags from '@/components/Tags/Tags';
import styles from '@/components/Articles/Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function CollaborativeProductDevelopment(): React.JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    pre,
    subtext,
    blockquote,
  } = styles;
  const { tenPadding, width75 } = sharedStyles;
  return (
    <div id="collaborative-product-development" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Collaborative Product Development</h1>
        <p className={subtext}>From Idea to Prototype — What was Built and What We Learned</p>
        <ArticleDateTime imageUrl={'collaborativeproduct'} />
        <div className={imageWrapper}>
          <Image
            src="/images/echo-inventory.webp"
            alt="Echo Inventory logo"
            width={400}
            height={400}
            style={{ maxWidth: '60%', height: 'auto' }}
          />
          <p className={altText}>Echo Inventory landing page</p>
        </div>

        <p className={text}>
          I took Collaborative Product Development as a last requirement for a Management in
          Technology Certification at Scheller College of Business. I had some, minimal, product
          development knowledge and great respect for the discipline, but I was hoping this class
          would give me more tools to use as I continue to elevate in my career. TL;DR: It did.
        </p>
        <p className={text}>
          In this article I want to cover two areas: takeaways from the course and Echo Inventory.
          I&apos;ll start in reverse order. With four other classmates we came up with the bright
          idea to help community pantries manage their inventory. We had two problems that we were
          trying to solve: 1) find a problem that your product solves and 2) create a product that
          you can prototype before the end of the course. It was almost like that chicken and egg
          problem.
        </p>

        <h2>Finding the Problem</h2>
        <p className={text}>
          The first few weeks of the class we focused on thinking about problems. Problems give us
          opportunities to create solutions&mdash;key word, <em>create</em>. They give us
          opportunities to make money. We were specifically told not to solution. The thing to know
          is that problems are best found when listening to people. To do that you need to talk to
          people. As archaic as it may seem, the good old-fashioned concept of opening your mouth
          and speaking to people really helps you along here.
        </p>
        <p className={text}>
          The problem that we settled on was the one for the community pantry in a group
          member&apos;s neighborhood. In my mind I did not think that this would be a lucrative
          business or problem to find a solution for. Why? Non-profits usually don&apos;t have a
          lot of money to spend on SaaS products. In a real-world business environment I&apos;m
          going with something else, but it&apos;s the exercise that we want to think and work
          through, so I go with it.
        </p>
        <blockquote className={blockquote}>
          Note: at no point in this process did we discuss pricing. That&apos;s a key tell for
          product development. It doesn&apos;t mean product developers don&apos;t care about
          pricing. Pricing is a commercialization question, not a product development question.
        </blockquote>

        <h2>Echo Inventory</h2>
        <p className={text}>
          After compiling our data and deciding that this was the route to take, I volunteered to
          be our CTO (and developer) and build the solution. What I came up with was Echo
          Inventory. Another group member named it and gave us the logo. For the prototype we
          needed a way for community pantry managers to create an account for their pantry, invite
          members (other volunteers), input items, update items, delete items, and remove members
          from their team. Since our market is two-sided, we also needed a way for pantry visitors
          to browse current inventory and update it when they took something. We thought that would
          be the perfect use case for AI. So, I built an inventory application.
        </p>

        <h2>Architecture</h2>
        <p className={text}>
          As I thought about the project, I decided to go with mostly managed services and an
          all-AWS stack with the exception of the frontend. The frontend uses Next.js. We also
          wanted to make this a progressive web app so that people could save it to their home
          screen and have it feel like a true mobile app. If we were to expand in the future,
          we&apos;d probably want to use React Native. Since I was going to tear this app down
          immediately after the class, I went with the web frontend.
        </p>
        <p className={text}>
          Latency and caching were not a concern for me. If we expected heavy traffic (i.e., thousands
          of users per day), I would have thought about this differently. I used Lambdas for
          our backend services so we could rapidly prototype and host the application for nearly
          nothing. DynamoDB was one of the chosen data stores. S3 was another because I was thinking
          we might want to do some re-training with the images in the future; but then I
          thought, no need. We&apos;re shutting this down&mdash;YAGNI. DynamoDB won as the only
          data store, with no image persistence.
        </p>
        <p className={text}>
          We needed authentication. I used Cognito. It&apos;s fast, AWS-native, secure, and comes
          with out-of-the-box features that make sign-up and sign-in easy. Authorization is minimal
          except for the pantry owner. Only they can create and update pantry members. All
          members can update inventory and access the pantry directly. Anyone can view pantry items
          and update the inventory by submitting pictures. That last part sounds edgy just writing
          it. What if someone decided to play a prank and wipe the inventory? They would need
          pictures to do it, but in theory they could. This is a real security risk that would have
          to be addressed in production. And for that, an auditable trail tied to user accounts would be
          the obvious fix.
        </p>
        <p className={text}>
          We used six Lambdas: <code className={code}>members</code>,{' '}
          <code className={code}>inventory</code>, <code className={code}>orgs</code>,{' '}
          <code className={code}>auth</code>, <code className={code}>image</code>, and{' '}
          <code className={code}>post-confirmation</code>. I could have used one and handled
          everything, but I chose to separate concerns for a more realistic implementation.
        </p>
        <p className={text}>
          An API Gateway sits in front of our Lambdas. Our choice for LLM was Amazon Nova Lite.
          This was my first time using it. It&apos;s great for this prototype. 
          No need for a big expensive model. We just want to examine images,
          identify food items, and have the model update the database based on what it finds. Nova
          Lite does that perfectly, and cheaply. Deployment was done with AWS CDK and GitLab with
          Vercel.
        </p>

        <div className={imageWrapper}>
          <Image
            src="/images/echo-inventory-architecture.webp"
            alt="Echo Inventory architecture diagram"
            width={988}
            height={764}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className={altText}>Echo Inventory architecture</p>
        </div>

        <h2>Design Doc</h2>
        <p className={text}>Below is a breakdown of each Lambda and its responsibilities.</p>

        <h3>Members</h3>
        <p className={text}>
          Members manages org membership: list members, add a member, remove a member.
        </p>
        <pre className={pre}><code className={code}>{`GET  /orgs/{orgId}/members            — list all members of an org
POST /orgs/{orgId}/members            — add a member (owner only)
  - Creates the Cognito user with a temp password → invitation email
  - Writes membership record (ORG#orgId / MEMBER#userId)
  - Writes reverse lookup record (USER#userId / ORG#orgId)
  - Returns the temp password as a UI fallback

DELETE /orgs/{orgId}/members/{userId} — remove a member (owner only)
  - Deletes both DynamoDB records (membership + reverse lookup)
  - Deletes the user from Cognito entirely
  - Guards against removing yourself or the org owner`}</code></pre>

        <h3>Auth</h3>
        <p className={text}>
          Auth handles the full auth lifecycle: signup, confirm email, login, set password,
          refresh token, logout, and get current user.
        </p>
        <pre className={pre}><code className={code}>{`POST /auth/signup       — registers new user (email + password + orgName)
POST /auth/confirm      — confirms email with verification code
POST /auth/login        — authenticates; handles NEW_PASSWORD_REQUIRED for invited members
POST /auth/set-password — completes the new password challenge (invited members, first login)
POST /auth/refresh      — exchanges refresh token (cookie) for new ID token
POST /auth/logout       — returns 200; token invalidation happens client-side
GET  /auth/me           — decodes ID token and returns userId, email, orgName`}</code></pre>

        <h3>Orgs</h3>
        <p className={text}>
          Orgs is read-only. It handles listing and fetching organizations and their inventory
          for both public and authenticated contexts.
        </p>
        <pre className={pre}><code className={code}>{`GET /public/orgs                     — list all orgs
GET /public/orgs/{orgId}             — get a single org
GET /public/orgs/{orgId}/inventory   — list inventory (used by the public capture flow)
GET /orgs                            — list orgs the authenticated user belongs to`}</code></pre>

        <h3>Inventory</h3>
        <p className={text}>
          The app is multi-tenant, meaning each org has its own isolated inventory. The{' '}
          <code className={code}>orgId</code> in the path scopes every operation to a specific
          org, which is how the membership check works. All four routes are authenticated and
          org-membership gated.
        </p>
        <pre className={pre}><code className={code}>{`GET    /orgs/{orgId}/inventory           — list all items for an org
POST   /orgs/{orgId}/inventory           — create a new item manually
PATCH  /orgs/{orgId}/inventory/{itemId}  — partial update on an existing item
DELETE /orgs/{orgId}/inventory/{itemId}  — delete an item`}</code></pre>

        <h3>Image</h3>
        <p className={text}>
          The image Lambda handles two routes: one authenticated, one public. In both cases
          the flow is:
        </p>
        <pre className={pre}><code className={code}>{`1. Accept a base64-encoded image
2. Fetch the org's current inventory from DynamoDB (gives the LLM context)
3. Send the image + inventory context to Bedrock (Nova Lite) via update_inventory tool
4. Apply the tool call result — update existing items or create new ones
5. Public captures are always removals (negative delta)
   Authenticated captures can add or remove

POST /orgs/{orgId}/capture        — authenticated user submits a photo
POST /public/orgs/{orgId}/capture — public visitor submits a photo of items they're taking`}</code></pre>

        <h3>Post Confirmation</h3>
        <p className={text}>
          Post Confirmation is a Cognito trigger, not an API Lambda. It fires once per user
          signup when the user confirms their email, and writes three DynamoDB records:
        </p>
        <pre className={pre}><code className={code}>{`1. The org metadata record
2. The owner membership record  (ORG#orgId / MEMBER#userId)
3. The reverse lookup record    (USER#userId / ORG#orgId)`}</code></pre>

        <h2>Image Processing and Tool Calling</h2>
        <p className={text}>
          We needed a way to intelligently process images. Tool calling is what we needed. The
          LLM also needed image processing capability. Being a product developer, having this type
          of information helps you design the product. Knowing the model matters too; even in production, 
          a cheap off-the-shelf model is probably all you need. The decision to go with Amazon Nova Lite 
          was the best deal for our use case, and it works perfectly.
        </p>
        <p className={text}>
          From a developer standpoint, we didn&apos;t want to manually map data to inventory. We
          wanted to dynamically extract items from images and have the AI do the work of updating
          the inventory. That meant the inventory needed to be well-labeled and the AI needed a
          tool it could use. The more information on each item&mdash;description, brand, item type,
          category, notes&mdash;the better job the model can do identifying the right database
          record to update.
        </p>
        <p className={text}>
          Each time an item is removed, we send the entire inventory as context with the image
          request: item ID, description, brand, etc. for every item. For a prototype this is
          fine. At scale, you&apos;d want to cache this data or run a similarity search to narrow
          the candidate set and let the AI decide which record to update.
        </p>
        <p className={text}>Here is the tool definition:</p>
        <pre className={pre}><code className={code}>{`const UPDATE_INVENTORY_TOOL: Tool = {
  toolSpec: {
    name: 'update_inventory',
    description:
      'Update quantity of existing inventory items or add new ones based on what is ' +
      'visible in the image. Use a negative quantity_delta when items are being removed.',
    inputSchema: {
      json: {
        type: 'object',
        required: ['items'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'quantity_delta', 'unit', 'category'],
              properties: {
                item_id:        { type: 'string',  description: 'ID of the matching inventory item.' },
                name:           { type: 'string',  description: 'Item name as it appears in inventory, or a new name.' },
                quantity_delta: { type: 'number',  description: 'Amount to add (positive) or remove (negative)' },
                unit:           { type: 'string',  enum: ['pcs', 'boxes', 'kg', 'liters', 'rolls', 'other', 'units'] },
                category:       { type: 'string',  enum: ['Food', 'Electronics', 'Tools', 'Office', 'Clothing', 'Household', 'Other'] },
              },
            },
          },
        },
      },
    },
  },
};`}</code></pre>

        <p className={text}>And here is where we used it in the call to the LLM:</p>
        <pre className={pre}><code className={code}>{`const response = await bedrockClient.send(new ConverseCommand({
  modelId: MODEL_ID,
  system: [{ text: systemPrompt }],
  messages: [{
    role: 'user',
    content: [
      { image: { format, source: { bytes: imageBytes } } } as ContentBlock,
      { text: userPrompt },
    ],
  }],
  toolConfig: { tools: [UPDATE_INVENTORY_TOOL] },
}));

const toolUseBlock = response.output?.message?.content?.find(b => b.toolUse);
if (!toolUseBlock?.toolUse) {
  return { updatedItems: [], createdItems: [], message: 'No items identified' };
}

const toolInput = toolUseBlock.toolUse.input as unknown as InventoryToolInput;

// Build a map by itemId for direct lookup — no string matching needed
const itemsById = new Map(inventoryItems.map(i => [i.itemId, i]));
const { updatedItems, createdItems } = await applyInventoryUpdates(orgId, toolInput, isPublic, itemsById);`}</code></pre>

        <h3>How Does Tool Calling Work?</h3>
        <p className={text}>
          <strong>1. Define the tool.</strong> You declare{' '}
          <code className={code}>UPDATE_INVENTORY_TOOL</code> as a JSON schema describing what
          the LLM is allowed to call and what shape its output must take which is an array of items,
          each with <code className={code}>item_id</code>,{' '}
          <code className={code}>name</code>, <code className={code}>quantity_delta</code>,{' '}
          <code className={code}>unit</code>, and <code className={code}>category</code>.
        </p>
        <p className={text}>
          <strong>2. Send the image + tool to Bedrock.</strong> The image, system prompt, and
          tool definition are sent via <code className={code}>ConverseCommand</code>. The
          inventory context is embedded in the system prompt so the model knows what already
          exists. <code className={code}>toolConfig: {'{ tools: [UPDATE_INVENTORY_TOOL] }'}</code>{' '}
          tells the model it has this tool available.
        </p>
        <p className={text}>
          <strong>3. The LLM responds with a tool call instead of text.</strong> Instead of a
          text message, the model responds with structured JSON conforming to the tool schema:
        </p>
        <pre className={pre}><code className={code}>{`{
  "items": [
    { "item_id": "abc123", "name": "Coca-Cola", "quantity_delta": -2, "unit": "cans", "category": "Food" }
  ]
}`}</code></pre>
        <p className={text}>
          <strong>4. You execute the tool yourself.</strong> The LLM doesn&apos;t actually
          update DynamoDB; it just tells you what should happen. You take its{' '}
          <code className={code}>toolInput</code> and run{' '}
          <code className={code}>applyInventoryUpdates</code>, which does the real DynamoDB
          writes. The tool call is a structured contract; the LLM fills it out, you execute it.
        </p>

        <h3>How Does the LLM Know It Should Return a Tool Call?</h3>
        <p className={text}>Two things force it:</p>
        <p className={text}>
          <strong>1. The system prompt</strong> explicitly instructs it:{' '}
          <em>&ldquo;Call the update_inventory tool with every item you identify.&rdquo;</em>
        </p>
        <p className={text}>
          <strong>2. <code className={code}>toolConfig</code></strong>&mdash;by passing the
          tool definition to Bedrock, the model knows the tool exists and is available. Without
          this, the instruction to call the tool would be meaningless.
        </p>
        <p className={text}>
          The model isn&apos;t forced to use it. It can still return plain text if it finds
          nothing to identify, which is why the early return check exists. You could make it
          mandatory by adding{' '}
          <code className={code}>toolChoice: {'{ tool: { name: \'update_inventory\' } }'}</code>{' '}
          to <code className={code}>toolConfig</code>.
        </p>

        <h2>About Collaborative Product Development</h2>
        <p className={text}>
          Going from idea to something tangible is what this is all about. As a group we had
          discussed features like: make a pantry and take a picture to update inventory. But as
          you can see above, there is a lot more. I was only able to add to that because of my
          practical experience. Without a decade in software engineering, I wouldn&apos;t have
          thought through multi-tenancy, authentication, mobile vs. web for the prototype, or
          the trade-offs in the architecture. Good product managers are technical. They just
          don&apos;t implement it themselves. The best product manager I ever had had a BS in
          Computer Science and a Master&apos;s in Operations Research from an Ivy League
          institution. Technical and knew how to find the answers.
        </p>
        <p className={text}>
          Ask yourself: &ldquo;If the solution exists, why is it not being used?&rdquo; Other
          questions to ask before building a product:
        </p>
        <ul>
          <li className={text}>Why is the problem unsolved or poorly solved?</li>
          <li className={text}>Why am I in a good position to dig deep on this problem?</li>
          <li className={text}>What industry am I in?</li>
          <li className={text}>What is the market segment, competition, capital needs, business strategy?</li>
        </ul>
        <p className={text}>
          All of that gives you the script for winning and the playbook for adding value. When
          looking at ways to improve a product or service, look at how you could also help the
          vendor or service provider. Ask:
        </p>
        <ul>
          <li className={text}>What are areas to make things more efficient?</li>
          <li className={text}>How can we make operators more profitable?</li>
          <li className={text}>Have you identified the steps in the customer journey?</li>
          <li className={text}>Can you improve or eliminate steps in that journey?</li>
          <li className={text}>Have you identified all sides of the market?</li>
        </ul>
        <p className={text}>
          Many folks struggle to know if an idea is good or not. The main thing is customer
          discovery. I&apos;ve talked about it in{' '}
          <Link href="/articles/tiger-experience">My TI:GER Experience</Link>. Build on fact&mdash;not your own opinion.
        </p>

        <h2>What a Prototype Is</h2>
        <p className={text}>
          Knowing the definition of a prototype is important. Loosely, it is a tool to go from
          an idea to a position of knowledge. It is an approximation of what you want. You build
          a prototype to not waste money. It is for learning.
        </p>
        <p className={text}>
          In the case of Echo Inventory, our product depended on marginal and production costs
          (resources). We had zero money and finite time. However, since there was no physical
          product, we didn&apos;t have to worry too much about constraint imbalances. There is a
          ton of free tooling out there to get this done at nearly zero cost. And because I have
          a decade in software engineering. I know many of the best ones. The more
          constraints you have, the more complex your product is.
        </p>

        <h2>What Product Development Does Not Answer</h2>
        <p className={text}>
          Product development does not answer the questions of:
        </p>
        <ul>
          <li className={text}>What to do with a cool new technology</li>
          <li className={text}>Should you patent the idea</li>
          <li className={text}>Who will fund the company or venture</li>
          <li className={text}>Can we sell the idea rather than build a product</li>
          <li className={text}>Who will supply parts or services</li>
        </ul>
        <p className={text}>
          All of that goes down the path of commercialization. At this stage, we sense a gap,
          define a problem, iterate on alternatives, select a concept, and move forward. The
          main things are to:
        </p>
        <ul>
          <li className={text}>Understand the user needs (customer discovery)</li>
          <li className={text}>Brainstorm ideas</li>
          <li className={text}>Select the product or service concept</li>
          <li className={text}>Test those concepts via prototype or searching for the best idea</li>
        </ul>
        <p className={text}>
          What we want at this product development stage is to explore and get a sense of the
          opportunity, get it done through project management, collaborate with others, and search
          for the best idea to produce what&apos;s needed.
        </p>
        <p className={text}>
          Finally: the customer dictates the product, so listen to them. New products are
          always the most unpredictable and iterative. The same idea can take a service form.
          Keep a tight leash on what you create. You may only have a few resources to draw from,
          so use them wisely. And without a decade of hands-on experience and technological
          knowledge, all of this would have been far more challenging, especially for the
          first-timer.
        </p>
        <Tags
          tags={[
            'Product Development',
            'Customer Discovery',
            'AWS',
            'Amazon Bedrock',
            'Amazon Nova Lite',
            'Tool Calling',
            'Progressive Web App',
            'Georgia Institute of Technology',
            'Echo Inventory',
          ]}
        />
      </div>
      <ReturnArrow />
    </div>
  );
}
