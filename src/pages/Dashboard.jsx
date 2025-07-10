import HeaderDashboard from "@/components/HeaderDashboard";
import { axiosClient } from "@/helpers/axiosClient";
import GlobalInfo from "@/sections/dashboard/GlobalInfo";
import QuickStarts from "@/sections/dashboard/QuickStarts";
import Shortcuts from "@/sections/dashboard/Shortcuts";
import Header from "@/sections/landingPage/Header";
import React, { useEffect } from "react";

export default function Dashboard() {
  const [bookings, setBookings] = React.useState([]);
  useEffect(() => {
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
      <main className="container mx-auto px-4 py-8">
        <GlobalInfo />
        <QuickStarts bookings={bookings} />
        <Shortcuts bookings={bookings} />
      </main>
    </>
  );
}
