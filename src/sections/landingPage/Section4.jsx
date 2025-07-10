import React, { useEffect } from "react";
import LocationCard from "../../components/LocationCard";
import { axiosClient } from "@/helpers/axiosClient";
const img = "/landing/new-york.jpg";
export default function Section4() {
  const [countries, setCountries] = React.useState([]);
  useEffect(() => {
    axiosClient
      .get("/country")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);
  return (
    <>
      <section className="w-full py-20 px-5 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
              {/* <Globe className="w-4 h-4 mr-2" /> */}
              Global Network
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Popular Destinations
            </h2>
            <p className="max-w-[900px] text-gray-600 text-lg">
              Discover our most popular luggage storage locations around the
              world
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between space-y-4">
          {countries.map((country) => (
            <LocationCard
              key={country.id}
              image={`http://localhost:5555/${country.picture}` || img}
              location={`${country.name}`}
              num_places={country.num_places}
              price={country?.price}
            />
          ))}
        </div>
      </section>
    </>
  );
}
