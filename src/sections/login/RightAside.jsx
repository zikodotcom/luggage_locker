import { axiosClient } from "@/helpers/axiosClient";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "@/feautures/userSlice";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function RightAside() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axiosClient.post("login", values);
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login successfully!");
        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          if (response.data.user.role === "USER") {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/admin/dashboard", { replace: true });
          }
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        // handle error
        console.error("Login failed", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LL</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LuggageLock
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue your journey
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl block w-full px-4 mt-2"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {/* <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </Link> */}
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl pr-12 w-full px-4 mt-2"
                required
              />
              <button
                type="button"
                autoComplete="off"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}{" "}
                {/* Replace with icons if needed */}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
