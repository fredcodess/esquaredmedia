import { create } from "zustand";
import { axiosInstance } from "../config/axios";

const useDisabledDatesStore = create((set) => ({
  disabledDates: [],

  fetchDisabledDates: async () => {
    try {
      const response = await axiosInstance.get("/disabledDates/dates");
      const dates = response.data.map((d) => new Date(d.date));
      set({ disabledDates: dates });
    } catch (error) {
      console.error("Error fetching disabled dates:", error);
    }
  },

  addDisabledDate: async (date) => {
    try {
      const response = await axiosInstance.post("/disabledDates/dates", {
        date,
      });
      set((state) => ({
        disabledDates: [...state.disabledDates, new Date(response.data.date)],
      }));
    } catch (error) {
      console.error("Error adding disabled date:", error);
      alert(error.response?.data?.message || "Error adding date");
    }
  },

  removeDisabledDate: async (id) => {
    try {
      await axiosInstance.delete(`/disabledDates/dates/${id}`);
      set((state) => ({
        disabledDates: state.disabledDates.filter((date) => date._id !== id),
      }));
    } catch (error) {
      console.error("Error removing disabled date:", error);
    }
  },
}));

export default useDisabledDatesStore;
