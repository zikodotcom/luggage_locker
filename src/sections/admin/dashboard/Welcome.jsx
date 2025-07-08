import React from "react";
import { useSelector } from "react-redux";

export default function Welcome() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        Welcome back, {user.first_name}!
      </h2>
      <p className="text-gray-600">
        Here's what's happening with your luggage storage network today.
      </p>
    </div>
  );
}
