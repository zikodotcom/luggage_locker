import QuickActions from "@/sections/dashboardAdmin/QuickActions";
import Stats from "@/sections/dashboardAdmin/Stats";
import Welcome from "@/sections/dashboardAdmin/Welcome";
import React from "react";

export default function DashboardAdmin() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Welcome />
        <Stats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <QuickActions />
        </div>
      </div>
    </>
  );
}
