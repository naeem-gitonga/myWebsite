import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
} from '@aws-sdk/client-athena';

export type AnalyticsFilters = {
  page?: string[];
  device?: string[];
  eventtype?: string[];
  fromwebsite?: string[];
  userid?: string[];
  year?: number;
  month?: number;
  day?: number;
};

export type AnalyticsRow = {
  timestamp: string;
  page: string;
  fromwebsite: string;
  sessionid: string;
  userid: string;
  device: string;
  eventtype: string;
  views: string;
  unique_visitors: string;
  unique_ips: string;
};

// Sanitize string values for SQL to prevent injection
function sanitizeForSql(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Invalid filter value');
  }
  // Remove or escape dangerous characters
  return value.replace(/'/g, "''").substring(0, 255);
}

export function buildWhereClause(filters: AnalyticsFilters): string {
  const conditions: string[] = [];

  // Date filters
  if (filters.year || filters.month || filters.day) {
    const year = filters.year || new Date().getFullYear();
    const month = filters.month ? String(filters.month).padStart(2, '0') : null;
    const day = filters.day ? String(filters.day).padStart(2, '0') : null;

    if (day && month) {
      const dateStr = `${year}-${month}-${day}`;
      conditions.push(
        `SUBSTR(CAST(timestamp AS VARCHAR), 1, 10) = '${dateStr}'`
      );
    } else if (month) {
      const monthStr = String(month).padStart(2, '0');
      conditions.push(
        `SUBSTR(CAST(timestamp AS VARCHAR), 1, 7) = '${year}-${monthStr}'`
      );
    } else {
      conditions.push(
        `SUBSTR(CAST(timestamp AS VARCHAR), 1, 4) = '${year}'`
      );
    }
  }

  // Multi-value filters
  if (filters.page && filters.page.length > 0) {
    const pages = filters.page
      .map((p) => `'${sanitizeForSql(p)}'`)
      .join(', ');
    conditions.push(`page IN (${pages})`);
  }

  if (filters.device && filters.device.length > 0) {
    // Device is a STRUCT - extract device_type from the serialized format
    // Format: {device_type=mobile, browser=Chrome} -> extract 'mobile'
    const deviceTypes = filters.device.map((d) => {
      const match = d.match(/device_type=(\w+)/);
      return match ? match[1] : d;
    });
    const uniqueTypes = Array.from(new Set(deviceTypes));
    const devices = uniqueTypes
      .map((d) => `'${sanitizeForSql(d)}'`)
      .join(', ');
    conditions.push(`device.device_type IN (${devices})`);
  }

  if (filters.eventtype && filters.eventtype.length > 0) {
    const events = filters.eventtype
      .map((e) => `'${sanitizeForSql(e)}'`)
      .join(', ');
    conditions.push(`eventtype IN (${events})`);
  }

  if (filters.fromwebsite && filters.fromwebsite.length > 0) {
    const websites = filters.fromwebsite
      .map((w) => `'${sanitizeForSql(w)}'`)
      .join(', ');
    conditions.push(`fromwebsite IN (${websites})`);
  }

  if (filters.userid && filters.userid.length > 0) {
    const userids = filters.userid
      .map((u) => `'${sanitizeForSql(u)}'`)
      .join(', ');
    conditions.push(`userid IN (${userids})`);
  }

  if (conditions.length === 0) {
    return '';
  }

  return ' AND ' + conditions.join(' AND ');
}

async function pollQueryStatus(
  client: AthenaClient,
  queryExecutionId: string,
  maxAttempts: number = 30
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await client.send(
      new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId })
    );

    const status = response.QueryExecution?.Status?.State;
    if (status === 'SUCCEEDED') {
      return true;
    }
    if (status === 'FAILED' || status === 'CANCELLED') {
      const reason = response.QueryExecution?.Status?.StateChangeReason;
      throw new Error(`Query failed: ${reason}`);
    }

    // Wait 1 second before retrying
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('Query timeout: exceeded max polling attempts');
}

export async function runAthenaQuery(sql: string): Promise<AnalyticsRow[]> {
  const accessKeyId = process.env.AWS_ATHENA_KEY;
  const secretAccessKey = process.env.AWS_ATHENA_SECRET;
  const region = process.env.AWS_REGION ?? 'us-east-1';
  const outputBucket = process.env.ATHENA_OUTPUT_BUCKET;

  if (!accessKeyId || !secretAccessKey || !region || !outputBucket) {
    throw new Error('Missing required AWS credentials or configuration');
  }

  const client = new AthenaClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    // Start query execution
    const startResponse = await client.send(
      new StartQueryExecutionCommand({
        QueryString: sql,
        QueryExecutionContext: {
          Database: 'analytics_db',
        },
        ResultConfiguration: {
          OutputLocation: outputBucket,
        },
      })
    );

    const queryExecutionId = startResponse.QueryExecutionId;
    if (!queryExecutionId) {
      throw new Error('No query execution ID returned');
    }

    // Poll for completion
    await pollQueryStatus(client, queryExecutionId);

    // Get results
    const resultsResponse = await client.send(
      new GetQueryResultsCommand({
        QueryExecutionId: queryExecutionId,
      })
    );

    // Parse results - skip header row
    const rows: AnalyticsRow[] = [];
    const results = resultsResponse.ResultSet?.Rows || [];

    if (results.length > 1) {
      for (let i = 1; i < results.length; i++) {
        const resultData = results[i].Data;
        if (resultData && resultData.length === 10) {
          rows.push({
            timestamp: resultData[0]?.VarCharValue || '',
            page: resultData[1]?.VarCharValue || '',
            fromwebsite: resultData[2]?.VarCharValue || '',
            sessionid: resultData[3]?.VarCharValue || '',
            userid: resultData[4]?.VarCharValue || '',
            device: resultData[5]?.VarCharValue || '',
            eventtype: resultData[6]?.VarCharValue || '',
            views: resultData[7]?.VarCharValue || '0',
            unique_visitors: resultData[8]?.VarCharValue || '0',
            unique_ips: resultData[9]?.VarCharValue || '0',
          });
        }
      }
    }

    return rows;
  } finally {
    client.destroy();
  }
}
