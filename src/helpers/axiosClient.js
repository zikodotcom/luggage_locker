import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5555/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
