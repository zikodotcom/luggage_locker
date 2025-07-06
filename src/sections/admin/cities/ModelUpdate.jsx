import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosClient } from "@/helpers/axiosClient";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog, updateCity } from "@/feautures/citySlice";

export default function ModelUpdate() {
  const [listCountry, setListCountry] = useState([]);

  const [isEnabled, setIsEnabled] = useState(true);
  const { isDialogOpen, cityUpdate } = useSelector((state) => state.city);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("City name is required"),
      country: Yup.string().required("Country name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsEnabled(false);
      axiosClient
        .put("/city", values)
        .then((res) => {
          toast.success("City created successfully!");
          resetForm();
          dispatch(toggleDialog());
          dispatch(updateCity(res.data)); // Dispatch action to add country to Redux store
          setIsEnabled(true); // Re-enable the button
        })
        .catch((err) => {
          setIsEnabled(true);
          toast.error(
            err.response?.data?.message || "Failed to create country"
          );
        });
    },
  });
  useEffect(() => {
    if (cityUpdate) {
      formik.setValues({
        id: cityUpdate.id || "",
        name: cityUpdate.name || "",
        country: cityUpdate?.Country?.id || "",
      });
    }
  }, [cityUpdate]);
  useEffect(() => {
    axiosClient
      .get("/country")
      .then((res) => {
        setListCountry(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
        toast.error("Failed to load countries");
      });
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => dispatch(toggleDialog())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update New city</DialogTitle>
          <DialogDescription>
            Update a new city in your luggage storage network.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">City Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Marakech"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Select
              value={formik.values.country}
              onValueChange={(value) => formik.setFieldValue("country", value)}
            >
              <SelectTrigger className="w-full" name="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {listCountry.map((country) => (
                    <SelectItem
                      key={country.id}
                      value={country.id}
                      onClick={() =>
                        formik.setFieldValue("country", country.id)
                      }
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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
                "Update city"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
