import React from "react";
import LeftSide from "../sections/signUp/LeftSide";
import RightSide from "../sections/signUp/RightSide";

export default function SignUp() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <LeftSide />
      <RightSide />
    </div>
  );
}
