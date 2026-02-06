import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Accept both city_id and city name
  let city_id = searchParams.get("city_id");
  const rawCityName = searchParams.get("city");

  const style_id = searchParams.get("style_id");
  const event_type_id = searchParams.get("event_type_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // Normalize city name (matches frontend)
  const cityName = rawCityName
    ? rawCityName.trim().toLowerCase()
    : null;

  // If city_id is missing but city name is provided → convert it
  if (!city_id && cityName) {
    const { data: cityData, error: cityError } = await supabase
      .from("cities")
      .select("id, formatted_name")
      .ilike("formatted_name", `%${cityName}%`);

    if (cityError || !cityData || cityData.length === 0) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    // If multiple matches, pick the closest one
    city_id = cityData[0].id;
  }

  // Still no city_id? Then we cannot continue
  if (!city_id) {
    return NextResponse.json(
      { error: "city_id or city is required" },
      { status: 400 }
    );
  }

  // Build the query
  let query = supabase
    .from("events")
    .select(
      `
      *,
      cities:city_id(*),
      event_types:event_type_id(*),
      organizers:organizer_id(*),
      venues:venue_id(*),
      event_styles(
        styles(*)
      ),
      event_images(*)
    `
    )
    .eq("city_id", city_id)
    .order("start_time", { ascending: true });

  if (style_id) {
    query = query.contains("event_styles", [{ style_id }]);
  }

  if (event_type_id) {
    query = query.eq("event_type_id", event_type_id);
  }

  if (from) {
    query = query.gte("start_time", from);
  }

  if (to) {
    query = query.lte("start_time", to);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

