const express = require("express");
const {
  getProjects,
  getAllProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  deleteGalleryImage,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

const projectFileFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "layoutPlan", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

// Public routes — used by the live website
router.get("/", getProjects);

// Admin-only routes — used by the admin panel
// IMPORTANT: this must be declared before "/:slug" or Express will treat "admin" as a slug
router.get("/admin/all", protect, getAllProjectsAdmin);

router.get("/:slug", getProjectBySlug);

router.post("/", protect, projectFileFields, createProject);
router.put("/:id", protect, projectFileFields, updateProject);
router.delete("/:id", protect, deleteProject);
router.delete("/:id/gallery/:publicId", protect, deleteGalleryImage);

module.exports = router;