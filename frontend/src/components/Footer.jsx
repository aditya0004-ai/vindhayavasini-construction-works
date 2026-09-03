import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const companyLinks = [
    "Projects",
    "About",
    "Legacy",
    "Blogs",
    "Careers",
    "Contact",
  ];

  const developmentLinks = [
    "BBD Green City",
    "Sunbreeze I",
    "Sunbreeze II (Phase I)",
    "Lotus Court",
    "Lotus Arcade",
  ];

  return (
    <footer className="relative bg-[#0c1427] text-white border-t-4 border-[#c49a32]">

      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 0.7px, transparent 0.7px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-[1300px] mx-auto px-5">

        {/* ================= MAIN FOOTER ================= */}
        <div className="py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">

            {/* ================= COMPANY INFO ================= */}
            <div className="lg:pr-10">

              <div className="flex items-center gap-5 mb-8">

                <img
                  src="https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787849148/ChatGPT_Image_Aug_27_2026_09_45_36_AM_omywnd.png"
                  alt="Viraj Constructions"
                  className="w-[90px] h-auto object-contain"
                />

                <p className="text-[15px] leading-6 max-w-[330px]">
                  Engineering tomorrow’s skyline today. A legacy of
                  structural excellence since 1996.
                </p>

              </div>

              {/* Contact box */}
              <div className="border border-[#394153]">

                {/* Address */}
                <div className="flex items-start gap-5 p-5 border-b border-[#394153]">

                  <MapPin
                    size={21}
                    className="text-[#c49a32] shrink-0 mt-1"
                  />

                  <p className="text-[14px] leading-5 uppercase">
                    BBD Viraj Towers, Vibhuti Khand,
                    <br />
                    Gomti Nagar, Lucknow 226010
                  </p>

                </div>

                {/* Phone */}
                <div className="flex items-center gap-5 p-5 border-b border-[#394153]">

                  <Phone
                    size={20}
                    className="text-[#c49a32] shrink-0"
                  />

                  <a
                    href="tel:+919696333555"
                    className="text-[15px] hover:text-[#c49a32] transition"
                  >
                    +91 9696333555
                  </a>

                </div>

                {/* Email */}
                <div className="flex items-center gap-5 p-5">

                  <Mail
                    size={20}
                    className="text-[#c49a32] shrink-0"
                  />

                  <a
                    href="mailto:saleshead@virajconstructions.co.in"
                    className="text-[13px] font-semibold uppercase break-all hover:text-[#c49a32] transition"
                  >
                    saleshead@virajconstructions.co.in
                  </a>

                </div>

              </div>
            </div>


            {/* ================= COMPANY LINKS ================= */}
            <div className="lg:border-l lg:border-[#30394b] lg:pl-12">

              <FooterTitle title="COMPANY" />

              <ul className="mt-8 space-y-5">

                {companyLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[16px] hover:text-[#c49a32] transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}

              </ul>

            </div>


            {/* ================= DEVELOPMENTS ================= */}
            <div className="lg:pl-10">

              <FooterTitle title="DEVELOPMENTS" />

              <ul className="mt-8 space-y-5">

                {developmentLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[16px] hover:text-[#c49a32] transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}

              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-3 mt-7 text-[14px] tracking-[2px] text-[#c49a32] hover:text-white transition"
              >
                VIEW ALL PROJECTS
                <ArrowRight size={18} />
              </a>

            </div>


            {/* ================= PROJECT UPDATES ================= */}
            <div className="lg:border-l lg:border-[#30394b] lg:pl-10">

              <h3 className="text-[15px] tracking-[3px] text-[#c49a32]">
                PROJECT UPDATES
              </h3>

              <p className="mt-6 text-[15px] leading-7 max-w-[330px]">
                Subscribe to receive development news and
                architectural blueprints.
              </p>

              {/* Newsletter */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 flex h-[70px] border border-[#51596a] p-2"
              >

                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="flex-1 min-w-0 bg-transparent px-4 text-sm tracking-[1px] outline-none placeholder:text-[#8c93a0]"
                />

                <button
                  type="submit"
                  className="w-[55px] shrink-0 bg-[#c49a32] text-[#0c1427] flex items-center justify-center hover:bg-[#d5ad45] transition"
                >
                  <ArrowRight size={21} />
                </button>

              </form>


              {/* Connect */}
              <h3 className="mt-14 text-[15px] tracking-[3px] text-[#c49a32]">
                CONNECT
              </h3>

              <div className="flex gap-3 mt-6">

                <SocialButton href="#" icon="f" />

                <SocialButton href="#" icon="◎" />

                <SocialButton href="#" icon="𝕏" />

                <SocialButton href="#" icon="in" />

                <SocialButton href="#" icon="▶" />

              </div>

            </div>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}
        <div className="border-t border-[#30394b]" />


        {/* ================= BOTTOM FOOTER ================= */}
        <div className="py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Copyright */}
          <div>

            <p className="text-[15px] font-semibold tracking-[1px]">
              © 2026 VINDHAYAVASINI CONSTRUCTIONS PVT. LTD.
            </p>

            <p className="mt-3 text-[13px] tracking-[2px] text-[#c49a32]">
              BUILT WITH PRECISION. DELIVERED WITH EXCELLENCE.
            </p>

          </div>


          {/* Certificates */}
          <div className="flex flex-col lg:items-end gap-3">

            <div className="flex flex-wrap gap-3">

              <span className="border border-[#4c5567] bg-[#182238] px-4 py-2 text-[12px]">
                RERA: UPREAPR11196
              </span>

              <span className="border border-[#4c5567] bg-[#182238] px-4 py-2 text-[12px]">
                CIN: U45201UP2005PTC030895
              </span>

            </div>

            <p className="text-[12px] tracking-[1px] text-white/70">
              ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 CERTIFIED
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
};


/* =========================================
   FOOTER TITLE
========================================= */

const FooterTitle = ({ title }) => {
  return (
    <h3 className="flex items-center gap-4 text-[15px] tracking-[3px] text-[#c49a32]">
      <span className="w-[10px] h-[10px] bg-[#c49a32] block" />
      {title}
    </h3>
  );
};


/* =========================================
   SOCIAL BUTTON
========================================= */

const SocialButton = ({ href, icon }) => {
  return (
    <a
      href={href}
      className="w-[50px] h-[50px] border border-[#4b5466] bg-[#151e31] flex items-center justify-center text-white hover:bg-[#c49a32] hover:text-[#0c1427] hover:border-[#c49a32] transition"
    >
      <span className="text-[17px] font-semibold">
        {icon}
      </span>
    </a>
  );
};


export default Footer;