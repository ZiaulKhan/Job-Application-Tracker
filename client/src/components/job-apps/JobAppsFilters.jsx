import React from "react";

const JobFilters = ({
  statusFilter,
  sortOption,
  updateParam,
  debouncedSearchQuery,
  setDebouncedSearchQuery,
}) => {
  return (
    <div className="filter-group">
      <div className="filter-group-left">
        <select
          value={statusFilter}
          onChange={(e) => updateParam("status", e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview Scheduled</option>
          <option value="offer">Offer Received</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="filter-select"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <input
        className="filter-select search-input"
        type="text"
        placeholder="Search company or role"
        value={debouncedSearchQuery}
        onChange={(e) => {
          setDebouncedSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default JobFilters;
