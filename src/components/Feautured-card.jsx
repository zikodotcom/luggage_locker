import React from "react";

export default function FeauturedCard({ icon, header, text, gradient }) {
  return (
    <div className="text-center rounded-2xl space-y-4 shadow-2xl px-2 py-6">
      <div
        className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} mb-6 shadow-lg inline-block text-white text-3xl`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{header}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
