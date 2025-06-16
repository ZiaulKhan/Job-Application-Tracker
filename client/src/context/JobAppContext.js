// JobAppContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getJobApps,
  createJobApp,
  updateJobApp,
  deleteJobApp,
  getJobSummary,
} from "../services/job-app-service";

const JobAppContext = createContext();

export const useJobApp = () => useContext(JobAppContext);

export const JobAppProvider = ({ children }) => {
  const [jobApps, setJobApps] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    sort: "latest",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchJobApps = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = await getJobApps(filters);
      setJobApps(res.data.data);
      setPagination({
        total: res.data.total,
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Failed to fetch job apps", err);
    } finally {
      setLoadingJobs(false);
    }
  }, [filters]);

  const fetchSummary = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const res = await getJobSummary();
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary", err);
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  useEffect(() => {
    fetchJobApps();
    fetchSummary();
  }, [fetchJobApps, fetchSummary]);

  const addJobApp = async (payload) => {
    await createJobApp(payload);
    fetchJobApps();
    fetchSummary();
  };

  const editJobApp = async (id, payload) => {
    await updateJobApp(id, payload);
    fetchJobApps();
    fetchSummary();
  };

  const removeJobApp = async (id) => {
    await deleteJobApp(id);
    fetchJobApps();
    fetchSummary();
  };

  return (
    <JobAppContext.Provider
      value={{
        jobApps,
        summary,
        filters,
        setFilters,
        pagination,
        loadingJobs,
        loadingSummary,
        addJobApp,
        editJobApp,
        removeJobApp,
        fetchJobApps,
        fetchSummary,
      }}
    >
      {children}
    </JobAppContext.Provider>
  );
};
