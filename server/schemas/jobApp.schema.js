const { z } = require("zod");

const jobAppSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  dateApplied: z.string().min(1, "Date applied is required"),
  status: z.enum(["applied", "interview", "rejected", "offer"]),
  notes: z.string().optional(),
});

module.exports = jobAppSchema;
