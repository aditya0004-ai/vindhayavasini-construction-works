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
// multipart/form-data fields: name, status, category, location, liveLocation (optional),
// overview, highlights (JSON string array), order, isPublished,
// image (file), layoutPlan (up to 5 files, optional), gallery (files, optional)
const createProject = async (req, res) => {
  try {
    const { name, subHeading, status, category, location, liveLocation, overview, order, isPublished } = req.body;
    let { highlights } = req.body;

    if (highlights) {
      highlights = typeof highlights === "string" ? JSON.parse(highlights) : highlights;
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "A main project image is required." });
    }

    const imageFile = req.files.image[0];
    const layoutPlanFiles = req.files.layoutPlan || [];
    const galleryFiles = req.files.gallery || [];

    if (layoutPlanFiles.length > 5) {
      return res.status(400).json({ success: false, message: "You can add up to 5 layout plan images only." });
    }

    const project = await Project.create({
      name,
       subHeading: subHeading || "",
      status,
      category,
      location,
      liveLocation: liveLocation || null,
      overview,
      highlights: highlights || [],
      order: order || 0,
      isPublished: isPublished === undefined ? true : isPublished === "true" || isPublished === true,
      image: { url: imageFile.path, publicId: imageFile.filename },
      layoutPlan: layoutPlanFiles.map((f) => ({ url: f.path, publicId: f.filename })),
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

    const { name, subHeading, status, category, location, liveLocation, overview, order, isPublished, deletedGalleryPublicIds,
  deletedLayoutPlanPublicIds, } = req.body;
    let { highlights } = req.body;
    let galleryIdsToDelete = [];
let layoutPlanIdsToDelete = [];

try {
  galleryIdsToDelete = deletedGalleryPublicIds
    ? JSON.parse(deletedGalleryPublicIds)
    : [];

  layoutPlanIdsToDelete = deletedLayoutPlanPublicIds
    ? JSON.parse(deletedLayoutPlanPublicIds)
    : [];
} catch (error) {
  return res.status(400).json({
    success: false,
    message: "Invalid deleted image data.",
  });
}

    if (name !== undefined) project.name = name;
    if (subHeading !== undefined) project.subHeading = subHeading;
    if (status !== undefined) project.status = status;
    if (category !== undefined) project.category = category;
    if (location !== undefined) project.location = location;
    if (liveLocation !== undefined) project.liveLocation = liveLocation || null;
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

    // Append any new layout plan images (doesn't remove existing ones) — capped at 5 total.
    // To remove one, use DELETE /api/projects/:id/layout-plan/:publicId
   if (req.files && req.files.layoutPlan) {
  const incoming = req.files.layoutPlan;

  // Count layout plans after selected images are removed
  const remainingLayoutPlans = project.layoutPlan.filter(
    (img) => !layoutPlanIdsToDelete.includes(img.publicId)
  );

  if (remainingLayoutPlans.length + incoming.length > 5) {
    return res.status(400).json({
      success: false,
      message: "You can have up to 5 layout plan images only.",
    });
  }

  const newLayoutPlanImages = incoming.map((f) => ({
    url: f.path,
    publicId: f.filename,
  }));

  project.layoutPlan.push(...newLayoutPlanImages);
}

    // Append any new gallery images (doesn't remove existing ones)
    if (req.files && req.files.gallery) {
      const newGalleryImages = req.files.gallery.map((f) => ({ url: f.path, publicId: f.filename }));
      project.gallery.push(...newGalleryImages);
    }
    // Delete selected gallery images only when Save Changes is clicked
if (galleryIdsToDelete.length > 0) {
  for (const publicId of galleryIdsToDelete) {
    const galleryImage = project.gallery.find(
      (img) => img.publicId === publicId
    );

    if (galleryImage) {
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
  }

  project.gallery = project.gallery.filter(
    (img) => !galleryIdsToDelete.includes(img.publicId)
  );
}


// Delete selected layout plan images only when Save Changes is clicked
if (layoutPlanIdsToDelete.length > 0) {
  for (const publicId of layoutPlanIdsToDelete) {
    const layoutImage = project.layoutPlan.find(
      (img) => img.publicId === publicId
    );

    if (layoutImage) {
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
  }

  project.layoutPlan = project.layoutPlan.filter(
    (img) => !layoutPlanIdsToDelete.includes(img.publicId)
  );
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
    project.layoutPlan.forEach((lp) => {
      if (lp.publicId) cleanupTasks.push(cloudinary.uploader.destroy(lp.publicId));
    });
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
   const { id } = req.params;
const publicId = decodeURIComponent(req.params.publicId);
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

// DELETE /api/projects/:id/layout-plan/:publicId — admin only, remove single layout plan image
const deleteLayoutPlanImage = async (req, res) => {
  try {
   const { id } = req.params;
const publicId = decodeURIComponent(req.params.publicId);
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    await cloudinary.uploader.destroy(publicId).catch(() => {});
    project.layoutPlan = project.layoutPlan.filter((lp) => lp.publicId !== publicId);
    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete layout plan image.", error: err.message });
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
  deleteLayoutPlanImage,
};