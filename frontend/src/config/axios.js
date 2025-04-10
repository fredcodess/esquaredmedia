import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5002/api/" : "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
