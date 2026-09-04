const Job = require("../models/Job");

// GET /api/jobs — public, published openings only
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs.", error: err.message });
  }
};

// GET /api/jobs/admin/all — admin only, everything including unpublished drafts
const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs.", error: err.message });
  }
};

// GET /api/jobs/:slug — public, single job detail
const getJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch job.", error: err.message });
  }
};

// POST /api/jobs — admin only
// JSON body: title, department, location, type, experience, roleOverview,
// responsibilities (array), requirements (array), order, isPublished
const createJob = async (req, res) => {
  try {
    const { title, department, location, type, experience, roleOverview, order, isPublished } = req.body;
    const responsibilities = Array.isArray(req.body.responsibilities) ? req.body.responsibilities : [];
    const requirements = Array.isArray(req.body.requirements) ? req.body.requirements : [];

    const job = await Job.create({
      title,
      department: department || null,
      location,
      type,
      experience: experience || null,
      roleOverview,
      responsibilities,
      requirements,
      order: order || 0,
      isPublished: isPublished === undefined ? true : Boolean(isPublished),
    });

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "A job with this title/slug already exists." });
    }
    res.status(400).json({ success: false, message: "Failed to create job.", error: err.message });
  }
};

// PUT /api/jobs/:id — admin only, partial updates supported
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const { title, department, location, type, experience, roleOverview, order, isPublished } = req.body;

    if (title !== undefined) job.title = title;
    if (department !== undefined) job.department = department || null;
    if (location !== undefined) job.location = location;
    if (type !== undefined) job.type = type;
    if (experience !== undefined) job.experience = experience || null;
    if (roleOverview !== undefined) job.roleOverview = roleOverview;
    if (order !== undefined) job.order = order;
    if (isPublished !== undefined) job.isPublished = Boolean(isPublished);
    if (Array.isArray(req.body.responsibilities)) job.responsibilities = req.body.responsibilities;
    if (Array.isArray(req.body.requirements)) job.requirements = req.body.requirements;

    await job.save();
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to update job.", error: err.message });
  }
};

// DELETE /api/jobs/:id — admin only
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }
    await job.deleteOne();
    res.status(200).json({ success: true, message: "Job deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete job.", error: err.message });
  }
};

module.exports = {
  getJobs,
  getAllJobsAdmin,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
};