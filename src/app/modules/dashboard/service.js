import http from "@core/axios";

export const getDashboard = async () => {
  const { data } = await http.get("/dashboard");
  return data;
};
