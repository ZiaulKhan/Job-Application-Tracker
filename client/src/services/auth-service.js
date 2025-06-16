import apiClient from "../utils/api-client";

export const loginUser = (payload) => {
  return apiClient.post("/auth/login", payload);
};

export const registerUser = (payload) => {
  return apiClient.post("/auth/register", payload);
};
