import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Package, Plus, QrCode } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { axiosClient } from "@/helpers/axiosClient";

export default function ListBooking({ bookings }) {
  const [activeBookings, setActiveBookings] = React.useState([]);
  const [completedBookings, setCompletedBookings] = React.useState([]);
  const [cancelledBookings, setCancelledBookings] = React.useState([]);
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      setActiveBookings(bookings.filter((b) => b.status === "PENDING"));
      setCompletedBookings(bookings.filter((b) => b.status === "COMPLETED"));
      setCancelledBookings(bookings.filter((b) => b.status === "CANCELLED"));
    }
  }, [bookings]);
  const handleCancelBooking = (bookingId) => {
    axiosClient
      .put("/booking?is_admin=1", { id: bookingId, status: "CANCELLED" })
      .then((response) => {
        setActiveBookings((prev) =>
          prev.filter((booking) => booking.id !== bookingId)
        );
        setCancelledBookings((prev) => [
          ...prev,
          { ...response.data, status: "CANCELLED" },
        ]);
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
      });
  };
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="lg:col-span-2">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="active">
                Active ({activeBookings.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="space-y-4">
            {activeBookings.length === 0 ? (
              <Card className="p-12 text-center bg-white/50 backdrop-blur-sm border-dashed border-2 border-gray-300">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No active bookings
                </h3>
                <p className="text-gray-500 mb-4">
                  You don't have any active luggage storage bookings.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/map">Find Storage Locations</Link>
                </Button>
              </Card>
            ) : (
              activeBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length === 0 ? (
              <Card className="p-12 text-center bg-white/50 backdrop-blur-sm">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No completed bookings
                </h3>
                <p className="text-gray-500">
                  Your completed bookings will appear here.
                </p>
              </Card>
            ) : (
              completedBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  // onCancel={handleCancelBooking}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings === 0 ? (
              <Card className="p-12 text-center bg-white/50 backdrop-blur-sm">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No cancelled bookings
                </h3>
                <p className="text-gray-500">
                  Your cancelled bookings will appear here.
                </p>
              </Card>
            ) : (
              cancelledBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  // onCancel={handleCancelBooking}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function BookingCard({ booking, onCancel }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const numberOfDays =
    (new Date(booking.endDate) - new Date(booking.startDate)) /
      (1000 * 60 * 60 * 24) || 1;

  const price = booking.locker?.price ?? 0;
  const totalPrice = price * numberOfDays;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">
              {booking.locker?.Place?.name ?? "Unknown Place"}
            </h3>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {booking.locker?.Place?.address ?? "Unknown Address"}
            </p>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status == "PENDING" ? "Active" : booking.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Start Date
            </p>
            <p className="font-medium">
              {format(new Date(booking.startDate), "MMM dd, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              End Date
            </p>
            <p className="font-medium">
              {format(new Date(booking.endDate), "MMM dd, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Size
            </p>
            <p className="font-medium capitalize">
              {booking.locker?.name ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Price
            </p>
            <p className="font-medium">{totalPrice.toFixed(2)} DH</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Booking ID: {booking.id.slice(0, 8)}...
            </span>
          </div>
          <div className="flex gap-2">
            {booking.status === "PENDING" && onCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(booking.id)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Cancel
              </Button>
            )}
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
