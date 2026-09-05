import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const SendInquiry = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setStatus({
        type: "",
        message: "",
      });

      const API_URL =
        import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${API_URL}/inquiries`,
        formData
      );

      if (response.data.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your inquiry has been sent successfully.",
        });

        // Reset Form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      }

    } catch (error) {
      console.error("Inquiry Error:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f6f5] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* LEFT SIDE IMAGE */}
          <div className="relative hidden min-h-[500px] items-center justify-center lg:flex">

            {/* Circle Design */}
            <div className="absolute left-8 top-8 h-[290px] w-[290px] rounded-full border border-[#b38b3d]/40" />

            <div className="absolute left-12 top-12 h-[270px] w-[270px] rounded-full border border-[#1d2738]/10" />

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
              alt="Luxury Architecture"
              className="relative z-10 h-[400px] w-[430px] object-cover opacity-90 grayscale"
            />

            {/* Overlay */}
            <div className="absolute z-20 h-[400px] w-[430px] bg-white/35" />

            {/* Decorative Lines */}
            <div className="absolute left-0 top-[55%] h-px w-full bg-[#b38b3d]/30" />

            <div className="absolute left-[20%] top-0 h-full w-px bg-[#1d2738]/10" />

            {/* Decorative Card */}
            <div className="absolute bottom-5 right-2 z-30 w-[180px] rotate-[-8deg] border border-[#b38b3d]/40 bg-[#f8f8f6]/95 p-5 shadow-lg">

              <p className="text-[8px] font-bold tracking-[0.25em] text-[#a47b2c]">
                SEND INQUIRY
              </p>

              <div className="mt-4 h-px bg-[#1d2738]/10" />

              <div className="mt-4 flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b38b3d] text-[#b38b3d]">
                  V
                </div>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="w-full">

            {/* Badge */}
            <div className="mb-12 inline-flex items-center gap-3 border border-[#1d2738]/50 px-7 py-2.5">

              <Mail
                size={16}
                strokeWidth={1.5}
                className="text-[#b38b3d]"
              />

              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#1d2738]">
                GET IN TOUCH
              </span>

            </div>


            {/* Heading */}
            <h2 className="font-elsie text-[42px] leading-tight text-[#1d2738] md:text-[52px]">
              Send an{" "}
              <span className="text-[#b38b3d]">
                Inquiry.
              </span>
            </h2>


            {/* Description */}
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-[#5b6470] md:text-[17px]">
              Fill out the form below and our real estate concierges will get
              back to you shortly.
            </p>


            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-9"
            >

              {/* Full Name */}
              <div>

                <label className="text-[13px] tracking-[0.08em] text-[#727b86]">
                  FULL NAME *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full border-b border-[#1d2738]/20 bg-transparent pb-3 text-[#1d2738] outline-none transition focus:border-[#b38b3d]"
                />

              </div>


              {/* Email + Phone */}
              <div className="grid gap-8 md:grid-cols-2">

                <div>

                  <label className="text-[13px] tracking-[0.08em] text-[#727b86]">
                    EMAIL ADDRESS *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full border-b border-[#1d2738]/20 bg-transparent pb-3 text-[#1d2738] outline-none transition focus:border-[#b38b3d]"
                  />

                </div>


                <div>

                  <label className="text-[13px] tracking-[0.08em] text-[#727b86]">
                    PHONE NUMBER *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full border-b border-[#1d2738]/20 bg-transparent pb-3 text-[#1d2738] outline-none transition focus:border-[#b38b3d]"
                  />

                </div>

              </div>


              {/* Message */}
              <div>

                <label className="text-[13px] tracking-[0.08em] text-[#727b86]">
                  YOUR MESSAGE *
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-3 w-full resize-none border-b border-[#1d2738]/20 bg-transparent pb-3 text-[#1d2738] outline-none transition focus:border-[#b38b3d]"
                />

              </div>


              {/* Success / Error Message */}

              {status.message && (
                <div
                  className={`border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-green-500/30 bg-green-50 text-green-700"
                      : "border-red-500/30 bg-red-50 text-red-600"
                  }`}
                >
                  {status.message}
                </div>
              )}


              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-5
                  bg-[#192234]
                  py-5
                  text-[12px]
                  font-semibold
                  tracking-[0.22em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#b38b3d]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >

                {loading
                  ? "SENDING..."
                  : "SUBMIT INQUIRY"}

                {!loading && (
                  <ArrowRight
                    size={19}
                    className="
                      text-[#c89b3c]
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                      group-hover:text-white
                    "
                  />
                )}

              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SendInquiry;