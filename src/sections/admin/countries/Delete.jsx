import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { deleteCountry, toggleDelete } from "@/feautures/countrySlice";
import { axiosClient } from "@/helpers/axiosClient";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Delete() {
  const { isDelete, countryUpdate } = useSelector((state) => state.country);
  const dispatch = useDispatch();
  const handleDelete = () => {
    axiosClient
      .delete("/country", {
        data: {
          id: countryUpdate.id,
        },
      })
      .then((res) => {
        dispatch(toggleDelete());
        dispatch(deleteCountry());
        toast.success("Country deleted successfully!");
      });
  };

  return (
    <Dialog open={isDelete} onOpenChange={() => dispatch(toggleDelete())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Country</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this country? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => dispatch(toggleDelete())}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
