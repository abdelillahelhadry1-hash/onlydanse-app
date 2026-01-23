"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [danceStyle, setDanceStyle] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const danceStyles = [
    "Bachata",
    "Salsa",
    "Kizomba",
    "Zouk",
    "Tango",
    "Ballroom",
    "Hip-Hop",
    "K-Pop",
    "Afro",
    "Other",
  ];

  const eventTypes = ["Event", "Workshop", "Class", "Festival"];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city || "");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setStartDate(today.toISOString().split("T")[0]);
    setEndDate(nextWeek.toISOString().split("T")[0]);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (danceStyle) params.set("style", danceStyle);
    if (eventType) params.set("type", eventType);
    if (city) params.set("city", city);
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);

    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mt-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Find dance classes & events near you
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={danceStyle}
            onChange={(e) => setDanceStyle(e.target.value)}
            className="border rounded-lg p-3 w-full text-gray-700"
          >
            <option value="">Choose dance style</option>
            {danceStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border rounded-lg p-3 w-full text-gray-700"
          >
            <option value="">Choose event type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-3 w-full text-gray-700"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-3 w-full text-gray-700"
          />
        </div>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border rounded-lg p-3 w-full text-gray-700"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
}
