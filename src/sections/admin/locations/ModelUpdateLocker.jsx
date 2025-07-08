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
  toggleLockerUpdateDialog,
  updateLocker,
} from "@/feautures/placeSlice";

export default function ModelUpdateLocker() {
  const [isEnabled, setIsEnabled] = useState(true);
  const dispatch = useDispatch();
  const { placeUpdate, isLockerUpdateDialogOpen } = useSelector(
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
    }),
    onSubmit: (values, { resetForm }) => {
      setIsEnabled(false);
      axiosClient
        .put("/locker", values)
        .then((res) => {
          toast.success("Locker updated successfully!");
          resetForm();
          dispatch(toggleLockerUpdateDialog());
          dispatch(updateLocker(res.data));
        })
        .catch((err) => {
          setIsEnabled(true);
          toast.error(err.response?.data?.message || "Failed to update locker");
        });
    },
  });
  useEffect(() => {
    formik.setFieldValue("id", placeUpdate.id);
    formik.setFieldValue("placeId", placeUpdate.placeId);
    formik.setFieldValue("price", placeUpdate.price || 0);
    formik.setFieldValue("length", placeUpdate.length || 0);
    formik.setFieldValue("width", placeUpdate.width || 0);
    formik.setFieldValue("name", placeUpdate.name || "");
  }, [placeUpdate.id]);

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
      open={isLockerUpdateDialogOpen}
      onOpenChange={() => dispatch(toggleLockerUpdateDialog())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update New Locker</DialogTitle>
          <DialogDescription>
            Update a locker in your luggage storage network.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {Object.keys(formik.initialValues).map(renderInputField)}

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => dispatch(toggleLockerUpdateDialog())}
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
                  Updating...
                </>
              ) : (
                "Update locker"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
