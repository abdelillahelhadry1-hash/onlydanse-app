"use client";

import React from "react";
import { ROLES } from "../dashboard/roles";

function SidebarSection({ title, items }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#6b7280",
          marginBottom: "8px",
          letterSpacing: "0.06em",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map((item) => (
          <button
            key={item}
            style={{
              textAlign: "left",
              background: "transparent",
              border: "none",
              color: "#e5e7eb",
              fontSize: "14px",
              padding: "6px 8px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Sidebar({ role }) {
  if (role === ROLES.DANCER) {
    return (
      <div>
        <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "24px" }}>Dancer</div>
        <SidebarSection title="Overview" items={["Home", "Upcoming", "Calendar"]} />
        <SidebarSection title="Following" items={["Events", "Instructors", "Studios"]} />
        <SidebarSection title="Account" items={["Settings"]} />
      </div>
    );
  }

  if (role === ROLES.INSTRUCTOR) {
    return (
      <div>
        <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "24px" }}>Instructor</div>
        <SidebarSection title="Teaching" items={["Dashboard", "My Classes", "Workshops", "Calendar"]} />
        <SidebarSection title="Create" items={["New Class", "New Workshop"]} />
      </div>
    );
  }

  if (role === ROLES.ORGANIZER) {
    return (
      <div>
        <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "24px" }}>Organizer</div>
        <SidebarSection title="Events" items={["Dashboard", "My Events", "Festivals"]} />
        <SidebarSection title="Create" items={["New Event", "New Festival"]} />
      </div>
    );
  }

  if (role === ROLES.STUDIO) {
    return (
      <div>
        <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "24px" }}>Studio</div>
        <SidebarSection title="Studio" items={["Dashboard", "Classes", "Instructors", "Rooms"]} />
        <SidebarSection title="Create" items={["New Class"]} />
      </div>
    );
  }

  return null;
}
