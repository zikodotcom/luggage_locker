import React, { useEffect } from "react";
import LocationCard from "../../components/LocationCard";
import Maps from "@/components/Maps";
import { axiosClient } from "@/helpers/axiosClient";
const img = "/landing/new-york.jpg";
export default function Section5() {
  const [place, setplace] = React.useState();
  useEffect(() => {
    // Set initial coordinates to the first location if available
    axiosClient
      .get("/place")
      .then((response) => {
        const locations = response.data;
        if (locations.length > 0) {
          setplace(locations[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);
  return (
    <>
      <section className="w-full py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex justify-center z-1">
              <Maps loc={place} />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
                  {/* <Shield className="w-4 h-4 mr-2" /> */}
                  Advanced Technology
                </div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Real-Time Everything
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our advanced platform provides real-time availability updates,
                  instant booking confirmations, and live tracking of your
                  stored luggage.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
                  <span className="font-medium">
                    Live availability tracking across all locations
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 animate-pulse" />
                  <span className="font-medium">
                    Smart filtering by size, price, and distance
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse" />
                  <span className="font-medium">
                    GPS navigation to your chosen location
                  </span>
                </div>
              </div>
              {/* <Button
                size="lg"
                asChild
                className="w-fit bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/map">Try Interactive Map</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
