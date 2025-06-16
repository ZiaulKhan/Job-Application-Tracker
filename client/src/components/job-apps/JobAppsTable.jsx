import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";

const JobAppsTable = ({
  jobApps,
  pagination,
  updateParam,
  setSelectedJobApp,
  setModalType,
}) => {
  const { totalPages, currentPage } = pagination;

  if (jobApps.length === 0) {
    return <p className="no-jobs">No jobs found</p>;
  }

  return (
    <>
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobApps.map((job) => {
            const formattedDate = new Date(
              job.dateApplied || new Date()
            ).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <tr key={job._id}>
                <td title={job.company}>
                  {job.company.length > 15
                    ? job.company.slice(0, 12) + "..."
                    : job.company}
                </td>
                <td title={job.role}>
                  {job.role.length > 20
                    ? job.role.slice(0, 20) + "..."
                    : job.role}
                </td>
                <td>{formattedDate}</td>
                <td>
                  <span className={`status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td title={job.notes}>
                  {job.notes?.length > 15
                    ? job.notes.slice(0, 15) + "..."
                    : job.notes || "NA"}
                </td>
                <td>
                  <div className="flex-start">
                    <button
                      className="btn btn-small"
                      onClick={() => {
                        setSelectedJobApp(job);
                        setModalType("edit");
                      }}
                    >
                      <FaPen className="small-btn-icon" />
                    </button>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => {
                        setSelectedJobApp(job);
                        setModalType("delete");
                      }}
                    >
                      <FaTrash className="small-btn-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => updateParam("page", currentPage - 1)}
            className={`btn btn-small ${currentPage === 1 ? "disabled" : ""}`}
          >
            Prev
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => updateParam("page", currentPage + 1)}
            className={`btn btn-small ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default JobAppsTable;
