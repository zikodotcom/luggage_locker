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
import { deletePlace, toggleDelete } from "@/feautures/placeSlice";
import { axiosClient } from "@/helpers/axiosClient";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Delete() {
  const { isDelete, placeUpdate } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const handleDelete = () => {
    axiosClient
      .delete("/place", {
        data: {
          id: placeUpdate.id,
        },
      })
      .then((res) => {
        dispatch(toggleDelete());
        dispatch(deletePlace());
        toast.success("City deleted successfully!");
      });
  };

  return (
    <Dialog open={isDelete} onOpenChange={() => dispatch(toggleDelete())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete place</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this place? This action cannot be
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
