import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: localStorage.getItem("taskflow_theme") || "light",

  toggleMode: () =>
    set((state) => {
      const next = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("taskflow_theme", next);
      return { mode: next };
    }),
}));

export default useThemeStore;
