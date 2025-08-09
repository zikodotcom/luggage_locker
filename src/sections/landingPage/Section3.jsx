import React from "react";
import FeauturedCard from "../../components/Feautured-card";
import { Button } from "primereact/button";
import { BiCalendar, BiSearch } from "react-icons/bi";
import { BsFillLuggageFill } from "react-icons/bs";

export default function Section3() {
  return (
    <>
      <section
        id="how-it-works"
        className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
              {/* <Zap className="w-4 h-4 mr-2" /> */}
              Simple Process
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="max-w-[900px] text-gray-600 text-lg">
              Store your luggage in three simple steps and enjoy your travels
              hands-free
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeauturedCard
              icon={<BiSearch />}
              header="Find & Compare"
              text="Search for luggage lockers near your location and compare prices, ratings, and availability in real-time"
              step="1"
              gradient="from-purple-500 to-pink-500"
            />
            <FeauturedCard
              icon={<BiCalendar />}
              header="Book Instantly"
              text="Reserve your locker online with instant confirmation. Choose your preferred time slot and locker size"
              step="1"
              gradient="from-cyan-500 to-teal-500"
            />
            <FeauturedCard
              icon={<BsFillLuggageFill />}
              header="Store & Explore"
              text="Drop off your luggage at the verified location and explore the city hands-free with complete peace of mind"
              step="1"
              gradient="from-cyan-500 to-teal-500"
            />
          </div>
        </div>
      </section>
    </>
  );
}
