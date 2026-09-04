const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
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
    department: {
      type: String,
      trim: true,
      default: null, // e.g. "Site Engineering", "Sales", "Accounts"
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    experience: {
      type: String,
      trim: true,
      default: null, // free text, e.g. "2-4 years"
    },
    // Short summary of what the role involves
    roleOverview: {
      type: String,
      required: [true, "Role overview is required"],
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((r) => typeof r === "string" && r.trim().length > 0),
        message: "Responsibilities must be non-empty strings",
      },
    },
    requirements: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((r) => typeof r === "string" && r.trim().length > 0),
        message: "Requirements must be non-empty strings",
      },
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true, // lets you save a draft opening before it goes live
    },
  },
  { timestamps: true }
);

// Auto-generate a URL-safe slug from the title if one isn't provided
JobSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

module.exports = mongoose.model("Job", JobSchema);