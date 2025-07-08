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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPlace, toggleDialog, updatePlace } from "@/feautures/placeSlice";
import { Toaster } from "@/components/ui/sonner";

export default function ModelUpdate() {
  const [listCity, setListCity] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const dispatch = useDispatch();
  const { placeUpdate, isDialogOpen } = useSelector((state) => state.place);

  const formik = useFormik({
    initialValues: {
      name: placeUpdate.name || "",
      description: placeUpdate.description || "",
      address: placeUpdate.address || "",
      latitude: placeUpdate.latitude || 0,
      longitude: placeUpdate.longitude || 0,
      cityId: placeUpdate.cityId || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Place name is required"),
      description: Yup.string().required("Description is required"),
      address: Yup.string().required("Address is required"),
      latitude: Yup.string()
        .required("Latitude is required")
        .matches(/^-?\d+(\.\d+)?$/, "Invalid latitude format"),
      longitude: Yup.string()
        .required("Longitude is required")
        .matches(/^-?\d+(\.\d+)?$/, "Invalid longitude format"),
      cityId: Yup.string().required("City is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be a positive number"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsEnabled(false);
      let data = { ...values, id: placeUpdate.id };
      axiosClient
        .put("/place", data)
        .then((res) => {
          toast.success("Place updated successfully!");
          resetForm();
          dispatch(toggleDialog());
          dispatch(updatePlace(res.data));
        })
        .catch((err) => {
          setIsEnabled(true);
          toast.error(err.response?.data?.message || "Failed to update place");
        });
    },
  });

  useEffect(() => {
    if (placeUpdate.id) {
      formik.setValues({
        name: placeUpdate.name,
        description: placeUpdate.description,
        address: placeUpdate.address,
        latitude: placeUpdate.latitude,
        longitude: placeUpdate.longitude,
        cityId: placeUpdate.cityId,
      });
    }
  }, [placeUpdate]);

  useEffect(() => {
    axiosClient
      .get("/city")
      .then((res) => {
        setListCity(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch cities:", err);
        toast.error("Failed to load cities");
      });
  }, []);

  const renderInputField = (key) => {
    if (key === "cityId") {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor="cityId">City *</Label>
          <Select
            value={formik.values.cityId}
            onValueChange={(value) => formik.setFieldValue("cityId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cities</SelectLabel>
                {listCity.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.cityId && formik.errors.cityId && (
            <p className="text-red-500 text-sm">{formik.errors.cityId}</p>
          )}
        </div>
      );
    }

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
          type={
            key === "latitude" || key === "longitude" || key === "price"
              ? "number"
              : "text"
          }
        />
        {formik.touched[key] && formik.errors[key] && (
          <p className="text-red-500 text-sm">{formik.errors[key]}</p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => dispatch(toggleDialog())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update New Place</DialogTitle>
          <DialogDescription>
            Update a new place in your luggage storage network.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {Object.keys(formik.initialValues).map(renderInputField)}

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => dispatch(toggleDialog())}
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
                "Update Place"
              )}
            </Button>
          </DialogFooter>
        </form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}
