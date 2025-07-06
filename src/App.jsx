import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route"; // path to your router file
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./feautures/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if user is logged in and redirect accordingly
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
