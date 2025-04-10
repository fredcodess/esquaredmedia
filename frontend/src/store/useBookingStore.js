import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import { toast } from "react-toastify";

const useBookingStore = create((set) => ({
  bookings: [], // Store all bookings
  loading: false, // Loading state
  error: null, // Error state
  isBooking: false, // Booking in progress state

  // Post Booking
  booking: async (data) => {
    set({ isBooking: true });
    try {
      const res = await axiosInstance.post("/customer/booking", data);
      toast.success("Booking created successfully!");
      set((state) => ({
        bookings: [...state.bookings, res.data],
        isBooking: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      set({ isBooking: false });
    }
  },

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/manage-bookings");
      set({ bookings: response.data.message, loading: false });
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch bookings";
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  sendEmailResponse: async (id, response) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(`/admin/email-respond/${id}`, { response });
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "Responded" } : booking
        ),
        loading: false,
      }));
      toast.success("Booking status updated successfully!");
    } catch (error) {
      const errorMessage = error.message || "Failed to update booking status";
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/manage-bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== id),
        loading: false,
      }));
      toast.success("Booking deleted successfully");
    } catch (error) {
      const errorMessage = error.message || "Failed to delete booking";
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  handleCheckout: async (deposit, email) => {
    try {
      const response = await axiosInstance.post(
        "/customer/create-checkout-session",
        { deposit, email }, // Data payload
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // Axios automatically parses JSON into response.data
      if (!data.url) {
        throw new Error("Stripe session URL is missing in the response.");
      }

      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error redirecting to Stripe Checkout:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  },
}));

export default useBookingStore;
