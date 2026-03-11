import { create } from "zustand";
import config from "@config";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(config.token_key) || null,
  isAuthenticated: !!localStorage.getItem(config.token_key),

  setAuth: (user, token) => {
    localStorage.setItem(config.token_key, token);
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem(config.token_key);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
