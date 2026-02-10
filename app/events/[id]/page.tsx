// app/events/[id]/page.tsx

export async function generateMetadata(
  props: { params: { id: string } }
) {
  const { id } = props.params;

  const url = `/api/events/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  const event = res.ok ? await res.json() : null;

  if (!event) {
    return {
      title: "Event not found | OnlyDanse",
      description: "The event you're looking for doesn't exist.",
    };
  }

  return {
    title: `${event.name} | OnlyDanse`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const url = `/api/events/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  const event = res.ok ? await res.json() : null;

  // 🔥 Add this log to inspect the event object in Vercel logs
  console.log("EVENT DATA:", event);

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

  const heroImage =
    event.event_images?.length > 0 ? event.event_images[0].url : null;

  return (
    <div className="pb-20">
      <div className="max-w-3xl mx-auto py-6">
        <a href="/events" className="text-blue-600 hover:underline">
          ← Back to events
        </a>
      </div>

      <div
        className="w-full h-64 bg-cover bg-center flex items-end"
        style={{
          backgroundImage: heroImage
            ? `url(${heroImage})`
            : "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
        }}
      >
        <div className="bg-black/50 w-full py-6 px-4 text-white">
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <p className="text-gray-200">
            {event.cities?.formatted_name} • {start}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 space-y-6">
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

        {event.event_images?.length > 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {event.event_images.slice(1).map((img: any) => (
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

        {event.venues?.lat && event.venues?.lng && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <iframe
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${event.venues.lat},${event.venues.lng}&z=15&output=embed`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
