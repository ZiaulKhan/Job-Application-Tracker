const express = require("express");
const router = express.Router();
const {
  getJobApps,
  createJobApp,
  updateJobApp,
  deleteJobApp,
} = require("../controllers/jobAppController");

router.get("/", getJobApps);
router.post("/", createJobApp);

router.put("/:id", updateJobApp);
router.delete("/:id", deleteJobApp);

module.exports = router;
