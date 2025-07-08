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
import {
  deleteLocker,
  deletePlace,
  toggleDelete,
  toggleDeleteLocker,
} from "@/feautures/placeSlice";
import { axiosClient } from "@/helpers/axiosClient";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function DeleteLocker() {
  const { isDeleteLocker, placeUpdate } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const handleDelete = () => {
    axiosClient
      .delete("/locker", {
        data: {
          id: placeUpdate.id,
        },
      })
      .then((res) => {
        dispatch(toggleDeleteLocker());
        dispatch(deleteLocker());
        toast.success("Locker deleted successfully!");
      });
  };

  return (
    <Dialog
      open={isDeleteLocker}
      onOpenChange={() => dispatch(toggleDeleteLocker())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete locker</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this locker? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => dispatch(toggleDeleteLocker())}
          >
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
