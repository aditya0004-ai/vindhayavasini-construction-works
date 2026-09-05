const { sendInquiryEmail } = require("../services/emailService");

const createInquiry = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      message,
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send Email
    await sendInquiryEmail({
      fullName,
      email,
      phone,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Inquiry sent successfully",
    });

  } catch (error) {
    console.error("Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again.",
    });
  }
};

module.exports = {
  createInquiry,
};