import { create } from "zustand";
import { axiosInstance } from "../config/axios.js";
import toast from "react-hot-toast";

export const contactStore = create((set, get) => ({
  contact: async (data) => {
    set({ isContacting: true });
    try {
      const res = await axiosInstance.post("/customer/contact", data);
      set({ authUser: res.data });
      toast.success("Message Sent successfully");
    } catch (error) {
      console.error("Contacting error:", error.response?.data);
      toast.error("Error Occured. Review all contact fields.");
    } finally {
      set({ isContacting: false });
    }
  },
}));
