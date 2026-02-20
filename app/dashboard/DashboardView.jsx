"use client";

import React from "react";
import { ROLES } from "./roles";
import { DancerDashboard } from "./dancer/DancerDashboard";

export function DashboardView({ role }) {
  switch (role) {
    case ROLES.DANCER:
      return <DancerDashboard />;
    case ROLES.INSTRUCTOR:
      return <div>Instructor dashboard coming soon…</div>;
    case ROLES.ORGANIZER:
      return <div>Organizer dashboard coming soon…</div>;
    case ROLES.STUDIO:
      return <div>Studio dashboard coming soon…</div>;
    default:
      return null;
  }
}
