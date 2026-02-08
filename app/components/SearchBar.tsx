"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ compact = false }) {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [style_id, setStyleId] = useState("");
  const [event_type_id, setEventTypeId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<false | "menu" | "custom">(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const danceStyles = [
    { name: "Bachata", id: "bachata" },
    { name: "Salsa", id: "salsa" },
    { name: "Kizomba", id: "kizomba" },
    { name: "Zouk", id: "zouk" },
    { name: "Tango", id: "tango" },
    { name: "Ballroom", id: "ballroom" },
    { name: "Hip-Hop", id: "hiphop" },
    { name: "K-Pop", id: "kpop" },
    { name: "Afro", id: "afro" },
    { name: "Other", id: "other" }
  ];

  const eventTypes = [
    { name: "Event", id: "event" },
    { name: "Workshop", id: "workshop" },
    { name: "Class", id: "class" },
    { name: "Festival", id: "festival" }
  ];

  // Auto-detect city
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setCity(data.city || ""))
      .catch(() => {});
  }, []);

  // Default date range
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setFrom(today.toISOString().split("T")[0]);
    setTo(nextWeek.toISOString().split("T")[0]);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSuggestions([]);
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Google Places Autocomplete
  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    async function fetchCities() {
      try {
        const res = await fetch(`/api/places?input=${city}`, { signal: controller.signal });
        if (!res.ok) return setSuggestions([]);
        const data = await res.json();
        setSuggestions(data.predictions || []);
      } catch (err: any) {
        if (err.name !== "AbortError") setSuggestions([]);
      }
    }

    fetchCities();
    return () => controller.abort();
  }, [city]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (style_id) params.set("style_id", style_id);
    if (event_type_id) params.set("event_type_id", event_type_id);

    if (city) {
      const normalizedCity = city.trim().toLowerCase();
      params.set("city", normalizedCity);
    }

    if (from) params.set("from", from);
    if (to) params.set("to", to);

    router.push(`/events?${params.toString()}`);
  };

  return (
    <div
      className="w-full border-b bg-white relative z-40 transition-all duration-300"
      ref={dropdownRef}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row gap-3 items-center justify-center">

        {/* Dance Style */}
        <select
          value={style_id}
          onChange={(e) => setStyleId(e.target.value)}
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
        >
          <option value="">Dance style</option>
          {danceStyles.map((style) => (
            <option key={style.id} value={style.id}>{style.name}</option>
          ))}
        </select>

        {/* Event Type */}
        <select
          value={event_type_id}
          onChange={(e) => setEventTypeId(e.target.value)}
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
        >
          <option value="">Event type</option>
          {eventTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>

        {/* Date Picker */}
        <div className="relative w-full md:w-40 z-50">
          <button
            onClick={() => setShowDatePicker(showDatePicker === "menu" ? false : "menu")}
            className="border rounded-lg p-3 text-gray-700 w-full text-left bg-gray-50"
          >
            Dates
          </button>

          {showDatePicker === "menu" && (
            <div className="absolute top-full translate-y-2 z-50 bg-white shadow-lg rounded-lg p-2 w-48">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  setFrom(today);
                  setTo(today);
                  setShowDatePicker(false);
                }}
              >
                Today
              </div>

              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  const iso = tomorrow.toISOString().split("T")[0];
                  setFrom(iso);
                  setTo(iso);
                  setShowDatePicker(false);
                }}
              >
                Tomorrow
              </div>

              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  const today = new Date();
                  const nextWeek = new Date();
                  nextWeek.setDate(today.getDate() + 7);
                  setFrom(today.toISOString().split("T")[0]);
                  setTo(nextWeek.toISOString().split("T")[0]);
                  setShowDatePicker(false);
                }}
              >
                This week
              </div>

              <div className="border-t my-2"></div>

              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => setShowDatePicker("custom")}
              >
                Choose dates…
              </div>
            </div>
          )}

          {showDatePicker === "custom" && (
            <div className="absolute top-full translate-y-2 z-50 bg-white shadow-lg rounded-lg p-4 w-64">
              <label className="text-sm text-gray-600">From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded-lg p-2 w-full mb-3"
              />

              <label className="text-sm text-gray-600">To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
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
        <div className="relative w-full md:w-40 z-50">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border rounded-lg p-3 text-gray-700 w-full bg-gray-50"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full translate-y-2 left-0 w-full bg-white shadow-lg rounded-lg z-50">
              {suggestions.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setCity(item.description);
                    setSuggestions([]);
                  }}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {item.description}
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
