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
      console.log("Creating booking with data:", data);
      const res = await axiosInstance.post("/customer/booking", data);
      console.log("Booking response:", res.data);
      toast.success("Booking created successfully!");
      set((state) => ({
        bookings: [...state.bookings, res.data],
        isBooking: false,
      }));
      // Automatically send confirmation email after booking
      if (!res.data._id) {
        console.error("Booking ID missing in response:", res.data);
        toast.error(
          "Booking created, but failed to send confirmation email: No booking ID"
        );
        return;
      }
      console.log(
        "Triggering sendConfirmationEmail for booking ID:",
        res.data._id
      );
      await useBookingStore.getState().sendConfirmationEmail(res.data._id);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during booking";
      console.error("Booking error:", error);
      toast.error(`Booking failed: ${errorMessage}`);
      set({ isBooking: false });
    }
  },

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/manage-bookings");
      console.log("Fetch bookings response:", response.data);
      set({ bookings: response.data.message, loading: false });
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch bookings";
      console.error("Fetch bookings error:", error);
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  sendEmailResponse: async (id, response) => {
    set({ loading: true, error: null });
    try {
      console.log("Sending email response for booking ID:", id);
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
      console.error("Send email response error:", error);
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  sendConfirmationEmail: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log("Sending confirmation email for booking ID:", id);
      const response = await axiosInstance.post(
        `/customer/send-confirmation/${id}`
      );
      console.log("Send confirmation email response:", response.data);
      set({ loading: false });
      toast.success("Confirmation email sent successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send confirmation email";
      console.error("Send confirmation email error:", {
        message: errorMessage,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
      });
      toast.error(`Failed to send confirmation email: ${errorMessage}`);
      set({ error: errorMessage, loading: false });
    }
  },

  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log("Deleting booking ID:", id);
      await axiosInstance.delete(`/admin/manage-bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== id),
        loading: false,
      }));
      toast.success("Booking deleted successfully");
    } catch (error) {
      const errorMessage = error.message || "Failed to delete booking";
      console.error("Delete booking error:", error);
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },

  handleCheckout: async (deposit, email) => {
    try {
      console.log(
        "Initiating checkout with deposit:",
        deposit,
        "email:",
        email
      );
      const response = await axiosInstance.post(
        "/customer/create-checkout-session",
        { deposit, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Checkout response:", response.data);
      const data = response.data;
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
