const express = require("express");

const {
  createInquiry,
} = require("../controllers/inquiryController");

const router = express.Router();


// Submit Inquiry
router.post("/", createInquiry);


module.exports = router;