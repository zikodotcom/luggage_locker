import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";

import {
  setPlaceUpdate,
  toggleDelete,
  toggleDeleteLocker,
  toggleDialog,
  toggleLockerDialog,
  toggleLockerUpdateDialog,
} from "@/feautures/placeSlice";
import { Badge, Globe, MapPin, Package, Star } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DataTableCities() {
  const { place } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  return (
    <DataTable
      data={place}
      fields={[
        {
          key: "name",
          label: "Location",
          render: (row) => (
            <div>
              <div className="font-medium">{row.name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {row.address}
              </div>
            </div>
          ),
        },
        {
          key: "cityName",
          label: "City",
          render: (row) => row.city.name,
        },
        {
          key: "rating",
          label: "Rating",
          render: (row) => (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{row.rating || "N/A"}</span>
              {row.reviews > 0 && (
                <span className="text-sm text-gray-500">({row.reviews})</span>
              )}
            </div>
          ),
        },
        {
          key: "createdAt",
          label: "Created",
          render: (row) => row.createdAt?.split("T")[0] || "N/A",
        },
        {
          key: "actions",
          label: "Actions",
          render: (row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  dispatch(setPlaceUpdate(row));
                  dispatch(toggleDialog());
                }}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 bg-transparent"
                onClick={() => {
                  dispatch(setPlaceUpdate(row));
                  dispatch(toggleDelete());
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 bg-transparent"
                onClick={() => {
                  dispatch(setPlaceUpdate(row));
                  dispatch(toggleLockerDialog());
                }}
              >
                Add locker
              </Button>
            </div>
          ),
        },
      ]}
      renderDetails={(row) => (
        <DataTable
          data={row.lockers}
          title="Lockers"
          fields={[
            {
              key: "name",
              label: "Locker Name",
            },
            {
              key: "price",
              label: "Price",
            },
            {
              key: "length",
              label: "Length",
            },
            {
              key: "width",
              label: "Width",
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      dispatch(setPlaceUpdate(row));
                      dispatch(toggleLockerUpdateDialog());
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => {
                      dispatch(setPlaceUpdate(row));
                      dispatch(toggleDeleteLocker());
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
        />
      )}
      title="Locations"
      description="Manage luggage storage locations in your network"
      icon={<Package className="h-5 w-5 text-purple-600" />}
      empty={{
        icon: <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />,
        title: "No locations found",
        description: false
          ? "Try adjusting your search terms."
          : "Get started by adding your first location.",
      }}
    />
  );
}
