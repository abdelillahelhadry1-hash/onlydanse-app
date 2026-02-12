// app/events/page.tsx

import EventCard from "../components/EventCard";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    style?: string;
    type?: string;
    city?: string;
    start?: string;
    end?: string;
    category?: string;
  };
}) {
  const { style, type, city, start, end, category } = searchParams;

  const normalizedCity = city ? city.trim().toLowerCase() : undefined;

  const params = new URLSearchParams();

  if (style) params.set("style", style);
  if (type) params.set("type", type);
  if (category) params.set("category", category);
  if (normalizedCity) params.set("city", normalizedCity);
  if (start) params.set("start", start);
  if (end) params.set("end", end);

  const url = `/api/events?${params.toString()}`;

  let events: any[] = [];

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();

      // ⭐ CRITICAL FIX: filter out events with missing IDs
      if (Array.isArray(data)) {
        events = data.filter((e) => e?.id);
      }
    } else {
      console.error("API returned non-OK status:", res.status);
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">
        Events {normalizedCity ? `in ${normalizedCity}` : ""}
      </h1>

      {events.length === 0 && (
        <p className="text-gray-500">No events found. Try adjusting your filters.</p>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
