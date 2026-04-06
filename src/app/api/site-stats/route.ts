import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

function noStoreJson<T>(payload: T) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, s-maxage=0',
    },
  });
}

async function incrementSiteStats(isUnique: boolean) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return;
  }

  const { error: rpcError } = await supabaseAdmin.rpc('increment_site_stats', {
    p_is_unique: isUnique,
  });

  if (!rpcError) {
    return;
  }

  console.warn('Site stats RPC fallback activated:', {
    code: rpcError.code,
    message: rpcError.message,
  });

  const todayKey = new Date().toISOString().slice(0, 10);
  const nowIso = new Date().toISOString();

  const [{ data: totalsRow, error: totalsError }, { data: dailyRow, error: dailyError }] = await Promise.all([
    supabaseAdmin
      .from('site_totals')
      .select('baseline_page_views, tracked_page_views, tracked_unique_visitors')
      .eq('site_key', 'global')
      .maybeSingle<TotalsRow>(),
    supabaseAdmin
      .from('site_daily_stats')
      .select('stat_date, page_views, unique_visitors')
      .eq('stat_date', todayKey)
      .maybeSingle<DailyRow>(),
  ]);

  const tableMissing = [totalsError, dailyError].some(
    (error) => error?.code === '42P01' || /site_totals|site_daily_stats/i.test(error?.message || '')
  );

  if (tableMissing) {
    return;
  }

  if (totalsError) {
    throw totalsError;
  }

  if (dailyError) {
    throw dailyError;
  }

  const { error: totalsUpsertError } = await supabaseAdmin.from('site_totals').upsert(
    {
      site_key: 'global',
      baseline_page_views: totalsRow?.baseline_page_views ?? DEFAULT_BASELINE,
      tracked_page_views: (totalsRow?.tracked_page_views ?? 0) + 1,
      tracked_unique_visitors: (totalsRow?.tracked_unique_visitors ?? 0) + (isUnique ? 1 : 0),
      updated_at: nowIso,
    },
    { onConflict: 'site_key' }
  );

  if (totalsUpsertError) {
    throw totalsUpsertError;
  }

  const { error: dailyUpsertError } = await supabaseAdmin.from('site_daily_stats').upsert(
    {
      stat_date: todayKey,
      page_views: (dailyRow?.page_views ?? 0) + 1,
      unique_visitors: (dailyRow?.unique_visitors ?? 0) + (isUnique ? 1 : 0),
      updated_at: nowIso,
    },
    { onConflict: 'stat_date' }
  );

  if (dailyUpsertError) {
    throw dailyUpsertError;
  }
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
    return noStoreJson(stats);
  } catch (error) {
    console.error('Site stats GET error:', error);
    return noStoreJson(fallbackStats());
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const isUnique = Boolean(body?.isUnique);

    await incrementSiteStats(isUnique);

    const stats = await readSiteStats();
    return noStoreJson(stats);
  } catch (error) {
    console.error('Site stats POST error:', error);
    return noStoreJson(fallbackStats());
  }
}
