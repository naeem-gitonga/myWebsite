import { NextRequest, NextResponse } from 'next/server';
import { runAthenaQuery, buildWhereClause, type AnalyticsFilters } from '@/utils/athena';

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

    const whereClause = buildWhereClause(filters);
    const sql = `
      SELECT timestamp, page, fromwebsite, sessionid,
        json_extract_scalar(metadata, '$.userId') as userid, device, eventtype,
        COUNT(*) as views,
        COUNT(DISTINCT sessionid) as unique_visitors,
        COUNT(DISTINCT ip) as unique_ips
      FROM analytics_db.mypersonalwebsite_analytics
      WHERE 1=1 ${whereClause}
      GROUP BY timestamp, page, fromwebsite, sessionid,
        json_extract_scalar(metadata, '$.userId'), device, eventtype
      ORDER BY views DESC
      LIMIT 10000
    `;

    const rows = await runAthenaQuery(sql);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Analytics query error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
