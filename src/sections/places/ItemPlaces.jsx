import Maps from "@/components/Maps";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { axiosClient } from "@/helpers/axiosClient";
import { Badge } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ItemPlaces() {
  const [MOCK_LOCATIONS, setMOCK_LOCATIONS] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [place, setplace] = useState();
  const handleSelectLocation = (location) => {
    setSelectedLocation(location.id);
    setplace(location);
  };
  const { placeId } = useParams(); // Get the ID from the URL params

  useEffect(() => {
    // Set initial coordinates to the first location if available
    axiosClient
      .get("/place", {
        params: {
          country: placeId, // Use the ID from the URL params
        },
      })
      .then((response) => {
        const locations = response.data;
        setMOCK_LOCATIONS(locations);
        setInitialData(locations);
        if (locations.length > 0) {
          setSelectedLocation(locations[0].id);
          setplace(locations[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const searchLoacation = (searchTerm) => {
    if (!searchTerm) {
      // Reset to original locations if search term is empty
      setMOCK_LOCATIONS(initialData);
      return;
    }
    const filteredLocations = MOCK_LOCATIONS.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMOCK_LOCATIONS(filteredLocations);
  };
  return (
    <div>
      {/* List places */}
      <div className="flex">
        <div className="divide-y w-[25%] h-[100vh] overflow-auto">
          <SearchFilter searchLoacation={searchLoacation} />
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
                      {location?.lockers?.length > 0 &&
                        location.lockers[0].price}
                      MAD
                    </span>{" "}
                    / day
                  </div>
                  <div className="text-sm text-gray-500">
                    {location.distance}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" asChild>
                    <Link to={`/booking/${location.id}`}>Book Now</Link>
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
