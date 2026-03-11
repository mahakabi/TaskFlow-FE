import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  filters: { status: "", priority: "" },

  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),

  updateTask: (id, updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? updated : t)),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    })),
}));

export default useTaskStore;
