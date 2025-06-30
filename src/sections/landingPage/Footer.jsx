import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Hajar. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
