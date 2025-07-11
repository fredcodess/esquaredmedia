import { create } from "zustand";
import { formatISO } from "date-fns";

export const useOpeningStore = create((set) => ({
  openingHours: [],
  closedDays: [],
  loading: false,
  error: null,

  fetchClosedDays: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/opening/closed-days?_=" + Date.now());
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch closed days: ${res.status}, ${errorText}`
        );
      }
      const data = await res.json();
      console.log("Raw API response for closed days:", data);
      const normalizedDates = data
        .map((date, index) => {
          if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            console.warn(`Invalid date at index ${index}:`, date);
            return null;
          }
          return date;
        })
        .filter((date) => date !== null);
      console.log("Normalized closedDays:", normalizedDates);
      set({ closedDays: normalizedDates, loading: false });
    } catch (error) {
      console.error("Error fetching closed days:", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchOpeningHours: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/opening/hours");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch opening hours: ${res.status}, ${errorText}`
        );
      }
      const data = await res.json();
      console.log("Fetched opening hours:", data);
      set({
        openingHours: data,
        loading: false,
        selectedDays: data,
      });
    } catch (error) {
      console.error("Error fetching opening hours:", error);
      set({ loading: false, error: error.message });
    }
  },

  changeOpeningHours: async (days) => {
    set({ loading: true, error: null });
    try {
      console.log("Sending opening hours:", days);
      const res = await fetch("/api/opening/change-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(days),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to update opening hours: ${res.status}, ${errorText}`
        );
      }
      await res.json();
      set({ loading: false });
    } catch (error) {
      console.error("Error updating opening hours:", error);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  closeDay: async (date) => {
    try {
      console.log("Closing day:", date);
      const res = await fetch("/api/opening/close-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to close day: ${res.status}, ${errorText}`);
      }
      set((state) => {
        const updatedClosedDays = [...state.closedDays, date];
        console.log("Updated closedDays after closeDay:", updatedClosedDays);
        return { closedDays: updatedClosedDays };
      });
    } catch (error) {
      console.error("Error closing day:", error);
      throw error;
    }
  },

  openDay: async (date) => {
    try {
      console.log("Opening day:", date);
      const res = await fetch("/api/opening/open-day", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to open day: ${res.status}, ${errorText}`);
      }
      set((state) => {
        const updatedClosedDays = state.closedDays.filter((d) => d !== date);
        console.log("Updated closedDays after openDay:", updatedClosedDays);
        return { closedDays: updatedClosedDays };
      });
    } catch (error) {
      console.error("Error opening day:", error);
      throw error;
    }
  },
}));
