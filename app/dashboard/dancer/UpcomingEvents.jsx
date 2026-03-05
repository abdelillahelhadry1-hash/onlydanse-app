"use client";

import React from "react";

export function UpcomingEvents() {
  const events = [
    { id: 1, title: "Salsa Night", date: "Mar 12", location: "Porto Downtown", type: "Social" },
    { id: 2, title: "Kizomba Workshop", date: "Mar 15", location: "Bonfim Studio", type: "Workshop" },
  ];

  return (
    <section className="bg-[#020617] rounded-2xl p-4 border border-gray-800">
      <h2 className="text-base font-semibold mb-3">Upcoming events</h2>

      <div className="flex flex-col gap-2.5">
        {events.map((e) => (
          <div
            key={e.id}
            className="p-3 rounded-xl bg-[#020617] border border-gray-800 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-xs text-gray-400">
                {e.date} • {e.location} • {e.type}
              </div>
            </div>

            <button className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 cursor-pointer">
              Attending
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
