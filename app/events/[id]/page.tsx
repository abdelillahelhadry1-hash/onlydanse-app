// app/events/[id]/page.tsx

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`;

  let event: any = null;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        event = data;
      }
    } else {
      console.error("API returned non-OK status:", res.status);
    }
  } catch (error) {
    console.error("Failed to fetch event:", error);
  }

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <p className="text-gray-500 mt-2">
          The event you’re looking for doesn’t exist or couldn’t be loaded.
        </p>
      </div>
    );
  }

  const start = new Date(event.start_time).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const end = new Date(event.end_time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{event.name}</h1>

      <p className="text-gray-700">{event.description}</p>

      <div className="border rounded-lg p-4 space-y-2">
        <p className="text-gray-800 font-medium">
          {start} → {end}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">City:</span>{" "}
          {event.cities?.formatted_name}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Venue:</span>{" "}
          {event.venues?.name} — {event.venues?.address}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Organizer:</span>{" "}
          {event.organizers?.name}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Event Type:</span>{" "}
          {event.event_types?.name}
        </p>
      </div>

      {event.event_styles?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Styles</h2>
          <div className="flex gap-2 flex-wrap">
            {event.event_styles.map((style: any) => (
              <span
                key={style.id}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {style.styles?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {event.event_images?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {event.event_images.map((img: any) => (
              <img
                key={img.id}
                src={img.url}
                alt={event.name}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
