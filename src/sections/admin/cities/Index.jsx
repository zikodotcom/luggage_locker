import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTableCountries from "./DataTable";
import SearchComp from "@/components/SearchComp";
import DataTableCities from "./DataTable";
import ModelCreate from "./ModelCreate";
import { useDispatch } from "react-redux";
import { setCities } from "@/feautures/citySlice";
import { axiosClient } from "@/helpers/axiosClient";
import ModelUpdate from "./ModelUpdate";
import Delete from "./Delete";

export default function Index() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosClient
      .get("/city")
      .then((res) => {
        dispatch(setCities(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
        toast.error("Failed to load countries");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Manage Cities
              </h1>
              <p className="text-gray-600">
                Add and manage cities in your network
              </p>
            </div>
          </div>
          <div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>
          </div>
        </div>
        {/* Search */}
        <SearchComp />
        <DataTableCities />
        <ModelCreate
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={(value) => setIsDialogOpen(value)}
        />
        <ModelUpdate />
        <Delete />
      </div>
    </div>
  );
}
