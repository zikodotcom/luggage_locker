import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LL</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LuggageLock
            </span>
          </a>
          <nav className="gap-6 hidden md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="/map"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Find Locations
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#support"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Support
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-1 rounded"
            >
              Log In
            </a>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-1 rounded">
              <a
                href="/signup"
                className="text-sm font-medium hover:text-purple-600 transition-colors"
              >
                Sign Up
              </a>
            </button>
          </div>
          <div className="block md:hidden">
            <button
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </header>
      {/* Nav on mobile */}
      <nav
        className={`bg-white h-[50vh] p-4 ease-in-out transition-all origin-top  md:hidden ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="absolute right-5">
          <button
            className="border p-1 rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <ul>
          <li>
            {" "}
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="/map"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Find Locations
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#support"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Support
            </a>
          </li>
        </ul>
        <div className="flex gap-4 md:hidden items-end">
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-1 rounded"
          >
            Log In
          </Link>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-1 rounded">
            <Link
              to="/signup"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Sign Up
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}
