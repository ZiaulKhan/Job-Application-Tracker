import React from "react";
import "./Modal.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen = false, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex-between modal-header">
          <p className="modal-title">{title}</p>
          <FaTimes className="btn-close" onClick={onClose} />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
