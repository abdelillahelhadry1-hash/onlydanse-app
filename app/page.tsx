"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [danceStyle, setDanceStyle] = useState("");
  const [eventType, setEventType] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TEMPORARY: Clear suggestions until we add hybrid autocomplete
  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    // For now, no external API → no suggestions
    setSuggestions([]);
  }, [city]);

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
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-5 w-full max-w-4xl mx-auto">

      <div className="flex flex-col md:flex-row gap-3 items-center justify-center">

        {/* Dance Style */}
        <select
          value={danceStyle}
          onChange={(e) => setDanceStyle(e.target.value)}
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
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
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
        >
          <option value="">Event type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <div className="relative w-full md:w-40">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="border rounded-lg p-3 text-gray-700 w-full text-left bg-gray-50"
          >
            {startDate && endDate
              ? `${new Date(startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })} → ${new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`
              : "Date"}
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

        {/* City Autocomplete */}
        <div className="relative w-full md:w-40" ref={dropdownRef}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border rounded-lg p-3 text-gray-700 w-full bg-gray-50"
          />

          {/* Suggestions will appear here once we add hybrid autocomplete */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-30">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCity(`${item.city}, ${item.country}`);
                    setSuggestions([]);
                  }}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {item.city}, {item.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
        >
          🔍 Search
        </button>

      </div>
    </div>
  );
}
