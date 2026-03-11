import http from "@core/axios";

export const getTasksByProject = async (projectId, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.priority) params.append("priority", filters.priority);
  const { data } = await http.get(`/projects/${projectId}/tasks?${params}`);
  return data;
};

export const createTask = async (projectId, payload) => {
  const { data } = await http.post(`/projects/${projectId}/tasks`, payload);
  return data;
};

export const updateTask = async (id, payload) => {
  const { data } = await http.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await http.delete(`/tasks/${id}`);
  return data;
};
