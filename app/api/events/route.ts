export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = supabaseServerClient();

  const { searchParams } = new URL(req.url);

  let city_id = searchParams.get("city_id");
  const rawCityName = searchParams.get("city");
  const style_id = searchParams.get("style_id");
  const event_type_id = searchParams.get("event_type_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const cityName = rawCityName?.trim().toLowerCase() || null;

  // Resolve city_id from city name if needed
  if (!city_id && cityName) {
    const { data: cityData } = await supabase
      .from("cities")
      .select("id, formatted_name")
      .ilike("formatted_name", `%${cityName}%`);

    if (!cityData?.length) return NextResponse.json([]);

    city_id = cityData[0].id;
  }

  // Base query
  let query = supabase
    .from("events")
    .select(`
      *,
      cities:city_id(*),
      event_types:event_type_id(*),
      organizers:organizer_id(*),
      venues:venue_id(*),
      event_styles(style_id, styles(*)),
      event_images(*)
    `)
    .order("start_time", { ascending: true });

  // Filters
  if (city_id) query = query.eq("city_id", city_id);
  if (event_type_id) query = query.eq("event_type_id", event_type_id);
  if (from) query = query.gte("start_time", from);
  if (to) query = query.lte("start_time", to);

  // Style filter (requires join table)
  if (style_id) {
    const { data: styleLinks } = await supabase
      .from("event_styles")
      .select("event_id")
      .eq("style_id", style_id);

    if (!styleLinks?.length) return NextResponse.json([]);

    const eventIds = styleLinks.map((row) => row.event_id);
    query = query.in("id", eventIds);
  }

  const { data } = await query;

  // Remove null/invalid rows
  const safe = (data ?? []).filter((e) => e?.id);

  return NextResponse.json(safe);
}
