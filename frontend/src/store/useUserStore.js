import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  loading: false,
  checkingAuth: true,

  signup: async (data) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/customer/register", data);
      set({ user: res.data, loading: false });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/customer/login", data);

      set({ user: res.data, loading: false });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/customer/logout");
      set({ user: null });
      localStorage.removeItem("authUser");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get("/customer/profile");
      set({ user: response.data, checkingAuth: false });
      localStorage.setItem("authUser", JSON.stringify(response.data));
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
      localStorage.removeItem("authUser");
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.post("/customer/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      localStorage.removeItem("authUser");
      throw error;
    }
  },
}));
