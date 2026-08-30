const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Images go to one folder, layout plans (often PDFs or large diagrams) to another
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isLayoutPlan = file.fieldname === "layoutPlan";
    return {
      folder: isLayoutPlan ? "sanskar-construction/layout-plans" : "sanskar-construction/projects",
      allowed_formats: isLayoutPlan
        ? ["jpg", "jpeg", "png", "webp", "pdf"]
        : ["jpg", "jpeg", "png", "webp"],
      resource_type: isLayoutPlan && file.mimetype === "application/pdf" ? "raw" : "image",
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Use JPG, PNG, WEBP, or PDF."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;