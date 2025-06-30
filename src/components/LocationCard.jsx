import React from "react";
import { BiLocationPlus } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

export default function LocationCard({ image, location, num_places, price }) {
  return (
    <div className="w-[40%] md:w-[20%] rounded-2xl shadow-2xl ease-in-out transition-all cursor-pointer hover:scale-110">
      <img src={image} alt="" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
        <div className="flex justify-between">
          <p className="text-gray-600 flex items-center">
            <span className="mr-1">
              <GoLocation />
            </span>{" "}
            {num_places} locations
          </p>
          <p className="text-gray-600">
            From{" "}
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              ${price}
            </span>{" "}
            per day
          </p>
        </div>
      </div>
    </div>
  );
}
