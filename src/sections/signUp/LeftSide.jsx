import React from "react";

export default function LeftSide() {
  return (
    <div className="flex-1 hidden md:flex lg:block bg-blue-600 relative">
      <div className="absolute inset-0 bg-opacity-20 bg-black flex items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h1 className="text-4xl font-bold mb-6">
            Join thousands of travelers
          </h1>
          <p className="text-xl mb-8">
            Create an account to store your luggage securely at verified
            locations around the city. Enjoy your travels without the burden of
            heavy bags.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 p-1 rounded-full">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Secure Storage</h3>
                <p className="text-sm opacity-80">
                  All locations are verified and monitored 24/7
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 p-1 rounded-full">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Flexible Booking</h3>
                <p className="text-sm opacity-80">
                  Book in advance or on the spot, cancel anytime
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 p-1 rounded-full">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Insurance Included</h3>
                <p className="text-sm opacity-80">
                  Every booking includes insurance up to $1000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
