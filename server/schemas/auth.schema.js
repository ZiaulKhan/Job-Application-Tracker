const { z } = require("zod");

const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
});

module.exports = authSchema;
