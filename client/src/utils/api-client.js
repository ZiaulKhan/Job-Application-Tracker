import axios from "axios";
import { getToken } from "../utils/helpers";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

apiClient.interceptors.request.use((req) => {
  const token = getToken();
  if (token) req.headers.auth = token;
  return req;
});

export default apiClient;
