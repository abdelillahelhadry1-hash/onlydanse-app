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
  };
}) {
  // Extract filters from URL
  const { style, type, city, start, end } = searchParams;

  // Build query string dynamically
  const params = new URLSearchParams();

  if (style) params.set("style", style);
  if (type) params.set("type", type);
  if (city) params.set("city", city);
  if (start) params.set("start", start);
  if (end) params.set("end", end);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?${params.toString()}`;

  let events: any[] = [];

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        events = data;
      }
    } else {
      console.error("API returned non-OK status:", res.status);
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  // Dynamic title
  const titleCity = city || "your area";

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">
        Events {city ? `in ${city}` : ""}
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
