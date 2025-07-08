import { Card, CardContent } from "@/components/ui/card";
import { axiosClient } from "@/helpers/axiosClient";
import { Globe, MapPin, Package, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Stats() {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    axiosClient
      .get("/counts")
      .then((response) => {
        // Handle the response data as needed
        setCounts(response.data);
      })
      .catch((error) => {
        // Handle errors if necessary
        console.error("Error fetching counts:", error);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Countries</p>
              <p className="text-3xl font-bold">{counts.countries}</p>
            </div>
            <Globe className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Cities</p>
              <p className="text-3xl font-bold">{counts.cities}</p>
            </div>
            <MapPin className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Locations</p>
              <p className="text-3xl font-bold">{5}</p>
            </div>
            <Package className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Available Lockers</p>
              <p className="text-3xl font-bold">{counts.places}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
