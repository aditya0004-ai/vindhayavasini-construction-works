const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      required: [true, "Project status is required"],
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Ongoing",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    // Main/cover image shown on cards & hero areas
    image: {
      url: { type: String, required: [true, "Project image is required"] },
      publicId: { type: String, required: true }, // Cloudinary public_id, needed to delete/replace later
    },
    // Optional additional gallery images
    gallery: [
      {
        url: String,
        publicId: String,
      },
    ],
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((h) => typeof h === "string" && h.trim().length > 0),
        message: "Highlights must be non-empty strings",
      },
    },
    // Layout plan is typically a single image or PDF
    layoutPlan: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    order: {
      type: Number,
      default: 0, // used to control display order on the site
    },
    isPublished: {
      type: Boolean,
      default: true, // lets you save a draft without showing it on the live site
    },
  },
  { timestamps: true }
);

// Auto-generate a URL-safe slug from the name if one isn't provided
ProjectSchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

module.exports = mongoose.model("Project", ProjectSchema);