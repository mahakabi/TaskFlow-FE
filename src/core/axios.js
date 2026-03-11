import axios from "axios";
import config from "@config";

const instance = axios.create({
  baseURL: config.api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
instance.interceptors.request.use((req) => {
  const token = localStorage.getItem(config.token_key);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle 401 globally — token expired or invalid
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(config.token_key);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
