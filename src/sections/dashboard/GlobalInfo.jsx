import React from "react";
import { useSelector } from "react-redux";

export default function GlobalInfo() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Welcome back, {user.first_name}!
      </h1>
      <p className="text-gray-600">
        Manage your luggage storage bookings and account settings
      </p>
    </div>
  );
}
