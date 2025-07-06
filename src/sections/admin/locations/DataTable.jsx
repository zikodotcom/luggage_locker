import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge, Globe, MapPin, Package, Star } from "lucide-react";
import React from "react";

const filteredLocations = [
  {
    id: 1,
    name: "Central Station Lockers",
    address: "123 Main St, Downtown",
    cityName: "Paris",
    lockerTypes: [
      { type: "small", total: 10, available: 4 },
      { type: "large", total: 5, available: 1 },
    ],
    rating: 4.8,
    reviews: 123,
    status: "active",
    createdAt: "2024-10-01T08:00:00Z",
  },
  {
    id: 2,
    name: "Sants Station",
    address: "456 Plaça Espanya",
    cityName: "Barcelona",
    lockerTypes: [
      { type: "medium", total: 8, available: 0 },
      { type: "large", total: 4, available: 2 },
    ],
    rating: 4.5,
    reviews: 78,
    status: "inactive",
    createdAt: "2024-08-20T14:45:00Z",
  },
  {
    id: 3,
    name: "Alexanderplatz",
    address: "10178 Berlin",
    cityName: "Berlin",
    lockerTypes: [],
    rating: null,
    reviews: 0,
    status: "maintenance",
    createdAt: "2024-07-18T11:22:00Z",
  },
];

export default function DataTableCities() {
  return (
    <DataTable
      data={filteredLocations}
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
          render: (row) => <Badge variant="outline">{row.cityName}</Badge>,
        },
        {
          key: "lockerTypes",
          label: "Lockers",
          render: (row) => {
            const total = row.lockerTypes.reduce((sum, t) => sum + t.total, 0);
            const available = row.lockerTypes.reduce(
              (sum, t) => sum + t.available,
              0
            );
            return (
              <>
                {total} total
                <div className="text-sm text-gray-500">
                  {available} available
                </div>
              </>
            );
          },
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
          key: "status",
          label: "Status",
          render: (row) => (
            <Select
              value={row.status}
              // onValueChange={(value) => handleStatusChange(row.id, value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          ),
        },
        {
          key: "createdAt",
          label: "Created",
          render: (row) => "11/10/2022",
        },
        {
          key: "actions",
          label: "Actions",
          render: (row) => (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Delete
              </Button>
            </div>
          ),
        },
      ]}
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
