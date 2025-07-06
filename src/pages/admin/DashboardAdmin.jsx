import QuickActions from "@/sections/admin/dashboard/QuickActions";
import Stats from "@/sections/admin/dashboard/Stats";
import Welcome from "@/sections/admin/dashboard/Welcome";
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
