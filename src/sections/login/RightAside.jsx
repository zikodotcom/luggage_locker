import React from "react";
import { Link } from "react-router-dom";

export default function RightAside() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful login here
      console.log("Logged in with:", { email, password });
    }, 2000);
  };
  React.useEffect(() => {
    // Reset form on component mount
    setEmail("");
    setPassword("");
    setShowPassword(false);
  }, []);

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

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {/* <Link
                href="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </Link> */}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl pr-12 w-full px-4 mt-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {/* {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )} */}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
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
    </div>
  );
}
