import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

export default function SearchFilter() {
  return (
    <div className="flex relative space-x-2 p-2 border-b">
      {/* SEARCH AND FILTER PART */}
      <Search className="absolute left-4.5 top-4.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search locations"
        className="pl-8 w-full"
      />
      <Button className="cursor-pointer">
        <Filter />
      </Button>
    </div>
  );
}
