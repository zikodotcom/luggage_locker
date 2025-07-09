import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosClient } from "@/helpers/axiosClient";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

import {
  addLocker,
  addPlace,
  toggleLockerDialog,
} from "@/feautures/placeSlice";

export default function ModelCreateLocker() {
  const [isEnabled, setIsEnabled] = useState(true);
  const dispatch = useDispatch();
  const { placeUpdate, isLockerDialogOpen } = useSelector(
    (state) => state.place
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      length: 0,
      width: 0,
      placeId: placeUpdate.id,
    },
    validationSchema: Yup.object({
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be a positive number"),
      length: Yup.number()
        .required("Length is required")
        .min(0, "Length must be a positive number"),
      width: Yup.number()
        .required("Width is required")
        .min(0, "Width must be a positive number"),
      name: Yup.string()
        .required("Locker name is required")
        .min(3, "Name must be at least 3 characters long"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsEnabled(false);
      axiosClient
        .post("/locker", values)
        .then((res) => {
          toast.success("Locker created successfully!");
          resetForm();
          dispatch(toggleLockerDialog());
          dispatch(addLocker(res.data));
        })
        .catch((err) => {
          setIsEnabled(true);
          toast.error(err.response?.data?.message || "Failed to create locker");
        });
    },
  });
  useEffect(() => {
    if (!isLockerDialogOpen) return;
    formik.setFieldValue("placeId", placeUpdate.id);
  }, [placeUpdate, isLockerDialogOpen]);

  const renderInputField = (key) => {
    if (key !== "placeId") {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)} *
          </Label>
          <Input
            id={key}
            name={key}
            placeholder={`Enter ${key}`}
            value={formik.values[key]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={key == "name" ? "text" : "number"}
          />
          {formik.touched[key] && formik.errors[key] && (
            <p className="text-red-500 text-sm">{formik.errors[key]}</p>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog
      open={isLockerDialogOpen}
      onOpenChange={() => dispatch(toggleLockerDialog())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Locker</DialogTitle>
          <DialogDescription>
            Create a new locker in your luggage storage network.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {Object.keys(formik.initialValues).map(renderInputField)}

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => dispatch(toggleLockerDialog())}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || !isEnabled}
            >
              {!isEnabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create locker"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
