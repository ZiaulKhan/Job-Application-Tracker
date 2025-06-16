import React from "react";
import Modal from "../shared/Modal/Modal";
import JobAppForm from "./JobAppForm";
import Loader from "../shared/Loader/Loader";

const JobAppModal = ({
  modalType,
  handleCloseModal,
  handleSubmit,
  form,
  isLoading,
  selectedJobAppCompany,
  handleDelete,
}) => {
  // console.log(isLoading);
  return (
    <Modal
      title={
        modalType === "edit"
          ? "Edit Job Application"
          : modalType === "delete"
          ? "Delete Job Application"
          : "Add Job Application"
      }
      onClose={handleCloseModal}
      isOpen={modalType !== null}
    >
      {modalType !== "delete" ? (
        <JobAppForm
          form={form}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isSubmitting={isLoading}
        />
      ) : (
        <div className="delete-modal">
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedJobAppCompany}</strong> job application?
          </p>
          <div className="modal-actions flex-end">
            <button onClick={handleCloseModal} className="btn btn-cancel">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn "
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex-center">
                  <Loader color="#fff" size="1rem" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default JobAppModal;
