import React, { useEffect, useState, useCallback } from "react";
import "./Dashboard.css";
import { FaPlus } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobAppSchema } from "../../validations/JobAppSchema";
import { formatDateForInput } from "../../utils/helpers";

import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useJobApp } from "../../context/JobAppContext";

import JobFilters from "../../components/job-apps/JobAppsFilters";
import JobAppsTable from "../../components/job-apps/JobAppsTable";
import JobAppModal from "../../components/job-apps/JobAppModal";
import Summary from "../../components/Dashboard/Summary/Summary";
import Loader from "../../components/shared/Loader/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    jobApps,
    pagination,
    fetchJobApps,
    addJobApp,
    editJobApp,
    removeJobApp,
    loadingJobs,
    setFilters,
  } = useJobApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const [modalType, setModalType] = useState(null);
  const [modalActionLoading, setModalActionLoading] = useState(false);
  const [selectedJobApp, setSelectedJobApp] = useState(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const form = useForm({
    resolver: yupResolver(jobAppSchema),
  });

  const statusFilter = searchParams.get("status") || "all";
  const sortOption = searchParams.get("sort") || "latest";
  const searchQuery = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

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

  useEffect(() => {
    setFilters({
      status: statusFilter,
      sort: sortOption,
      search: searchQuery,
      page,
    });
  }, [statusFilter, sortOption, searchQuery, page, setFilters]);

  const handleSubmit = async (data) => {
    setModalActionLoading(true);
    try {
      if (modalType === "add") {
        await addJobApp(data);
      } else if (modalType === "edit") {
        await editJobApp(selectedJobApp._id, data);
      }
      showToast(
        `Job application ${
          modalType === "add" ? "added" : "updated"
        } successfully`
      );
      fetchJobApps();
    } catch (err) {
      showToast(
        `Error ${modalType === "add" ? "adding" : "updating"} job application`,
        "error"
      );
      console.error(err);
    } finally {
      handleCloseModal();
      setModalActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setModalActionLoading(true);
    try {
      await removeJobApp(selectedJobApp._id);
      showToast("Job application deleted successfully");
      fetchJobApps();
    } catch (err) {
      showToast("Error deleting job application", "error");
      console.error(err);
    } finally {
      handleCloseModal();
      setModalActionLoading(false);
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
      <p className="dashboard-user-name">
        Hello, {user?.name?.split(" ")[0] || "User"}!
      </p>

      <div className="dashboard-header">
        <p className="dashboard-header-title">Summary</p>
        <Summary />
      </div>

      <div className="table-header flex-between">
        <p className="dashboard-header-title">Job Applications</p>
        <button className="btn btn-small" onClick={() => setModalType("add")}>
          <FaPlus /> Add New
        </button>
      </div>

      <JobFilters
        statusFilter={statusFilter}
        sortOption={sortOption}
        updateParam={updateParam}
        debouncedSearchQuery={debouncedSearchQuery}
        setDebouncedSearchQuery={setDebouncedSearchQuery}
      />

      {loadingJobs ? (
        <div className="loader-wrapper">
          <Loader color="var(--primary-color)" />
        </div>
      ) : (
        <JobAppsTable
          jobApps={jobApps}
          pagination={pagination}
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
        isLoading={modalActionLoading}
        selectedJobAppCompany={selectedJobApp?.company}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
