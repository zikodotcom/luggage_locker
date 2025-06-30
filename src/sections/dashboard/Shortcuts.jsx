import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  Package,
  Plus,
  Settings,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Shortcuts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="active">Active ({0})</TabsTrigger>
              <TabsTrigger value="completed">Completed (1)</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled (1)</TabsTrigger>
            </TabsList>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/map">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Link>
            </Button>
          </div>

          <TabsContent value="active" className="space-y-4">
            {0 === 0 ? (
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
            {0 === 0 ? (
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
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {0 === 0 ? (
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
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/map">
                <MapPin className="h-4 w-4 mr-2" />
                Find Storage Locations
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest luggage storage activities
            </CardDescription>
          </CardHeader>
          {/* <CardContent className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{booking.locationName}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <Badge
                  variant={
                    booking.status === "active" ? "default" : "secondary"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent> */}
        </Card>

        {/* Support */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-purple-100 mb-4">
              Our support team is available 24/7 to assist you with any
              questions.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
