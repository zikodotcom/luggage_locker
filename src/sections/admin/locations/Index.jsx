import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTableCountries from "./DataTable";
import SearchComp from "@/components/SearchComp";
import DataTableCities from "./DataTable";
import ModelCreate from "./ModelCreate";
import { axiosClient } from "@/helpers/axiosClient";
import { useDispatch } from "react-redux";
import { setPlaces } from "@/feautures/placeSlice";
import ModelUpdate from "./ModelUpdate";
import Delete from "./Delete";
import ModelCreateLocker from "./ModelCreateLocker";
import ModelUpdateLocker from "./ModelUpdateLocker";
import DeleteLocker from "./DeleteLocker";

export default function Index() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosClient
      .get("/place")
      .then((res) => {
        dispatch(setPlaces(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch places:", err);
        // Optionally show a toast notification for error
      });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Manage Locations
              </h1>
              <p className="text-gray-600">
                Add and manage luggage storage locations
              </p>
            </div>
          </div>
          <div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Place
            </Button>
          </div>
        </div>
        <DataTableCities />
        <ModelCreate
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={(value) => setIsDialogOpen(value)}
        />
        <ModelCreateLocker />
        <ModelUpdateLocker />
        <ModelUpdate />
        <Delete />
        <DeleteLocker />
      </div>
    </div>
  );
}
