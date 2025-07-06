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
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosClient } from "@/helpers/axiosClient";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountry,
  toggleDialog,
  updateCountry,
} from "@/feautures/countrySlice";

export default function ModelUpdate() {
  const [isEnabled, setIsEnabled] = useState(true);
  const { isDialogOpen, countryUpdate } = useSelector((state) => state.country);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: countryUpdate.name,
      code: countryUpdate.code,
      picture: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Country name is required"),
      code: Yup.string()
        .max(3, "Max 3 characters")
        .required("Country code is required"),
      picture: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsEnabled(false);
      if (!values.picture) {
        delete values.picture; // Remove picture if not provided
      }
      axiosClient
        .put("/country", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("Country created successfully!");
          resetForm();
          dispatch(toggleDialog());
          dispatch(updateCountry(res.data)); // Dispatch action to add country to Redux store
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
    if (countryUpdate) {
      formik.setValues({
        id: countryUpdate.id || "",
        name: countryUpdate.name || "",
        code: countryUpdate.code || "",
        picture: "",
      });
    }
  }, [countryUpdate]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => dispatch(toggleDialog())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update New Country</DialogTitle>
          <DialogDescription>
            Update country in your luggage storage network.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Country Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., United States"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Country Code *</Label>
            <Input
              id="code"
              name="code"
              placeholder="e.g., US"
              value={formik.values.code}
              onChange={(e) =>
                formik.setFieldValue("code", e.target.value.toUpperCase())
              }
              onBlur={formik.handleBlur}
              maxLength={3}
            />
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-sm">{formik.errors.code}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="picture">picture</Label>
            <Input
              type="file"
              accept="image/*"
              id="picture"
              name="picture"
              onChange={(event) => {
                formik.setFieldValue("picture", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.picture && formik.errors.picture && (
              <p className="text-red-500 text-sm">{formik.errors.picture}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDialogUpdateOpen(false)}
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
                  Update...
                </>
              ) : (
                "Update Country"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
