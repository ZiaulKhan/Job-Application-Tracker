import React from "react";
import "./Summary.css";
import { useJobApp } from "../../../context/JobAppContext";

const Summary = () => {
  const { summary, loadingSummary } = useJobApp();

  if (loadingSummary) {
    return (
      <div className="summary-cards">
        {[...Array(5)].map((_, idx) => (
          <div className="summary-card skeleton" key={idx}>
            <div className="skeleton-text"></div>
            <div className="skeleton-number"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!summary) return <p className="error-message">Failed to load data.</p>;

  const cards = [
    {
      label: "Total",
      value: summary.total,
      color: "#8b5cf6",
    },
    {
      label: "Applied",
      value: summary.applied,
      color: "#3b82f6",
    },
    {
      label: "Interview Scheduled",
      value: summary.interview,
      color: "#f59e0b",
    },
    {
      label: "Rejected",
      value: summary.rejected,
      color: "#ef4444",
    },
    {
      label: "Offer Received",
      value: summary.offer,
      color: "#10b981",
    },
  ];

  return (
    <div className="summary-container">
      <div className="summary-cards">
        {cards.map((card) => (
          <div
            className="summary-card"
            key={card.label}
            style={{ "--card-color": card.color }}
            aria-label={`${card.label}: ${card.value}`}
          >
            <h3>{card.label}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
