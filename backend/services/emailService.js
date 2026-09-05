const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInquiryEmail = async ({
  fullName,
  email,
  phone,
  message,
}) => {
  try {
    await transporter.sendMail({
      from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,

      to: process.env.ADMIN_EMAIL,

      replyTo: email,

      subject: `New Inquiry from ${fullName}`,

      html: `
        <div style="
          max-width: 650px;
          margin: auto;
          font-family: Arial, sans-serif;
          border: 1px solid #e5e5e5;
          padding: 30px;
        ">
          
          <h2 style="
            color: #1d2738;
            margin-bottom: 25px;
          ">
            New Website Inquiry
          </h2>

          <div style="
            border-top: 1px solid #e5e5e5;
            padding-top: 20px;
          ">
            
            <p>
              <strong>Name:</strong>
              ${fullName}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: #f6f6f5;
              padding: 15px;
              border-left: 4px solid #b38b3d;
            ">
              ${message}
            </div>

          </div>

          <p style="
            margin-top: 30px;
            color: #777;
            font-size: 12px;
          ">
            This inquiry was submitted through your website.
          </p>

        </div>
      `,
    });

    console.log("Inquiry email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

module.exports = {
  sendInquiryEmail,
};