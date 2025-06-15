import apiClient from "../utils/api-client";

export const getJobApps = (params) => {
  return apiClient.get("/job-apps", { params });
};

export const createJobApp = (payload) => {
  return apiClient.post("/job-apps", payload);
};

export const updateJobApp = (id, payload) => {
  return apiClient.put(`/job-apps/${id}`, payload);
};

export const deleteJobApp = (id) => {
  return apiClient.delete(`/job-apps/${id}`);
};

export const getJobSummary = () => {
  return apiClient.get("/job-apps/summary");
};
