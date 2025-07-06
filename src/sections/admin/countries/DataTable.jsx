import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  setCountryUpdate,
  toggleDelete,
  toggleDialog,
} from "@/feautures/countrySlice";
import { Badge, Globe } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DataTableCountries() {
  const { country } = useSelector((state) => state.country);
  const dispatch = useDispatch();
  return (
    <DataTable
      title="Countries"
      description="List of supported countries"
      data={country}
      fields={[
        { key: "name", label: "Name" },
        {
          key: "code",
          label: "Code",
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
                  dispatch(setCountryUpdate(row));
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
                  dispatch(setCountryUpdate(row));
                  dispatch(toggleDelete());
                }}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
