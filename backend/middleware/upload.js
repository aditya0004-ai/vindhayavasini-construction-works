const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

/* =========================================
   CLOUDINARY STORAGE
========================================= */

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isLayoutPlan = file.fieldname === "layoutPlan";
    const isPDF = file.mimetype === "application/pdf";

    return {
      folder: isLayoutPlan
        ? "vindhayavasini-construction/layout-plans"
        : "vindhayavasini-construction/projects",

      allowed_formats: isLayoutPlan
        ? ["jpg", "jpeg", "png", "webp", "pdf"]
        : ["jpg", "jpeg", "png", "webp"],

      resource_type: isPDF ? "raw" : "image",
    };
  },
});

/* =========================================
   FILE FILTER
========================================= */

const fileFilter = (req, file, cb) => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const allowedTypes =
    file.fieldname === "layoutPlan"
      ? [...imageTypes, "application/pdf"]
      : imageTypes;

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        file.fieldname === "layoutPlan"
          ? "Unsupported file type. Use JPG, PNG, WEBP, or PDF."
          : "Unsupported file type. Use JPG, PNG, or WEBP."
      ),
      false
    );
  }
};

/* =========================================
   MULTER CONFIGURATION
========================================= */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = upload;