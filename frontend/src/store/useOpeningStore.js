import { create } from "zustand";

export const useOpeningStore = create((set) => ({
  openingHours: [],
  closedDays: [],
  loading: false,

  fetchClosedDays: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/opening/closed-days");
      const data = await res.json();
      set({ closedDays: data, loading: false });
    } catch (error) {
      console.error("Error fetching closed days:", error);
      set({ loading: false });
    }
  },

  fetchOpeningHours: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/opening/hours");
      if (!res.ok) throw new Error("Failed to fetch opening hours");
      const data = await res.json();
      set({
        openingHours: data,
        loading: false,
        selectedDays: data, // Initialize selectedDays with fetched data
      });
    } catch (error) {
      console.error("Error fetching opening hours:", error);
      set({ loading: false });
    }
  },

  changeOpeningHours: async (days) => {
    set({ loading: true });
    try {
      console.log("Sending data:", JSON.stringify(days)); // Debug log
      const res = await fetch("/api/opening/change-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(days),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update hours");
      }

      await res.json();
      set({ loading: false });
    } catch (error) {
      console.error("Error updating opening hours:", error);
      set({ loading: false });
    }
  },

  closeDay: async (date) => {
    try {
      await fetch("/api/opening/close-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      set((state) => ({ closedDays: [...state.closedDays, date] }));
    } catch (error) {
      console.error("Error closing day:", error);
    }
  },

  openDay: async (date) => {
    try {
      await fetch("/api/opening/open-day", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      set((state) => ({
        closedDays: state.closedDays.filter((d) => d !== date),
      }));
    } catch (error) {
      console.error("Error opening day:", error);
    }
  },
}));
