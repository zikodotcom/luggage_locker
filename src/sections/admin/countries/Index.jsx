import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchComp from "@/components/SearchComp";
import ModelCreate from "./ModelCreate";
import DataTableCountries from "./DataTable";
import { deleteCountry, setCountries } from "@/feautures/countrySlice";
import { axiosClient } from "@/helpers/axiosClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch } from "react-redux";
import ModelUpdate from "./ModelUpdate";
import Delete from "./Delete";

export default function Index() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosClient
      .get("/country")
      .then((res) => {
        dispatch(setCountries(res.data));
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Manage Countries
                </h1>
                <p className="text-gray-600">
                  Add and manage countries in your network
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>
          </div>
        </div>
        <DataTableCountries />
        <ModelCreate
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={(value) => setIsDialogOpen(value)}
        />
        <ModelUpdate />
        <Delete />
      </div>
      <Toaster />
    </div>
  );
}
