import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  setcityUpdate,
  toggleDelete,
  toggleDialog,
} from "@/feautures/citySlice";
import { Badge, Globe, MapPin } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DataTableCities() {
  const { city } = useSelector((state) => state.city);
  const dispatch = useDispatch();
  return (
    <DataTable
      data={city}
      fields={[
        { key: "name", label: "City" },
        {
          key: "Country",
          label: "Country",
          render: (row) => row.Country.name,
        },
        {
          key: "locations",
          label: "Locations",
          render: (row) => row.Place?.length || 0,
        },
        {
          key: "createdAt",
          label: "Created",
          render: (row) => row.createdAt.split("T")[0],
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
                  dispatch(setcityUpdate(row));
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
                  dispatch(setcityUpdate(row));
                  dispatch(toggleDelete());
                }}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ]}
      title="Cities"
      description="Manage cities in your luggage storage network"
      icon={<MapPin className="h-5 w-5 text-purple-600" />}
      empty={{
        icon: <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />,
        title: "No cities found",
        description: false
          ? "Try adjusting your search terms."
          : "Get started by adding your first city.",
      }}
    />
  );
}
