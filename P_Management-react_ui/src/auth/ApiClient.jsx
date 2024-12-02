import axios from "axios";

let token = null;

const apiClient = axios.create({
  baseURL: "http://localhost:8888/api/",
});

apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setToken = (newToken) => {
  token = newToken;
};

export default apiClient;
