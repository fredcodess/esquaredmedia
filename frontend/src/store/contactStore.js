import { create } from "zustand";
import { axiosInstance } from "../config/axios.js";
import toast from "react-hot-toast";

export const contactStore = create((set, get) => ({
  contact: async (data) => {
    set({ isContacting: true });
    try {
      const res = await axiosInstance.post("/customer/contact", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Contacting error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      set({ isContacting: false });
    }
  },
}));
