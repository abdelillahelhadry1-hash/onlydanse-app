"use client";

import React from "react";
import { UpcomingEvents } from "./UpcomingEvents";
import { FollowingSection } from "./FollowingSection";
import { RecommendedEvents } from "./RecommendedEvents";
import { DiscoveryFeed } from "./DiscoveryFeed";

export function DancerDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr", gap: "24px" }}>
        <UpcomingEvents />
        <FollowingSection />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr", gap: "24px" }}>
        <RecommendedEvents />
        <DiscoveryFeed />
      </div>
    </div>
  );
}
