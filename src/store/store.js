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
        type,
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
        type,
      });
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  updateField: async (fieldId, userId, amount) => {
    try {
      const response = await axios.put(`/api/fields/`, {
        fieldId,
        userId,
        amount,
      });
    } catch (error) {
      console.error("Failed to update field:", error);
    }
  },
}));
// // Хранилище склада
export const useWerehouse = create((set) => ({
  silo: null,
  werehouse:null,
  getUserWerehouse: async (userId) => {
    try {
      const response = await axios.get("/api/werehouse", {
        params: { userId },
      });
      if (response.status === 200) {
        set({ silo: response.data.silo });
        set({ werehouse: response.data.werehouse });
      }
    } catch (error) {
      console.error("Failed to fetch user werehouse:", error);
    }
  },
}));

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

// Виробництва
export const useProductionBuildings = create((set) => ({
  buildings: null,
  userBuildings: null,
  productsForBuilding: null,
  getBuildings: async () => {
    try {
      const response = await axios.get("/api/productionBuildings");
      if (response.status === 200) {
        set({ buildings: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  updateSlotTaps: async (productionId, index, userId) => {
    console.log("Updating");
    try {
      const response = await axios.put("/api/production/forbuilding", {
        productionId,
        index,
      });
      if (response.status === 200) {
        const getUserBuildings =
          useProductionBuildings.getState().getUserBuildings;
        getUserBuildings(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },

  chooseProductToProduce: async (
    userId,
    productId,
    productionId,
    slotIndex
  ) => {
    
    try {
      const response = await axios.post("/api/production/forbuilding", {
        userId,
        productId,
        productionId,
        slotIndex,
      });
      if (response.status === 200) {
        const getUserBuildings =
          useProductionBuildings.getState().getUserBuildings;
        getUserBuildings(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  getUserBuildings: async (userId) => {
    try {
      const response = await axios.get("/api/production", {
        params: { userId },
      });
      if (response.status === 200) {
        set({ userBuildings: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  getProductsForBuilding: async (type) => {
    try {
      const response = await axios.get("/api/production/forbuilding", {
        params: { type },
      });
      if (response.status === 200) {
        set({ productsForBuilding: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  buildBuilding: async (userId, type) => {
    try {
      const response = await axios.post("/api/production", {
        userId,
        type,
      });
      if (response.status === 200) {
        const getUserBuildings =
          useProductionBuildings.getState().getUserBuildings;
        getUserBuildings(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
  collectProductToWerehouse: async (productionId, productId, slotId, amount,userId) => {
    console.log('1')
    try {
      const response = await axios.put("/api/production", {
        productionId,
        productId,
        slotId,
        amount,
        userId
      });
      if (response.status === 200) {
        const getUserBuildings =
          useProductionBuildings.getState().getUserBuildings;
        getUserBuildings(userId);
      }
    } catch (error) {
      console.error("Failed to fetch user fields:", error);
    }
  },
}));
