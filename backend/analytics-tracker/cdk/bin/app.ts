#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AnalyticsTrackerStack } from '../lib/analytics-stack';

/**
 * Example CDK app for deploying the Analytics Tracker
 *
 * Customize the configuration below for your use case
 */

const app = new cdk.App();

// Example 1: Simple configuration for a single app
new AnalyticsTrackerStack(
  app,
  'MyAppAnalyticsTracker',
  {
    allowedBuckets: [
      'my-app-analytics-prod',
      'my-app-analytics-staging',
    ],
    corsOrigin: '*', // Allow all origins (or specify: 'https://myapp.com')
    functionPrefix: 'myapp',
    apiName: 'myapp-analytics-api',
  },
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  }
);

// Example 2: Multi-tenant configuration with wildcard bucket patterns
/*
new AnalyticsTrackerStack(
  app,
  'MultiTenantAnalyticsTracker',
  {
    allowedBuckets: [
      '*-analytics-prod',     // All buckets ending with -analytics-prod
      '*-analytics-staging',  // All buckets ending with -analytics-staging
      'analytics-*',          // All buckets starting with analytics-
    ],
    corsOrigin: '*',
    functionPrefix: 'multitenant',
    apiName: 'multitenant-analytics-api',
    enableMetrics: true,
    lambdaTimeout: 15,
  },
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  }
);
*/

// Example 3: Production configuration with specific buckets and additional policies
/*
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

new AnalyticsTrackerStack(
  app,
  'ProdAnalyticsTracker',
  {
    allowedBuckets: [
      'app1-analytics',
      'app2-analytics',
      'app3-analytics',
    ],
    corsOrigin: 'https://api.mycompany.com',
    functionPrefix: 'prod',
    apiName: 'prod-analytics-api',
    enableMetrics: true,
    enableAccessLogs: true,
    lambdaTimeout: 10,
    additionalPolicies: [
      // Example: Grant access to KMS key for encrypted buckets
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
        resources: ['arn:aws:kms:us-east-1:123456789012:key/your-key-id'],
      }),
    ],
  },
  {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  }
);
*/
