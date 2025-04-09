import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/api";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasHydrated: false, // ✅ NEW

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          console.log("✅ Logged in response", response); 
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        
          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Login failed",
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await axios.post(
            "https://labrecipebackend.onrender.com/api/v1/user/logout",
            {},
            { withCredentials: true }
          )
          set({ isAuthenticated: false }) // 🔥 This is the fix!
        } catch (error) {
          console.error("Logout failed:", error)
          throw error
        }
      },
      

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Registration failed",
          });
          throw error;
        }
      },

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // use setTimeout to ensure it's run after rehydration
        setTimeout(() => {
          useAuthStore.setState({ hasHydrated: true });
        }, 0);
      },
      
      
    }
  )
);
