import React from "react";
const image = "/hero.png";

export default function Section1() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      <div className="px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
                Trusted by 100K+ travelers worldwide
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Store Smart,
                </span>
                <br />
                <span className="text-gray-900">Travel Free</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed">
                Discover the freedom of hands-free travel. Store your luggage at
                verified locations worldwide and explore cities like never
                before.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <div className="relative flex-1 group">
                <input
                  type="search"
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-lg w-full outline-0"
                />
              </div>
              <button
                size="lg"
                className="h-14 px-8 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Lockers
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Join 100K+ happy travelers
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            </div>
            <div className="relative">
              <img
                src={image}
                alt="Hero"
                className="w-full h-auto rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
