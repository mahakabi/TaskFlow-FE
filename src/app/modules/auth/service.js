import http from "@core/axios";

export const register = async ({ name, email, password }) => {
  const { data } = await http.post("/auth/register", { name, email, password });
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await http.post("/auth/login", { email, password });
  return data;
};
