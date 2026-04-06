import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const DEFAULT_BASELINE = 30000;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

type TotalsRow = {
  baseline_page_views: number | null;
  tracked_page_views: number | null;
  tracked_unique_visitors: number | null;
  updated_at: string | null;
};

type DailyRow = {
  stat_date: string;
  page_views: number | null;
  unique_visitors: number | null;
};

function fallbackStats() {
  return {
    totalPageViews: DEFAULT_BASELINE,
    totalUniqueVisitors: 0,
    last7DaysPageViews: 0,
    todayPageViews: 0,
    todayUniqueVisitors: 0,
    baselinePageViews: DEFAULT_BASELINE,
    isApproximate: true,
  };
}

async function readSiteStats() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return fallbackStats();
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  const startDateStr = startDate.toISOString().slice(0, 10);
  const todayKey = new Date().toISOString().slice(0, 10);

  const [{ data: totalsRow, error: totalsError }, { data: dailyRows, error: dailyError }] = await Promise.all([
    supabaseAdmin
      .from('site_totals')
      .select('baseline_page_views, tracked_page_views, tracked_unique_visitors, updated_at')
      .eq('site_key', 'global')
      .maybeSingle<TotalsRow>(),
    supabaseAdmin
      .from('site_daily_stats')
      .select('stat_date, page_views, unique_visitors')
      .gte('stat_date', startDateStr)
      .order('stat_date', { ascending: true })
      .returns<DailyRow[]>(),
  ]);

  const tableMissing = [totalsError, dailyError].some(
    (error) => error?.code === '42P01' || /site_totals|site_daily_stats/i.test(error?.message || '')
  );

  if (tableMissing) {
    return fallbackStats();
  }

  if (totalsError) {
    throw totalsError;
  }

  if (dailyError) {
    throw dailyError;
  }

  const baselinePageViews = totalsRow?.baseline_page_views ?? DEFAULT_BASELINE;
  const trackedPageViews = totalsRow?.tracked_page_views ?? 0;
  const trackedUniqueVisitors = totalsRow?.tracked_unique_visitors ?? 0;
  const rows = dailyRows || [];

  const last7DaysPageViews = rows.reduce((sum, row) => sum + (row.page_views ?? 0), 0);
  const todayRow = rows.find((row) => row.stat_date === todayKey);

  return {
    totalPageViews: baselinePageViews + trackedPageViews,
    totalUniqueVisitors: trackedUniqueVisitors,
    last7DaysPageViews,
    todayPageViews: todayRow?.page_views ?? 0,
    todayUniqueVisitors: todayRow?.unique_visitors ?? 0,
    baselinePageViews,
    isApproximate: !totalsRow,
  };
}

export async function GET() {
  try {
    const stats = await readSiteStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Site stats GET error:', error);
    return NextResponse.json(fallbackStats());
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const isUnique = Boolean(body?.isUnique);

    if (supabaseUrl && supabaseServiceKey) {
      const { error } = await supabaseAdmin.rpc('increment_site_stats', {
        p_is_unique: isUnique,
      });

      if (error && error.code !== '42P01' && error.code !== '42883') {
        console.error('Site stats increment error:', error);
      }
    }

    const stats = await readSiteStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Site stats POST error:', error);
    return NextResponse.json(fallbackStats());
  }
}
