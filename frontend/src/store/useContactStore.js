import { create } from "zustand";
import { axiosInstance } from "../config/axios";

const useContactStore = create((set) => ({
  contacts: [], // Store all contacts
  loading: false, // Loading state
  error: null, // Error state

  fetchContacts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/enquiries");
      set({ contacts: response.data.message, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  sendEmailResponse: async (id, response) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(`/admin/respond/${id}`, { response });
      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact._id === id ? { ...contact, status: "Responded" } : contact
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteContact: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/enquiries/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useContactStore;
