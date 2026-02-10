import Link from "next/link";

export default function EventCard({ event }: { event: any }) {
  // ✅ FIX: Server‑safe date formatting (Intl works on Vercel)
  const start = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(event.start_time));

  return (
    <Link
      href={`/events/${event.id}`}
      className="block border rounded-lg p-4 hover:bg-gray-50 transition"
    >
      <h2 className="text-xl font-semibold">{event.name}</h2>

      <p className="text-gray-600 mt-1">
        {event.cities?.formatted_name ?? "Unknown location"}
      </p>

      <p className="text-gray-600">
        {event.venues?.name ?? "Unknown venue"}
      </p>

      <p className="text-gray-800 font-medium mt-2">{start}</p>

      <p className="text-sm text-gray-500 mt-1">
        {event.event_types?.name ?? "Unknown type"} •{" "}
        {event.organizers?.name ?? "Unknown organizer"}
      </p>
    </Link>
  );
}
