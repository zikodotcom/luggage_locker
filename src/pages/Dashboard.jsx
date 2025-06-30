import GlobalInfo from "@/sections/dashboard/GlobalInfo";
import QuickStarts from "@/sections/dashboard/QuickStarts";
import Shortcuts from "@/sections/dashboard/Shortcuts";
import Header from "@/sections/landingPage/Header";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <GlobalInfo />
        <QuickStarts />
        <Shortcuts />
      </main>
    </>
  );
}
