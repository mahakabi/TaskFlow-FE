import { create } from "zustand";

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (id, updated) =>
    set((state) => ({
      projects: state.projects.map((p) => (p._id === id ? updated : p)),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p._id !== id),
    })),
}));

export default useProjectStore;
