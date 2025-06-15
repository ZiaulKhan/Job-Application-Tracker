import apiClient from "../utils/api-client";

export const login = (payload) => {
  return apiClient.post("/auth/login", payload);
};

export const register = (payload) => {
  return apiClient.post("/auth/register", payload);
};
