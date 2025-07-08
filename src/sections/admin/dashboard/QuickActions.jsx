import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, MapPin, Package, Plus, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="lg:col-span-3">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-purple-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Manage your luggage storage network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 bg-transparent"
            >
              <Link to="/admin/countries">
                <Globe className="h-6 w-6 text-blue-600" />
                <span>Manage Countries</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 bg-transparent"
            >
              <Link to="/admin/cities">
                <MapPin className="h-6 w-6 text-purple-600" />
                <span>Manage Cities</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-green-200 hover:border-green-500 hover:bg-green-50 bg-transparent"
            >
              <Link to="/admin/locations">
                <Package className="h-6 w-6 text-green-600" />
                <span>Manage Locations</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 bg-transparent"
            >
              <Link to="/admin/users">
                <Users className="h-6 w-6 text-orange-600" />
                <span>Manage Users</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
