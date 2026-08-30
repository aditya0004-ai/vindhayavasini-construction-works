const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// GET /api/projects — public, returns published projects only
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch projects.", error: err.message });
  }
};

// GET /api/projects/admin/all — admin only, returns everything including unpublished drafts
const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch projects.", error: err.message });
  }
};

// GET /api/projects/:slug — public, single project detail
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch project.", error: err.message });
  }
};

// POST /api/projects — admin only
// multipart/form-data fields: name, status, location, overview, highlights (JSON string array),
// order, isPublished, image (file), layoutPlan (file, optional), gallery (files, optional)
const createProject = async (req, res) => {
  try {
    const { name, status, location, overview, order, isPublished } = req.body;
    let { highlights } = req.body;

    if (highlights) {
      highlights = typeof highlights === "string" ? JSON.parse(highlights) : highlights;
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "A main project image is required." });
    }

    const imageFile = req.files.image[0];
    const layoutPlanFile = req.files.layoutPlan ? req.files.layoutPlan[0] : null;
    const galleryFiles = req.files.gallery || [];

    const project = await Project.create({
      name,
      status,
      location,
      overview,
      highlights: highlights || [],
      order: order || 0,
      isPublished: isPublished === undefined ? true : isPublished === "true" || isPublished === true,
      image: { url: imageFile.path, publicId: imageFile.filename },
      layoutPlan: layoutPlanFile
        ? { url: layoutPlanFile.path, publicId: layoutPlanFile.filename }
        : { url: null, publicId: null },
      gallery: galleryFiles.map((f) => ({ url: f.path, publicId: f.filename })),
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "A project with this name/slug already exists." });
    }
    res.status(400).json({ success: false, message: "Failed to create project.", error: err.message });
  }
};

// PUT /api/projects/:id — admin only, partial updates supported
// If new image/layoutPlan files are sent, old Cloudinary assets are deleted
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const { name, status, location, overview, order, isPublished } = req.body;
    let { highlights } = req.body;

    if (name !== undefined) project.name = name;
    if (status !== undefined) project.status = status;
    if (location !== undefined) project.location = location;
    if (overview !== undefined) project.overview = overview;
    if (order !== undefined) project.order = order;
    if (isPublished !== undefined) project.isPublished = isPublished === "true" || isPublished === true;

    if (highlights !== undefined) {
      project.highlights = typeof highlights === "string" ? JSON.parse(highlights) : highlights;
    }

    // Replace main image if a new one was uploaded
    if (req.files && req.files.image) {
      if (project.image.publicId) {
        await cloudinary.uploader.destroy(project.image.publicId).catch(() => {});
      }
      const imageFile = req.files.image[0];
      project.image = { url: imageFile.path, publicId: imageFile.filename };
    }

    // Replace layout plan if a new one was uploaded
    if (req.files && req.files.layoutPlan) {
      if (project.layoutPlan.publicId) {
        await cloudinary.uploader.destroy(project.layoutPlan.publicId).catch(() => {});
      }
      const layoutPlanFile = req.files.layoutPlan[0];
      project.layoutPlan = { url: layoutPlanFile.path, publicId: layoutPlanFile.filename };
    }

    // Append any new gallery images (doesn't remove existing ones)
    if (req.files && req.files.gallery) {
      const newGalleryImages = req.files.gallery.map((f) => ({ url: f.path, publicId: f.filename }));
      project.gallery.push(...newGalleryImages);
    }

    await project.save();
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to update project.", error: err.message });
  }
};

// DELETE /api/projects/:id — admin only, also removes associated Cloudinary assets
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const cleanupTasks = [];
    if (project.image.publicId) cleanupTasks.push(cloudinary.uploader.destroy(project.image.publicId));
    if (project.layoutPlan.publicId) cleanupTasks.push(cloudinary.uploader.destroy(project.layoutPlan.publicId));
    project.gallery.forEach((g) => {
      if (g.publicId) cleanupTasks.push(cloudinary.uploader.destroy(g.publicId));
    });
    await Promise.allSettled(cleanupTasks);

    await project.deleteOne();
    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete project.", error: err.message });
  }
};

// DELETE /api/projects/:id/gallery/:publicId — admin only, remove single gallery image
const deleteGalleryImage = async (req, res) => {
  try {
    const { id, publicId } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    await cloudinary.uploader.destroy(publicId).catch(() => {});
    project.gallery = project.gallery.filter((g) => g.publicId !== publicId);
    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete gallery image.", error: err.message });
  }
};

module.exports = {
  getProjects,
  getAllProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  deleteGalleryImage,
};