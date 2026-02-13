'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import { imageLoader } from '@/utils/imageLoader';
import Tags from '@/components/Tags/Tags';

import Link from 'next/link';

const { innerWrapper, text, altText, imageWrapper, subtext, pre, code, minus10LeftMargin } = articleStyles;
const { tenPadding, width75 } = sharedStyles;

export default function ToLiveAi(): React.JSX.Element {
  return (
    <div id="tolive-ai" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>ToLive AI</h1>
        <p className={subtext}>Your Personal AI That Knows You</p>
        <ArticleDateTime imageUrl="toliveai" />
        <div className={imageWrapper}>
          <LazyImage
            alt="Embodiment of an AI personal assistant"
            loader={imageLoader}
            src="/images/tolive-ai-hero.webp"
            width={1536}
            height={1024}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            loading="eager"
            fetchPriority="high"
            data-testid="tolive-hero-image"
          />
          <p className={altText}>ToLive AI personal assistant</p>
        </div>

        <p className={text}>
          Let&apos;s take an architectural dive into the product that made me $1M in
          ARR—says me to a future audience. ToLive AI is a RAG application that
          has 18 moving parts.
        </p>

        <p className={text}>
          The thought in this design was to make something scalable, resilient,
          and secure.
        </p>
        <p className={text}>
          Currently there are three separate data stores: MongoDB, Waitlist S3
          bucket, and Journal S3 Bucket (LanceDB).
        </p>
        <p className={text}>
          <strong>Two models</strong>: <code className={code}>amazon.titan-embed-text-v2:0</code> and
          <code className={code}>anthropic.claude-3-haiku-20240307-v1:0</code>.
        </p>
        <p className={text}>AWS Cognito for auth.</p>
        <p className={text}>
          Stripe to process payments and manage subscriptions.
        </p>
        <h2>From where we were, to here we are</h2>
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
          <p className={altText}>Example RAG architecture.</p>
        </div>
        <p className={text}>
          If you haven&apos;t read the Example RAG article, I recommend you 
          do so before reading the rest of this. It goes into the architecture of 
          the local version of this app. The live version has a different architecture. 
          The local version is meant for learning and rapid development. The live version 
          is meant for scale. The architectural decisions that went into 
          the live version were made with scalability, security, and resilience in mind. 
          The local version keeps things as simple as possible, keeeping easy development in mind.
        </p>
        <p className={text}>Below is the architectural diagram for the live version of ToLive AI.</p>
        <div className={imageWrapper}>
          <LazyImage
            alt="System diagram for ToLive AI"
            loader={imageLoader}
            src="/images/tolive-architectural-diagram.webp"
            width={720}
            height={783}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            loading="eager"
            fetchPriority="high"
          />
          <p className={altText}>ToLive AI architectural diagram, as of Feb 12, 2026</p>
        </div>
         <ol className={text}>
          <li>Client (Next.js React web app)</li>
          <li>Stripe</li>
          <li>Route53</li>
          <li>REST API Gateway</li>
          <li>Websocket API Gateway</li>
          <li>Authorizer service</li>
          <li>EventBridge</li>
          <li>Billing service</li>
          <li>Auth service</li>
          <li>Waitlist service</li>
          <li>Ingestion service</li>
          <li>Embedding model (Bedrock)</li>
          <li>LLM (Bedrock)</li>
          <li>Chat service</li>
          <li>Cognito</li>
          <li>MongoDB instance</li>
          <li>Waitlist S3 bucket</li>
          <li>Journal S3 Bucket (LanceDB)</li>
        </ol>

        <p className={text}><strong>*</strong>All of the services in orange are AWS Lambdas.</p>

        <h2>Two Gateways, Different Jobs</h2>
        <p className={text}>
          We have two API Gateways. One is for holding the websocket connection
          and the second is for all of our REST APIs. I chose to go with a v1
          API. V2 is faster and cheaper and less feature rich. However, for the
          v1 API the cost per million requests, let&apos;s say that I get
          100,000,000 requests, my bill only goes up $250. But by that point 
          I&apos;ll likely be using the the other features so the future 
          cost is inconsequential compared to the revenue we&apos;ll be earning 
          at that point. Pluse I won&apos;t incur the OpEx of refactoring the infrastrucure. 
          This was just one of the architectural decisions that had to go into some of
          the technical decisions in this deployed version.
        </p>


        <h2>WebSocket Authorizer Trade-offs</h2>
        <p className={text}>
          The authorizer lambda is needed for Websocket Gateways authentication
          verification. Websockets APIs don&apos;t support JWT authorizers, like our
          REST API. I could have used the same Authorizer for my other gateway
          as well. But here lies a trade-off conversation.
        </p>
        <p className={text}>Trade-offs:</p>
        <ul className={text}>
          <li>
            Pro: One fewer Lambda invocation per request — eliminates the
            authorizer&apos;s cold start and execution latency entirely.
          </li>
          <li>
            Con: Each service (ingestion, billing, waitlist) now owns auth
            responsibility. If the validation logic has a bug, it&apos;s a security
            issue. <strong>Mitigated by using the same code <code className={code}>shared/src/auth.ts</code> that
            the WebSocket authorizer uses.</strong>
          </li>
          <li>
            Con: Each service Lambda cold start now fetches JSON Web Key Set
            (JWKS) once (previously only the authorizer did this). <strong>Acceptable
            because JWKS is cached at module level — it&apos;s a one-time cost per
            cold start (50-100ms).</strong>
          </li>
        </ul>
        <h3>Why the WebSocket authorizer stayed</h3>
        <p className={text}>
          After the <code className={code}>$connect</code> handshake,
          subsequent WebSocket frames don&apos;t carry HTTP headers. The authorizer
          must populate <code className={code}>requestContext.authorizer.principalId</code> at connect time so
          later frames can identify the user. That&apos;s an API Gateway constraint
          you can&apos;t work around.
        </p>
        <p className={text}>
          The two gateways have separate responsibilities because the request
          types they deal with are so different in behavior and form. The
          gateway is mostly a proxy. The Websocket gateway holds the actual
          connection. Since the lambdas are ephemeral, they cannot be expected to
          hold a long-lived websocket connections. And that&apos;s why the v2 Websocket
          API Gateway is necessary.
        </p>
        <p className={text}>
          In our local setup we have one gateway service that can handle both
          websockets and REST. But hey, it&apos;s a local server. We can configure it
          to do whatever we want.
        </p>

        <h2>Why Route53 Was Needed</h2>
        <p className={text}>
          <strong>The problem:</strong> Browsers don&apos;t send cookies across domains. Our auth
          cookies were set for <code className={code}>tolive.ai</code>, but the WebSocket endpoint was
          at <code className={code}>a4o7rs1e05.execute-api.us-west-1.amazonaws.com</code>. Different domain =
          cookies not sent = authorizer always got <code className={code}>401</code>.
        </p>
        <p className={text}>
          <strong>The fix:</strong>Route53 was needed to create a custom domain
          <code className={code}>ws.tolive.ai</code> for the WebSocket API Gateway. With cookies set
          to <code className={code}>Domain=.tolive.ai</code>, the browser sends them to both:
        </p>
        <ul className={text}>
          <li>tolive.ai (frontend)</li>
          <li>ws.tolive.ai (WebSocket)</li>
        </ul>
        <p className={text}>
          Why Route53 specifically (not Vercel DNS)? Adding NS records for
          <code className={code}>ws.tolive.ai</code> in Vercel broke the 
          <code className={code}>*.tolive.ai wildcard</code>
          resolution. Route53 manages the <code className={code}>ws.</code> subdomain zone in isolation — only
          NS delegation records are needed in Vercel, avoiding the wildcard
          issue. Also, AWS Certificate Manager (ACM) certificate DNS validation
          is simpler when the zone lives in Route53.
        </p>

        <h2>EventBridge for Billing</h2>
        <p className={text}>
          We use EventBridge in place of webhooks to get payment notifications
          on each user. Stripe allows us the means through EventBridge to be
          event driven in our billing service (super important). Our billing service
          gets notified and our records concerning payment get updated.
        </p>

        <p className={text}>
          I did my best to keep the internals of each service as simple and as
          uniform as possible. As I continue to add features, I can see this
          becoming more distributed and event driven. There&apos;s already a lot
          going on. And it runs smoothly, &ldquo;crisp&rdquo; as one early user put it.
        </p>
        <p className={text}>
          This app will become feature rich. And the architecture will
          undoubtedly change. However, there are fundamentals that remain the
          same: separations of concerns, services that do one thing extremely
          well, testable/DRY code.
        </p>

        <h2>Infrastructure</h2>
        <p className={text}>
          The Infrastructure is straight forward. We&apos;re using terraform and
          terraform cloud. We have a staging workspace and a production workspace
          all for the same account. This works as every resource follows the
          same naming conventions. Here&apos;s how we named this v2 Websocket gateway:
        </p>
        <pre className={pre}>
          <code className={code}>{
`\${local.project}-ws\${local.name_suffix}

                      -- or --

\${local.project}-<UNIQUE-RESOURCE-NAME>\${local.name_suffix}
`}</code>
        </pre>
        <p className={text}>
          This keeps things tightly scoped so we can clearly distinguish staging
          resources from production.
        </p>
        <p className={text}>
          We are using roles (OIDC) to run our Terraform cloud. Instead of
          creating key pairs we make roles that can be easily managed and
          assumed by those that need. I have a Run role that allows terraform to
          perform OIDC and assume the actual role that will allow us to deploy
          our resources. This &ldquo;deploy_role&rdquo; has a policy with all the necessary
          statements allowing the creation of all the resources that we need.
          This is how you perform strict access controls and least privilege.
        </p>
        <p className={text}>
          TerraformCloudRole &ndash; has a trust policy for OIDC and its only
          permissions policy is as the following:
        </p>
        <pre className={pre}>
          <code className={code}>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::320887606173:role/TerraformDeploy-*"
    }
  ]
}`}</code>
        </pre>
        <p className={text}>
          <code className={code}>TerraformDeploy-ToLive</code> &ndash; has a trust policy that includes the
          <code className={code}>TerraformCloudRole</code> as a Principal - AWS which allows it to be assumed
          by <code className={code}>TerraformCloudRole</code>. The permissions policy looks like the
          following (truncated for the blog):
        </p>
        <pre className={pre}>
          <code className={code}>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SSM",
      "Effect": "Allow",
      "Action": ["ssm:Get*", "ssm:Describe*", "ssm:List*", "ssm:AddTagsToResource"],
      "Resource": "arn:aws:ssm:*:*:parameter/tolive_ai/*"
    },
    {
      "Sid": "SecretsManager",
      "Effect": "Allow",
      "Action": ["secretsmanager:Get*", "secretsmanager:List*", "secretsmanager:Describe*"],
      "Resource": "arn:aws:secretsmanager:*:320887606173:secret:tolive_ai*"
    },
    {
      "Sid": "S3",
      "Effect": "Allow",
      "Action": ["s3:CreateBucket", "s3:DeleteBucket", "s3:Get*", "s3:ListBucket", "s3:Put*"],
      "Resource": "arn:aws:s3:::tolive-ai-*"
    },
    {
      "Sid": "Lambda",
      "Effect": "Allow",
      "Action": ["lambda:CreateFunction", "lambda:UpdateFunctionCode", "lambda:UpdateFunctionConfiguration"],
      "Resource": "arn:aws:lambda:*:320887606173:function:tolive_ai-*"
    },
    {
      "Sid": "EventBridge",
      "Effect": "Allow",
      "Action": "*",
      "Resource": [
        "arn:aws:events:us-east-1:320887606173:event-bus/aws.partner/stripe*",
        "arn:aws:events:us-east-1:320887606173:rule/aws.partner/stripe.com*"
      ]
    }
  ]
}`}</code>
        </pre>
        <p className={text}>
          It&apos;s pretty long so it has
          been truncated for this example. I hope you get the picture.
        </p>

        <h2>CI/CD</h2>
        <p className={text}>
          We used GitLab for our CI/CD. Each service has its own parent stage
          and child stages. Those stages are scoped to the changes in their
          respective service. That way when we make changes to web we only queue
          up a deployment for web. Take a look at the sample taken from my
          <code className={code}>.gitlab-ci.yml</code> file:
        </p>
        <pre className={pre}>
          <code className={code}>{`stages:
  - services
ingestion:
  stage: services
  trigger:
    include: ingestion/.gitlab-ci.yml
    strategy: depend
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: never
    - changes:
        - ingestion/**/*
        - shared/**/*
      when: manual
    - when: never`}</code>
        </pre>
        <p className={text}>The corresponding child pipelines are as follows:</p>
        <pre className={pre}>
          <code className={code}>{`include:
  - local: .gitlab/ci-helpers.yml
test_ingestion:
  stage: test
  rules:
    - if: '$CI_COMMIT_BRANCH == "staging"'
  before_script:
    - cd shared && npm ci
    - cd ../ingestion && npm ci
  script:
    - npm test -- --runInBand --coverage
build_ingestion:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  rules:
    - if: '$CI_COMMIT_BRANCH == "staging"'
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com
  before_script:
    - !reference [.install_aws, script]
    - !reference [.assume_role, script]
  script:
    - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
    - docker build -t \${ECR_URL}tolive_ai-ingestion:$CI_COMMIT_SHA -t \${ECR_URL}tolive_ai-ingestion:latest -f ingestion/Dockerfile .
    - docker push \${ECR_URL}tolive_ai-ingestion:$CI_COMMIT_SHA
    - docker push \${ECR_URL}tolive_ai-ingestion:latest
  needs:
    - test_ingestion
deploy_ingestion_staging:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/cloud-deploy/aws-base:latest
  rules:
    - if: '$CI_COMMIT_BRANCH == "staging"'
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com
  before_script:
    - !reference [.assume_role, script]
  script:
    - aws lambda update-function-code
        --function-name tolive_ai-ingestion-staging
        --image-uri \${ECR_URL}tolive_ai-ingestion:$CI_COMMIT_SHA
        --region $AWS_REGION
  needs:
    - build_ingestion`}</code>
        </pre>
        <p className={text}>
          I&apos;m sure you notice that we don&apos;t build in production. Nope, we
          promote the one artifact if it is doing what we want to do. This cuts
          down on wasted build minutes and avoids drift or any inconsistencies
          with the build.
        </p>

        <h2>Rollback</h2>
        <p className={text}>
          For when the need to rollback comes about we have the following. It&apos;s
          a stand alone pipeline that can be ran with two inputs to deploy a
          working version of the image to the lambda. And in case you missed it,
          we&apos;re using lambda Docker images.
        </p>
        <pre className={pre}>
          <code className={code}>{
`spec:
  inputs:
    image_uri:
      type: string
      regex: '^.+:.+$'
      description: "Full Lambda container image URI (with tag)"
    function_name:
      type: string
      regex: '^[A-Za-z0-9-_]+$'
      description: "Lambda function name to update"
---
include:
  - local: .gitlab/ci-helpers.yml
stages:
  - deploy
rollback_deployment:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/cloud-deploy/aws-base:latest
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com
  before_script:
    - !reference [.assume_role, script]
  script:
    - echo "Deploying $[[ inputs.image_uri ]] to $[[ inputs.function_name ]]"
    - >
      aws lambda update-function-code
      --function-name "$[[ inputs.function_name ]]"
      --image-uri "$[[ inputs.image_uri ]]"
      --region "$AWS_REGION"`}
          </code>
        </pre>
        <p className={text}>
          A rollback strategy is all too important. That pipeline is service
          agnostic. And should there be a need for an audit trail, we have
          auditable proof that we rolled back.
        </p>

        <p className={text}>
          That&apos;s it for now. We&apos;re going to talk monitoring next. As we get
          traffic we&apos;ll be seeing all the things happening. I&apos;ll also go deeper
          on some of the other security aspects that we&apos;ve taken under
          consideration as we are the custodians of our clients private
          documents. A lot to capture, yet the world wasn&apos;t built in a day.
          Until next time. Thanks for reading and &ldquo;always be building.&rdquo;
        </p>

        <p className={text}>
          <Link
            href="/interstitial?url=https://tolive.ai&where=ToLive AI"
            data-testid="tolive-cta-link"
          >
            Click here
          </Link>{' '}
          to be directed to the live ToLive AI app.
        </p>
        <div className={minus10LeftMargin}>
          <Tags tags={['RAG', 'Embedding', 'AI', 'LLM', 'AWS Bedrock', 'Serverless', 'MLOps']} />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
