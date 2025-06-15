import React, { useCallback, useEffect, useState } from "react";
import "./Dashboard.css";
import {
  createJobApp,
  deleteJobApp,
  getJobApps,
  updateJobApp,
} from "../../services/job-app-service";
import { FaPlus } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import JobFilters from "../../components/job-apps/JobAppsFilters";
import JobAppsTable from "../../components/job-apps/JobAppsTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobAppSchema } from "../../validations/JobAppSchema";
import { formatDateForInput } from "../../utils/helpers";
import JobAppModal from "../../components/job-apps/JobAppModal";
import Loader from "../../components/shared/Loader/Loader";
import { useToast } from "../../context/ToastContext";
import Summary from "../../components/Dashboard/Summary/Summary";

const Dashboard = () => {
  const form = useForm({
    resolver: yupResolver(jobAppSchema),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";
  const sortOption = searchParams.get("sort") || "latest";
  const searchQuery = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [jobApps, setJobApps] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJobApp, setSelectedJobApp] = useState(null);

  const { showToast } = useToast();

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
        if (key !== "page") {
          params.set("page", 1);
        }
      } else {
        params.delete(key);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    if (selectedJobApp) {
      form.reset({
        ...selectedJobApp,
        dateApplied: formatDateForInput(selectedJobApp?.dateApplied),
      });
    }
  }, [selectedJobApp, form]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParam("search", debouncedSearchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, updateParam]);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getJobApps({
        status: statusFilter,
        sort: sortOption,
        search: searchQuery,
        page,
      });
      setJobApps(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, sortOption, searchQuery, page]);

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, sortOption, searchQuery, page, fetchJobs]);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (modalType === "add") {
        await createJobApp(data);
      } else if (modalType === "edit") {
        await updateJobApp(selectedJobApp._id, data);
      }
      showToast(
        `Job application ${
          modalType === "add" ? "added" : "updated"
        } successfully`
      );
      fetchJobs();
    } catch (err) {
      showToast(
        `Error ${modalType === "add" ? "adding" : "updating"} job application`,
        "error"
      );
      console.error(err);
    } finally {
      handleCloseModal();
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteJobApp(selectedJobApp._id);
      showToast("Job application deleted successfully");
      fetchJobs();
    } catch (err) {
      showToast("Error deleting job application", "error");
      console.error(err);
    } finally {
      handleCloseModal();
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedJobApp(null);
    form.reset({
      company: "",
      role: "",
      dateApplied: new Date().toISOString().split("T")[0],
      status: "",
      notes: "",
    });
  };

  return (
    <div className="dashboard container">
      <Summary />
      <div className="dashboard-header flex-between">
        <JobFilters
          statusFilter={statusFilter}
          sortOption={sortOption}
          updateParam={updateParam}
          debouncedSearchQuery={debouncedSearchQuery}
          setDebouncedSearchQuery={setDebouncedSearchQuery}
        />
        <button className="btn" onClick={() => setModalType("add")}>
          <FaPlus /> Add Job App
        </button>
      </div>
      {isLoading ? (
        <Loader color="var(--primary-color)" />
      ) : (
        <JobAppsTable
          jobApps={jobApps}
          totalPages={totalPages}
          currentPage={currentPage}
          updateParam={updateParam}
          setSelectedJobApp={setSelectedJobApp}
          setModalType={setModalType}
        />
      )}
      <JobAppModal
        modalType={modalType}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        form={form}
        isLoading={isLoading}
        selectedJobAppCompany={selectedJobApp?.company}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
