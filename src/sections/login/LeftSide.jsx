import React from "react";

export default function LeftSide() {
  return (
    <div className="flex-1 hidden lg:block relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center justify-center h-full p-12">
        <div className="max-w-lg text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">LL</span>
              </div>
              <span className="text-3xl font-bold">LuggageLock</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome back to the future of travel
            </h1>
            <p className="text-xl mb-8 text-white/80 leading-relaxed">
              Join millions of travelers who trust LuggageLock for secure,
              convenient luggage storage worldwide.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm text-white/80">Cities worldwide</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-3xl font-bold mb-2">100K+</div>
              <div className="text-sm text-white/80">Happy travelers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-sm text-white/80">Average rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
