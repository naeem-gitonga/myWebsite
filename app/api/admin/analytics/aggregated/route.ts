import { NextRequest, NextResponse } from 'next/server';
import { runAthenaRawQuery, buildWhereClause, type AnalyticsFilters } from '@/utils/athena';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: AnalyticsFilters = {
      page: searchParams.getAll('page'),
      device: searchParams.getAll('device'),
      eventtype: searchParams.getAll('eventtype'),
      fromwebsite: searchParams.getAll('fromwebsite'),
      userid: searchParams.getAll('userid'),
      year: searchParams.get('year') ? parseInt(searchParams.get('year') || '0') : undefined,
      month: searchParams.get('month') ? parseInt(searchParams.get('month') || '0') : undefined,
      day: searchParams.get('day') ? parseInt(searchParams.get('day') || '0') : undefined,
    };

    const isStaging = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_STAGE === 'staging';
    const devFilter = isStaging
      ? "AND fromwebsite LIKE '%analytics-staging%'"
      : "AND fromwebsite NOT LIKE '%analytics-staging%'";

    const whereClause = buildWhereClause(filters);

    const sql = `
      SELECT
        date_format(from_iso8601_timestamp(timestamp), '%Y-%m-%d') AS timestamp,
        page,
        COUNT(*) AS views
      FROM analytics_db.mypersonalwebsite_analytics
      WHERE 1=1
        ${whereClause}
        ${devFilter}
      GROUP BY date_format(from_iso8601_timestamp(timestamp), '%Y-%m-%d'), page
      ORDER BY timestamp ASC
    `;

    const rows = await runAthenaRawQuery(sql);
    return NextResponse.json({ timeline: rows });
  } catch (error) {
    console.error('Analytics aggregated query error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
