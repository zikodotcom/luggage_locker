import React from "react";
import Header from "../sections/landingPage/Header";
import Section1 from "../sections/landingPage/Section1";
import Section2 from "../sections/landingPage/Section2";
import Section3 from "../sections/landingPage/Section3";
import Section4 from "../sections/landingPage/Section4";
import Section5 from "../sections/landingPage/Section5";
import Footer from "../sections/landingPage/Footer";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header />
      <main>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Footer />
      </main>
    </div>
  );
}
