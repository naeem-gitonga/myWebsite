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

## Analytics Dashboard — ViewsTimelineChart

- Chart was showing a straight line — default was scoped to today only with hourly buckets, so most hours had zero data
- Changed default grouping to monthly/daily and removed the day-only filter default
- Added date range selector with pill buttons: This Week / This Month / Last Month / This Year
- Y-axis labeled "Views"
- Chart manages its own fetch and state — decoupled from `useAnalyticsDashboard`
- "This Week" broke all periods due to a race condition where slow Athena queries overwrote newer results — fixed with a `cancelled` flag in `useEffect`
- Added `fromDate`/`toDate` params to `AnalyticsFilters` and `buildQueryParams` in `analyticsApi.ts`
- Created `app/api/admin/analytics/aggregated/route.ts` using `substr(timestamp, 1, 10)` for date grouping and range filtering
- Reverted a client-side filtering approach after pushback — all data handling stays server-side in SQL
- Regression introduced: `day` default changed to `0` broke the day filter on the main dashboard — restored to `new Date().getDate()`

## Article — Claude Died, RIP

- New article at `app/articles/claude-died-rip/` based on `doc.txt`
- Component at `components/Articles/ClaudeDiedRip/ClaudeDiedRip.tsx`
- Tags: AI, AI ownership, quantization, local model hosting, local inference, llama.cpp, MoE, DGX Spark, CLI tools
- Blockquote style added to `Articles.module.scss` — grey background, left border, wrapping text with `white-space: pre-wrap`
- Images: `undertaker-chokeslam.avif` → `undertaker-chokeslam.webp` (tile), `claude-died-rip-og.webp` (1200×626 OG), `undertaker.png` → `undertaker.webp`, `undertaker-legdrop.avif` → `undertaker-legdrop.webp` (converted via Pillow to preserve 1056×594 tile grid — ffmpeg decoded individual tiles instead of the composed image)
- All `"`, `'`, `—` replaced with HTML entities throughout the component
- Unit tests written for component and page
- Article tile wired up via `articleImages.ts`

## Subscriber System — Production Fixes

**CORS / proxy**
- Production was calling the Lambda directly from the browser — CORS errors on `/join` and `/status`
- Fixed by proxying through Next.js API routes: `app/api/subscriber/join/route.ts` and `app/api/subscriber/status/route.ts`
- Frontend now hardcodes `/api/subscriber` as the base URL instead of the Lambda URL
- `NEXT_PUBLIC_SUBSCRIBER_API_URL` is only used server-side in the proxy routes

**`/undefined/join` in production**
- `NEXT_PUBLIC_SUBSCRIBER_API_URL` was not set in the Vercel production environment
- Root cause no longer matters after the proxy fix — Lambda URL never exposed to the browser

**Turnstile widget disappearing after verification**
- Changed to `{!verified && <div ref={turnstileRef} />}` to remove the widget from the DOM after verification
- Side effect: Turnstile's hidden `cf-turnstile-response` input is also removed, so `formData.get('cf-turnstile-response')` returned `null` on submit
- Fixed by capturing the token in the Turnstile `callback: (token) => { tokenRef.current = token; setVerified(true); }` and reading from `tokenRef.current` in `createHandleSubmit`

**API Gateway resource policy — Referer**
- After moving to server-side proxy, the Lambda call no longer carried the browser's `Referer` header
- API Gateway `/join` policy uses `StringEquals` on `aws:Referer` — no Referer = 403
- Fixed by forwarding `origin + '/'` from the incoming request as the `Referer` header in the proxy

**`WHICH_ROUTE` missing from subscriber Lambda**
- Staging Lambda was missing `WHICH_ROUTE=staging` in its environment
- Without it, the route map used `/api/ngsubscriber/status` but the incoming path was `/api/ngsubscriber-staging/status` — route not found → 500
- Fixed by adding `WHICH_ROUTE: process.env.WHICH_ROUTE` to `environment.ngsubscriber` in CDK

**`ORIGIN=*` in confirmation email URL**
- Lambda was building `http://*/api/subscriber/confirm?...` in the confirmation email
- `ORIGIN` env var was set to `*` (CORS wildcard) in the deployed staging Lambda
- Fix: redeploy with correct `ORIGIN=https://staging.naeemgitonga.com` from GitLab CI variable

**MongoDB TLS error in production Lambda**
- `MongoServerSelectionError: tlsv1 alert internal error` — Atlas rejecting connection from Lambda
- Lambda was not in a VPC; production Atlas cluster has IP restrictions
- Fixed by placing `ngsubscriber` Lambda in a VPC with a shared NAT gateway (`nat-0ddfb55dc227725aa`) from the tolive.ai infrastructure
- Used private subnets `subnet-0660209b3be9931ca` and `subnet-00683a3e9a358dd44` in VPC `vpc-06275c8a87d455e5a`
- NAT gateway's Elastic IP needs to be added to MongoDB Atlas Network Access allowlist
- CDK stack `env` uncommented to enable `Vpc.fromLookup` context resolution

### Debugging done today
- `handler.subscriber` not found — missing export in top-level `backend/apis/handler.ts`
- Environment variables not reaching the Lambda locally — added explicit `environment` block to `subscriber/serverless.yml` with defaults for local dev
- MongoDB DNS errors — wrong connection string format (placeholder not replaced, wrong hostname)
- CORS errors in serverless-offline — added `cors: true` to the serverless.yml http events
- SendGrid not sending — `SEND_GRID_API_KEY` missing from `backend/apis/.env` and sender domain needs verification in SendGrid
- `turnstile.reset()` throwing "Nothing to reset" — fixed by storing the widget ID returned by `render()` and passing it to `reset(widgetId)`
- Turnstile token arriving as `null` on submit — removing the Turnstile div from the DOM on verification also removed the hidden `cf-turnstile-response` input Turnstile injects; fixed by capturing the token in the `callback: (token) => { tokenRef.current = token; }` and reading from `tokenRef.current` in `createHandleSubmit`
- Production confirmation email deferred by Gmail — SendGrid throttled by Gmail due to new sending IP reputation; email retried automatically and delivered successfully
- `WHICH_ROUTE` missing from staging subscriber Lambda — route map fell back to production paths, incoming `/api/ngsubscriber-staging/...` paths didn't match; fixed by adding `WHICH_ROUTE` to `environment.ngsubscriber` in CDK
- API Gateway 403 on `/join` after proxy move — server-side proxy doesn't forward the browser's `Referer`; fixed by reading `origin` from the incoming request and appending `/` to match the `StringEquals` condition in the resource policy
