import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Fetch the event with all relations
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      *,
      cities (*),
      venues (*),
      organizers (*),
      event_types (*),
      event_styles (
        id,
        styles (*)
      ),
      event_images (*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

