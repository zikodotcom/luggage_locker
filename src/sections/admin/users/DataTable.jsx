import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { activeUser } from "@/feautures/userSlice";
import { axiosClient } from "@/helpers/axiosClient";
import { Badge, Globe, MapPin, Package, Star, User } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function DataTableUsers() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChangeStatus = (userId) => {
    axiosClient
      .put("/activate-user", { id: userId })
      .then(() => {
        dispatch(activeUser(userId)); // Dispatch the action to update the user status in the Redux store
        // Optionally handle success response
        toast.success("User status updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update user status:", error);
        // Optionally show a toast notification for error
        toast.error("Failed to update user status.");
      });
  }; // Added closing bracket and semicolon
  return (
    <DataTable
      data={users}
      fields={[
        {
          key: "name",
          label: "First Name",
          render: (row) => (
            <div>
              <div className="font-medium">
                {row.first_name} {row.last_name}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {row.email}
              </div>
            </div>
          ),
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "is_active",
          label: "Status",
          render: (row) => (
            <Switch
              checked={row.is_active}
              onCheckedChange={() => {
                handleChangeStatus(row.id);
              }}
              className="h-6 w-11 bg-gray-200 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
            />
          ),
        },
      ]}
      title="Users"
      description="Manage your users and their details."
      icon={<User className="h-5 w-5 text-purple-600" />}
      empty={{
        icon: <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />,
        title: "No user found",
        description: false ? "Try adjusting your search terms." : "",
      }}
    />
  );
}
