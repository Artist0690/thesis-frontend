import axios from "axios";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "http://localhost:5000",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
