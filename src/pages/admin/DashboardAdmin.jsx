import HeaderDashboard from "@/components/HeaderDashboard";
import { axiosClient } from "@/helpers/axiosClient";
import ListBooking from "@/sections/admin/dashboard/ListBooking";
import QuickActions from "@/sections/admin/dashboard/QuickActions";
import Stats from "@/sections/admin/dashboard/Stats";
import Welcome from "@/sections/admin/dashboard/Welcome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardAdmin() {
  const [bookings, setBookings] = React.useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      window.location.href = "/login";
      return;
    }
    axiosClient
      .get("/booking")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);
  return (
    <>
      <HeaderDashboard />

      <div className="container mx-auto px-4 py-8">
        <Welcome />
        <div className="w-full">
          <Stats />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <QuickActions />
        </div>
      </div>
      <ListBooking bookings={bookings} />
    </>
  );
}
