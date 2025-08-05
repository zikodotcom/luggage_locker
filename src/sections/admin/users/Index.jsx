import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchComp from "@/components/SearchComp";
import { axiosClient } from "@/helpers/axiosClient";
import { useDispatch } from "react-redux";
import { setPlaces } from "@/feautures/placeSlice";
import Delete from "./Delete";
import DataTableUsers from "./DataTable";
import { setUsers } from "@/feautures/userSlice";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    axiosClient
      .get("/users")
      .then((res) => {
        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
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
                Manage Users
              </h1>
            </div>
          </div>
        </div>
        <DataTableUsers />
        <Delete />
      </div>
    </div>
  );
}
