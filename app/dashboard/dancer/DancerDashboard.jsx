"use client";

import React from "react";
import { UpcomingEvents } from "./UpcomingEvents";
import { FollowingSection } from "./FollowingSection";
import { RecommendedEvents } from "./RecommendedEvents";
import { DiscoveryFeed } from "./DiscoveryFeed";

export default function DancerDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-[2fr_1.5fr] gap-6">
        <UpcomingEvents />
        <FollowingSection />
      </div>

      <div className="grid grid-cols-[2fr_1.5fr] gap-6">
        <RecommendedEvents />
        <DiscoveryFeed />
      </div>
    </div>
  );
}
