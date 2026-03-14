export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = supabaseServerClient();
  const { id } = await context.params;

  if (!id || id === "undefined" || id === "null") {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: "Malformed event ID" }, { status: 400 });
  }

  const { data, error } = await supabase
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
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Error fetching event" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
