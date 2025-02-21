import { create } from "zustand";
import { axiosInstance } from "../config/axios.js";

const useImageStore = create((set) => ({
  image: null,
  isLoading: false,
  error: null,

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    set({ isLoading: true, error: null });

    try {
      console.log("Uploading image...", file);
      const { data } = await axiosInstance.post(
        "/customer/remove-bg",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Image processed successfully:", data);
      set({ image: data.image, isLoading: false });
    } catch (error) {
      console.error("Upload failed:", error);
      set({ error: "Failed to process image", isLoading: false });
    }
  },
}));

export default useImageStore;
