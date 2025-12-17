import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as crypto from 'crypto';

const s3Client = new S3Client({});

/**
 * Get allowed buckets from environment variable
 * Parses on each request to support testing
 */
function getAllowedBuckets(): string[] {
  return (process.env.ALLOWED_BUCKETS || '')
    .split(',')
    .map((b) => b.trim())
    .filter((b) => b.length > 0);
}

/**
 * Get CORS origin from environment variable
 */
function getCorsOrigin(): string {
  return process.env.CORS_ORIGIN || '*';
}

interface AnalyticsEvent {
  bucket: string; // S3 bucket to write to (required in request)
  eventType: 'page_view' | 'scroll_complete' | string;
  timestamp: string;
  page: string;
  userAgent: string;
  viewport: { width: number; height: number };
  sessionId: string;
  referrer?: string;
  metadata?: Record<string, any>;
  fromWebsite?: string
}

interface DeviceInfo {
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
}

interface Location {
  country: string;
  city: string;
  region: string;
}

interface AnalyticsRecord {
  eventId: string;
  eventType: string;
  timestamp: string;
  serverTimestamp: string;
  page: string;
  sessionId: string;
  ip: string;
  location: Location;
  device: DeviceInfo;
  viewport: { width: number; height: number };
  referrer: string;
  userAgent: string;
  [key: string]: any;
}

/**
 * Parse user agent to extract device and browser information
 */
function parseUserAgent(ua: string): DeviceInfo {
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browser = 'Chrome';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
  } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
    browser = 'Internet Explorer';
  }

  return {
    device_type: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
    browser: browser,
  };
}

/**
 * Hash IP address for privacy compliance
 */
function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

/**
 * Get location from CloudFront headers (if available)
 */
function getLocationFromHeaders(headers: Record<string, string | undefined>): Location {
  return {
    country: headers['cloudfront-viewer-country'] || 'Unknown',
    city: headers['cloudfront-viewer-city'] || 'Unknown',
    region: headers['cloudfront-viewer-country-region'] || 'Unknown',
  };
}

/**
 * Validate bucket is in allowed list
 */
function isAllowedBucket(bucket: string): boolean {
  const allowedBuckets = getAllowedBuckets();

  // If ALLOWED_BUCKETS is empty, allow all buckets (permissive mode)
  if (allowedBuckets.length === 0) {
    console.warn('ALLOWED_BUCKETS not configured - allowing all buckets (not recommended for production)');
    return true;
  }

  // Check if bucket matches any allowed pattern (supports wildcards)
  return allowedBuckets.some((allowed: string) => {
    if (allowed.includes('*')) {
      const regex = new RegExp('^' + allowed.replace(/\*/g, '.*') + '$');
      return regex.test(bucket);
    }
    return bucket === allowed;
  });
}

/**
 * Main Lambda handler
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (process.env.NODE_ENV !== 'cicd') {
    console.log('Analytics event received:', JSON.stringify(event, null, 2));
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': getCorsOrigin(),
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Parse request body
    const body: AnalyticsEvent = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!body.bucket) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Missing required field: bucket',
          message: 'You must specify the S3 bucket name in the request body',
        }),
      };
    }

    if (!body.eventType || !body.timestamp) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Missing required fields: eventType and timestamp',
        }),
      };
    }

    // Validate bucket is allowed
    if (!isAllowedBucket(body.bucket)) {
      if (process.env.NODE_ENV !== 'cicd') {
        console.error(`Bucket not allowed: ${body.bucket}. Allowed buckets: ${getAllowedBuckets().join(', ')}`);
      }
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Forbidden',
          message: 'The specified bucket is not authorized for this analytics service',
        }),
      };
    }

    // Get IP address
    const ip =
      event.requestContext?.identity?.sourceIp ||
      event.headers?.['x-forwarded-for']?.split(',')[0] ||
      'unknown';

    // Extract user agent
    const userAgent =
      body.userAgent || event.headers?.['user-agent'] || 'Unknown';

    // Parse device and browser info
    const deviceInfo = parseUserAgent(userAgent);

    // Get location from CloudFront headers
    const location = getLocationFromHeaders(event.headers || {});

    // Create server timestamp
    const serverTimestamp = new Date().toISOString();
    const clientTimestamp = body.timestamp;

    // Generate unique event ID
    const eventId = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;

    // Build analytics record
    const record: AnalyticsRecord = {
      eventId,
      eventType: body.eventType,
      timestamp: clientTimestamp,
      serverTimestamp,
      page: body.page || 'unknown',
      sessionId: body.sessionId || 'unknown',
      ip: hashIp(ip), // Hash for privacy
      location,
      device: deviceInfo,
      viewport: body.viewport || { width: 0, height: 0 },
      referrer: body.referrer || event.headers?.referer || 'direct',
      userAgent,
      fromWebsite: body.metadata?.fromWebsite,
      // Include any additional metadata
      ...(body.metadata || {}),
    };

    // Parse timestamp for S3 partitioning
    const dt = new Date(clientTimestamp);
    const year = dt.getUTCFullYear();
    const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dt.getUTCDate()).padStart(2, '0');

    // Create S3 key with date partitioning
    const key = `analytics/year=${year}/month=${month}/day=${day}/${eventId}.json`;

    // Write to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: body.bucket,
        Key: key,
        Body: JSON.stringify(record),
        ContentType: 'application/json',
      })
    );

    console.log(`Analytics event written to S3: s3://${body.bucket}/${key}`);

    // Return success response
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'ok',
        eventId,
        bucket: body.bucket,
        key,
      }),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'cicd') {
      console.error('Error processing analytics event:', error);
    }

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
