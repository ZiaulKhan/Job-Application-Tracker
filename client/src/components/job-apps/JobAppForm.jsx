import React from "react";
import InputField from "../shared/Form/InputField";
import SelectField from "../shared/Form/SelectField";
import DatePickerField from "../shared/Form/DatePickerField";
import TextAreaField from "../shared/Form/TextAreaField";
import Loader from "../shared/Loader/Loader";

const JobAppForm = ({ form, onSubmit, isSubmitting, onClose }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="job-app-form">
      <InputField
        name="company"
        label="Company"
        inputProps={{ placeholder: "Enter company name" }}
        required
        form={form}
      />
      <InputField
        name="role"
        label="Role"
        inputProps={{ placeholder: "Enter role" }}
        required
        form={form}
      />

      <DatePickerField
        name="dateApplied"
        label="Date Applied"
        required
        form={form}
        datePickerProps={{
          max: new Date().toISOString().split("T")[0],
        }}
      />

      <SelectField
        name="status"
        label="Status"
        selectProps={{ placeholder: "Select status" }}
        required
        form={form}
        options={[
          { value: "applied", label: "Applied" },
          { value: "interview", label: "Interview Scheduled" },
          { value: "offer", label: "Offer Received" },
          { value: "rejected", label: "Rejected" },
        ]}
      />
      <TextAreaField
        name="notes"
        label="Notes"
        form={form}
        textareaProps={{ placeholder: "Enter notes" }}
      />
      <div className="modal-actions flex-end">
        <button type="button" className="btn btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn">
          {isSubmitting ? (
            <div className="flex-center">
              <Loader color="#fff" size="1rem" />
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default JobAppForm;
