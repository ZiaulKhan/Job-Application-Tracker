import * as yup from "yup";

export const jobAppSchema = yup.object({
  company: yup.string().required("Company is required"),
  role: yup.string().required("Role is required"),
  status: yup.string().required("Status is required"),
  dateApplied: yup.string().required("Date is required"),
});
