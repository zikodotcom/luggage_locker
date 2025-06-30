import React from "react";
import LeftSide from "../sections/login/LeftSide";
import RightAside from "../sections/login/RightAside";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <LeftSide />
      <RightAside />
    </div>
  );
}
