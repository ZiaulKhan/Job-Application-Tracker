const { ZodError } = require("zod");

function validate(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.errors,
        });
      }
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = validate;
