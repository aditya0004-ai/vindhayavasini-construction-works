const express = require("express");
const {
  getJobs,
  getAllJobsAdmin,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes — used by the careers page
router.get("/", getJobs);

// Admin-only routes — used by the admin panel
// IMPORTANT: this must be declared before "/:slug" or Express will treat "admin" as a slug
router.get("/admin/all", protect, getAllJobsAdmin);

router.get("/:slug", getJobBySlug);

router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;