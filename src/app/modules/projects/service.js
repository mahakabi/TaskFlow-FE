import http from "@core/axios";

export const getProjects = async () => {
  const { data } = await http.get("/projects");
  return data;
};

export const createProject = async ({ name, description }) => {
  const { data } = await http.post("/projects", { name, description });
  return data;
};

export const updateProject = async (id, { name, description }) => {
  const { data } = await http.put(`/projects/${id}`, { name, description });
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await http.delete(`/projects/${id}`);
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await http.get(`/projects/${id}`);
  return data;
};
