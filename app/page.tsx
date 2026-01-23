"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [danceStyle, setDanceStyle] = useState("");
  const [eventType, setEventType] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
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

  // Auto-detect city
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city || "");
      })
      .catch(() => {});
  }, []);

  // Default date range: today → +7 days
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
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-900">
        Find dance classes & events near you
      </h1>

      {/* SEARCH BAR */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-5 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">

          {/* Dance Style */}
          <select
            value={danceStyle}
            onChange={(e) => setDanceStyle(e.target.value)}
            className="border rounded-lg p-3 text-gray-700 w-full md:w-40"
          >
            <option value="">Dance style</option>
            {danceStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          {/* Event Type */}
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border rounded-lg p-3 text-gray-700 w-full md:w-40"
          >
            <option value="">Event type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="relative w-full md:w-48">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="border rounded-lg p-3 text-gray-700 w-full text-left"
            >
              {startDate && endDate
                ? `${startDate} → ${endDate}`
                : "Select dates"}
            </button>

            {showDatePicker && (
              <div className="absolute z-20 bg-white shadow-lg rounded-lg p-4 mt-2 w-64">
                <label className="text-sm text-gray-600">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg p-2 w-full mb-3"
                />

                <label className="text-sm text-gray-600">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />

                <button
                  onClick={() => setShowDatePicker(false)}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* City */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border rounded-lg p-3 text-gray-700 w-full md:w-40"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
          >
            🔍 Search
          </button>
        </div>
      </div>
    </div>
  );
}
