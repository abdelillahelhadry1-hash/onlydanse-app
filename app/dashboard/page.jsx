"use client";

import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { TopBar } from "../components/TopBar";
import { Sidebar } from "../components/Sidebar";
import { DashboardView } from "./DashboardView";
import { ROLES } from "./roles";

export default function DashboardPage() {
  const [currentRole, setCurrentRole] = useState(ROLES.DANCER);

  return (
    <MainLayout
      topBar={<TopBar currentRole={currentRole} onRoleChange={setCurrentRole} />}
      sidebar={<Sidebar role={currentRole} />}
    >
      <DashboardView role={currentRole} />
    </MainLayout>
  );
}
