import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosClient } from "@/helpers/axiosClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function RightSide() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsEnabled(false); // Disable button to prevent multiple submissions
      axiosClient
        .post("user", values)
        .then((res) => {
          console.log("User created successfully:", res.data);
          toast.success("Account created successfully!");
          // Redirect to login page after successful registration
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000); // Redirect after 1 second
        })
        .catch((err) => {
          setIsEnabled(true); // Re-enable button on error
          console.error(
            "Error creating user:",
            err.response ? err.response.data : err.message
          );
          // Handle error (e.g., show error message)
          toast.error(
            err.response && err.response.data
              ? err.response.data.message || "Failed to create account"
              : "An error occurred while creating account"
          );
        });
    },
  });

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold">
            LuggageLock
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Create an account</h1>
          <p className="text-gray-500">
            Sign up to get started with LuggageLock
          </p>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="first_name"
                className="text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl block w-full px-4 mt-2"
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.first_name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="last_name"
                className="text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Enter your last name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl block w-full px-4 mt-2"
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.last_name}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl block w-full px-4 mt-2"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative space-y-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl pr-12 w-full px-4 mt-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || !isEnabled}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
