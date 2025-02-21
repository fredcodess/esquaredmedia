import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

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
      // You could update `bookings` if you want the newly created booking immediately available
      set((state) => ({
        bookings: [...state.bookings, res.data], // Assuming res.data is the new booking
        isBooking: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      set({ isBooking: false });
    }
  },

  // Fetch all bookings
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

  // Delete a booking
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
      const response = await fetch(
        "http://localhost:5001/api/customer/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deposit, email }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session.");
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("Stripe session URL is missing in the response.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Error redirecting to Stripe Checkout:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  },
}));

export default useBookingStore;
