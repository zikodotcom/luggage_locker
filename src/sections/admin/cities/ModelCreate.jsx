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
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCity } from "@/feautures/citySlice";

export default function ModelCreate({ isDialogOpen, setIsDialogOpen }) {
  const [listCountry, setListCountry] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
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
        .post("/city", values)
        .then((res) => {
          toast.success("City created successfully!");
          resetForm();
          setIsDialogOpen(false); // Close the modal
          dispatch(addCity(res.data)); // Dispatch action to add country to Redux stor
          setIsEnabled(true);
        })
        .catch((err) => {
          setIsEnabled(true);
          toast.error(err.response?.data?.message || "Failed to create city");
        });
    },
  });

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New city</DialogTitle>
          <DialogDescription>
            Create a new city in your luggage storage network.
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
                  <SelectLabel>Countries</SelectLabel>
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
              onClick={() => setIsDialogOpen(false)}
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
                "Create city"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
