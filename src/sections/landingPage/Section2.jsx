import React from "react";
import AnimatedCounter from "../../components/Animated-counter";

export default function Section2() {
  return (
    <>
      {/* Stats Section */}
      <section className="w-full py-16 bg-white">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-gray-600">Cities Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end={100000} suffix="+" />
              </div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600 mb-2">
                <AnimatedCounter end={50000} suffix="+" />
              </div>
              <div className="text-gray-600">Secure Lockers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
