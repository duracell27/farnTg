import axios from "axios";
import { create } from "zustand";

// Хранилище полей
export const useFields = create((set) => ({
  taps: 0,
  fields: null,
  getUserFields: async (userId) => {
    try {
      const response = await axios.get("/api/fields", {
        params: { userId },
      });
      if (response.status === 200) {
        set({ fields: response.data.fields });
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  plantField: async (cropId, fieldId, userId, type) => {
    try {
      const response = await axios.post("/api/fields", {
        userId,
        cropId,
        fieldId,
        type
      });
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  harvestField: async (cropId, fieldId, userId, type) => {
    try {
      const response = await axios.post("/api/fields", {
        userId,
        cropId,
        fieldId,
        type
      });
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  updateField: async (fieldId, userId, amount) => {
    try {
      const response = await axios.put(`/api/fields/`, {
        fieldId, userId, amount
      });
    } catch (error) {
      console.error("Failed to update field:", error);
    }
  }
}));
// // Хранилище склада
export const useWerehouse = create((set) => ({
  silo: null,

  getUserSilo: async (userId) => {
    try {
      const response = await axios.get("/api/werehouse", {
        params: { userId },
      });
      if (response.status === 200) {
        set({ silo: response.data.silo });
      }
    } catch (error) {
      console.error("Failed to fetch user werehouse:", error);
    }
  },
}))

// культури
export const useCrops = create((set) => ({
  crops: null,
  getCrops: async () => {
    try {
      const response = await axios.get("/api/crops");
      if (response.status === 200) {
        set({ crops: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
}));
