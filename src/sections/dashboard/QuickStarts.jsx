import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Package, Shield } from "lucide-react";
import React from "react";

export default function QuickStarts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Bookings</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <Package className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Bookings</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100">Cities Visited</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <MapPin className="h-8 w-8 text-cyan-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-500 to-green-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Money Saved</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <Shield className="h-8 w-8 text-teal-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
