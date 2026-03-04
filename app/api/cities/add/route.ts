export const dynamic = "force-dynamic";

import { createSupabaseClient } from "@/lib/supabaseClient";
import { formatCity } from "@/lib/formatCity";

export async function POST(req: Request) {
  const supabase = createSupabaseClient();

  const body = await req.json();
  const { city, state, country, lat, lng, google_place_id } = body;

  if (!city || !country) {
    return Response.json(
      { error: "City and country are required" },
      { status: 400 }
    );
  }

  const formatted = formatCity(city, state, country);

  const { data, error } = await supabase
    .from("cities")
    .insert({
      city_name: city.toLowerCase(),
      state_code: state || null,
      country_name: country.toLowerCase(),
      formatted_name: formatted,
      google_place_id: google_place_id || null,
      lat: lat || null,
      lng: lng || null,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
