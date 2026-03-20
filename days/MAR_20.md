# March 20, 2026

## Subscriber System

Built a full end-to-end subscriber system for the articles page from scratch.

### What was built

**Backend Lambda — `ngsubscriber`**
- New Lambda service at `backend/apis/apis/subscriber/` following the existing paypal/contact service pattern
- `POST /api/ngsubscriber/join` — validates Cloudflare Turnstile CAPTCHA, saves unconfirmed subscriber to MongoDB, sends a confirmation email via SendGrid
- `GET /api/ngsubscriber/confirm` — verifies the confirmation token, marks the subscriber as confirmed in MongoDB
- Direct Lambda invocation for article notifications — CI pipeline calls `aws lambda invoke` with `{ action: 'notify', title, url, description }` to send a mass email to all confirmed subscribers via SendGrid
- Exported from the top-level `backend/apis/handler.ts` alongside paypal and contact

**Security**
- Cloudflare Turnstile CAPTCHA on the join endpoint — verified server-side against `TURNSTILE_SECRET_KEY` pulled from AWS Secrets Manager (`NG_TURNSTILE_SECRET_KEY`) in staging/production, `.env` locally
- `/join` locked to site Referer/Origin via API Gateway resource policy (same as PayPal route)
- `/confirm` left open — called server-side by the Next.js confirm route
- Article notification endpoint never exposed via HTTP — only reachable via direct Lambda invocation using the CI pipeline's OIDC-assumed IAM role
- Unique MongoDB index on `email` to prevent duplicate subscribers
- Double opt-in — subscribers must confirm their email before receiving article notifications

**Email templates**
- `confirmation.ts` — HTML email sent on join with a confirm link pointing back to the website
- `new-article.ts` — HTML mass email sent to all confirmed subscribers when a new article is published
- Both use SendGrid (`@sendgrid/mail`) following the pattern established in `~/projects/to-live/communications`

**CDK**
- Added `NgSubscriber` Lambda to `backend/cdk/lib/backend-service.ts` with its own environment block
- `TURNSTILE_SECRET_KEY` resolved from AWS Secrets Manager via CloudFormation dynamic reference (`SecretValue.secretsManager`)
- `/join` and `/confirm` routes added to the existing API Gateway

**CI/CD — GitLab**
- Added a `notify` stage after `deploy` in `.gitlab-ci.yml`
- `notify_subscribers` job runs on `master` when the commit message matches `feat: new article 'TITLE'`
- Assumes the existing OIDC role, extracts the article title from the commit message, derives the slug/URL, and invokes the Lambda directly via `aws lambda invoke`
- Added `DB_CONNECTION`, `DB_NAME` to the staging and production CDK deploy env var blocks

**Frontend**
- `SubscriberBanner` component at `components/SubscriberBanner/`
- Cloudflare Turnstile loaded via `next/script` CDN — no npm package, matching the to-live pattern
- Widget ID stored in a ref so `turnstile.reset(widgetId)` works correctly on error
- `localStorage` tracks state across page visits: `pending` after form submit, `confirmed` after email confirmation click
- Shows the subscribe form by default, a pending message after submit, and a confirmed message after the email link is clicked
- Positioned below the page header in `ArticleTileView`
- New Next.js API route at `app/api/subscriber/confirm/route.ts` handles the confirmation link click, calls the Lambda confirm endpoint, and redirects to `/articles?subscribed=true`

### Debugging done today
- `handler.subscriber` not found — missing export in top-level `backend/apis/handler.ts`
- Environment variables not reaching the Lambda locally — added explicit `environment` block to `subscriber/serverless.yml` with defaults for local dev
- MongoDB DNS errors — wrong connection string format (placeholder not replaced, wrong hostname)
- CORS errors in serverless-offline — added `cors: true` to the serverless.yml http events
- SendGrid not sending — `SEND_GRID_API_KEY` missing from `backend/apis/.env` and sender domain needs verification in SendGrid
- `turnstile.reset()` throwing "Nothing to reset" — fixed by storing the widget ID returned by `render()` and passing it to `reset(widgetId)`
