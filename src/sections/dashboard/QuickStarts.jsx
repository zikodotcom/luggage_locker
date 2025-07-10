import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Package, Shield } from "lucide-react";

export default function QuickStarts({ bookings }) {
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [uniqueCities, setUniqueCities] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      setTotalBookings(bookings.length);

      const active = bookings.filter((b) => b.status === "ACTIVE").length;
      setActiveBookings(active);

      const cities = new Set(bookings.map((b) => b.locker?.Place?.city?.name))
        .size;
      setUniqueCities(cities);

      const payments = bookings.reduce((sum, b) => {
        const start = new Date(b.startDate);
        const end = new Date(b.endDate);
        const diffInDays =
          Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

        const pricePerDay = b.locker?.price || 0;
        return sum + pricePerDay * diffInDays;
      }, 0);

      setTotalPayments(payments);
    }
  }, [bookings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Bookings</p>
              <p className="text-3xl font-bold">{activeBookings}</p>
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
              <p className="text-3xl font-bold">{totalBookings}</p>
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
              <p className="text-3xl font-bold">{uniqueCities}</p>
            </div>
            <MapPin className="h-8 w-8 text-cyan-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-500 to-green-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Total Payments</p>
              <p className="text-3xl font-bold">
                {totalPayments.toFixed(2)} DH
              </p>
            </div>
            <Shield className="h-8 w-8 text-teal-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
