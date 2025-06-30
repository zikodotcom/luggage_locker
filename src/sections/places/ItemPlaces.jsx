import Maps from "@/components/Maps";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
const MOCK_LOCATIONS = [
  {
    id: 1,
    name: "Central Station Lockers",
    address: "123 Main St, Downtown",
    price: "$5.99",
    rating: 4.8,
    availableLockers: 12,
    totalLockers: 20,
    distance: "0.3 miles",
    coordinates: { x: 150, y: 150 },
    latitude: 34.267667, // Kenitra, Morocco
    longitude: -6.565778,
  },
  {
    id: 2,
    name: "City Mall Storage",
    address: "456 Market Ave, Shopping District",
    price: "$4.99",
    rating: 4.6,
    availableLockers: 8,
    totalLockers: 15,
    distance: "0.7 miles",
    coordinates: { x: 250, y: 180 },
    latitude: 35.6895, // Tokyo, Japan
    longitude: 139.6917,
  },
  {
    id: 3,
    name: "Tourist Center Lockers",
    address: "789 Tourist Blvd, Attraction Area",
    price: "$6.99",
    rating: 4.9,
    availableLockers: 5,
    totalLockers: 10,
    distance: "1.2 miles",
    coordinates: { x: 180, y: 250 },
    latitude: 48.8566, // Paris, France
    longitude: 2.3522,
  },
  {
    id: 4,
    name: "Harbor View Storage",
    address: "321 Harbor Rd, Waterfront",
    price: "$7.99",
    rating: 4.7,
    availableLockers: 15,
    totalLockers: 25,
    distance: "1.5 miles",
    coordinates: { x: 100, y: 220 },
    latitude: -33.8688, // Sydney, Australia
    longitude: 151.2093,
  },
];

export default function ItemPlaces() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [place, setplace] = useState();
  const handleSelectLocation = (location) => {
    setSelectedLocation(location.id);
    setplace(location);
  };
  useEffect(() => {
    // Set initial coordinates to the first location if available
    if (MOCK_LOCATIONS.length > 0) {
      const firstLocation = MOCK_LOCATIONS[0];
      setplace(firstLocation);
      setSelectedLocation(firstLocation.id);
    }
  }, []);
  return (
    <div>
      {/* List places */}
      <div className="flex">
        <div className="divide-y h-[100vh] overflow-auto">
          <SearchFilter />
          {MOCK_LOCATIONS.map((location) => (
            <Card
              key={location.id}
              className={`rounded-none border-0 border-l-4 ${
                selectedLocation === location.id
                  ? "border-l-blue-600"
                  : "border-l-transparent"
              }`}
              onClick={() => handleSelectLocation(location)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <Badge
                    variant={
                      location.availableLockers > 5 ? "success" : "warning"
                    }
                  >
                    {location.availableLockers} Available
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">
                    <span className="font-medium text-blue-600">
                      {location.price}
                    </span>{" "}
                    / day
                  </div>
                  <div className="text-sm text-gray-500">
                    {location.distance}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/booking/${location.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {place && <Maps loc={place} />}
      </div>
    </div>
  );
}
