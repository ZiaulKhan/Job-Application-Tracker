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
      <select
        value={statusFilter}
        onChange={(e) => updateParam("status", e.target.value)}
        className="filter-select"
      >
        <option value="all">All</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
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
