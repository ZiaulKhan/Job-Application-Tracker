const express = require("express");
const router = express.Router();
const {
  getJobApps,
  createJobApp,
  updateJobApp,
  deleteJobApp,
  getJobSummary,
} = require("../controllers/jobAppController");
const jobAppSchema = require("../schemas/jobApp.schema");
const validate = require("../middlewares/validate");

router.get("/", getJobApps);
router.post("/", validate(jobAppSchema), createJobApp);

router.put("/:id", validate(jobAppSchema), updateJobApp);
router.delete("/:id", deleteJobApp);

router.get("/summary", getJobSummary);

module.exports = router;
