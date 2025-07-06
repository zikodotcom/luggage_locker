import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import DataTableCountries from "./DataTable";
import SearchComp from "@/components/SearchComp";
import DataTableCities from "./DataTable";

export default function Index() {
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
        </div>
        {/* Search */}
        <SearchComp />
        <DataTableCities />
      </div>
    </div>
  );
}
