import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css"; // path to your CSS file
import "leaflet/dist/leaflet.css";
import { store } from "@/store/store"; // path to your Redux store
import App from "./App";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
