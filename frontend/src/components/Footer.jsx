
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";

const Footer = () => {
  const companyLinks = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const developmentLinks = [
    {
      name: "Police Line",
      href: "/projects/police-line-development-project",
    },
    {
      name: "Unitech Unihomes (Phase IV)",
      href: "/projects/sunitech-unihomes-phase-4",
    },
    {
      name: "Commissioner Office",
      href: "/projects/commissioner-office",
    },
    {
      name: "District Court",
      href: "/projects/district-court",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0c1427] text-white border-t-4 border-[#c49a32]">

      {/* ================= BACKGROUND PATTERN ================= */}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Decorative glow */}

      <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#c49a32]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* ================= MAIN FOOTER ================= */}

        <div className="py-14 lg:py-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">

            {/* ================= COMPANY INFO ================= */}

            <div className="lg:pr-10">

              {/* Logo + Description */}

              <div className="flex items-center gap-4 mb-8">

                <img
                  src="https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787849148/ChatGPT_Image_Aug_27_2026_09_45_36_AM_omywnd.png"
                  alt="Vindhayavasini Constructions"
                  className="w-[88px] h-auto object-contain"
                />

                <p className="text-[14px] leading-6 text-white/75 max-w-[230px]">
                  Engineering tomorrow’s skyline today.
                  A legacy of structural excellence since 1996.
                </p>

              </div>


              {/* Contact Box */}

              <div className="border border-white/15 bg-white/[0.025]">

                {/* Address */}

                <div className="flex items-start gap-4 p-5 border-b border-white/10">

                  <MapPin
                    size={20}
                    className="text-[#c49a32] shrink-0 mt-1"
                  />

                  <p className="text-[13px] leading-6 uppercase tracking-[0.4px] text-white/80">
                    Chhatnag Rd, Narayan Das ka Pura,
                    <br />
                    Jhusi, Prayagraj 211019
                  </p>

                </div>


                {/* Phone */}

                <div className="flex items-center gap-4 p-5 border-b border-white/10">

                  <Phone
                    size={19}
                    className="text-[#c49a32] shrink-0"
                  />

                  <a
                    href="tel:+919415664728"
                    className="text-[14px] text-white/85 hover:text-[#c49a32] transition-colors duration-300"
                  >
                    +91 9415664728
                  </a>

                </div>


                {/* Email */}

                <div className="flex items-center gap-4 p-5">

                  <Mail
                    size={19}
                    className="text-[#c49a32] shrink-0"
                  />

                  <a
                    href="mailto:ravimum82@gmail.com"
                    className="text-[13px] font-medium break-all text-white/85 hover:text-[#c49a32] transition-colors duration-300"
                  >
                    ravimum82@gmail.com
                  </a>

                </div>

              </div>

            </div>


            {/* ================= COMPANY LINKS ================= */}

            <div className="lg:border-l lg:border-white/10 lg:pl-12">

              <FooterTitle title="COMPANY" />

              <ul className="mt-8 space-y-4">

                {companyLinks.map((item) => (

                  <li key={item.name}>

                    <a
                      href={item.href}
                      className="group flex items-center gap-3 w-fit text-[14px] text-white/70 hover:text-[#c49a32] transition-colors duration-300"
                    >

                      <span className="w-0 h-px bg-[#c49a32] group-hover:w-4 transition-all duration-300" />

                      {item.name}

                    </a>

                  </li>

                ))}

              </ul>

            </div>


            {/* ================= DEVELOPMENTS ================= */}

            <div className="lg:pl-10">

              <FooterTitle title="DEVELOPMENTS" />

              <ul className="mt-8 space-y-4">

                {developmentLinks.map((item) => (

                  <li key={item.name}>

                    <a
                      href={item.href}
                      className="group flex items-start gap-3 w-fit text-[14px] leading-6 text-white/70 hover:text-[#c49a32] transition-colors duration-300"
                    >

                      <span className="w-0 h-px bg-[#c49a32] group-hover:w-4 shrink-0 mt-3 transition-all duration-300" />

                      {item.name}

                    </a>

                  </li>

                ))}

              </ul>


              {/* View All Projects */}

              <a
                href="/projects"
                className="group inline-flex items-center gap-3 mt-8 text-[12px] font-semibold tracking-[2px] text-[#c49a32] hover:text-white transition-colors duration-300"
              >

                VIEW ALL PROJECTS

                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />

              </a>

            </div>


            {/* ================= WHY CHOOSE US ================= */}

            <div className="lg:border-l lg:border-white/10 lg:pl-10">

              <h3 className="flex items-center gap-4 text-[14px] tracking-[3px] text-[#c49a32]">

                <span className="w-[10px] h-[10px] bg-[#c49a32] block shrink-0" />

                WHY CHOOSE US

              </h3>


              <p className="mt-6 text-[14px] leading-7 text-white/70 max-w-[300px]">

                Built on trust, driven by quality, and
                committed to creating spaces that stand
                the test of time.

              </p>


              {/* Feature 1 */}

              <div className="flex items-start gap-4 mt-7">

                <div className="w-10 h-10 shrink-0 border border-[#c49a32]/40 bg-[#c49a32]/10 flex items-center justify-center">

                  <Award
                    size={20}
                    className="text-[#c49a32]"
                  />

                </div>

                <div>

                  <h4 className="text-[14px] font-semibold text-white">

                    28+ Years of Experience

                  </h4>

                  <p className="text-[12px] leading-5 text-white/50 mt-1">

                    Expertise you can trust.

                  </p>

                </div>

              </div>


              {/* Feature 2 */}

              <div className="flex items-start gap-4 mt-5">

                <div className="w-10 h-10 shrink-0 border border-[#c49a32]/40 bg-[#c49a32]/10 flex items-center justify-center">

                  <ShieldCheck
                    size={20}
                    className="text-[#c49a32]"
                  />

                </div>

                <div>

                  <h4 className="text-[14px] font-semibold text-white">

                    Quality & Reliability

                  </h4>

                  <p className="text-[12px] leading-5 text-white/50 mt-1">

                    Precision in every project.

                  </p>

                </div>

              </div>


              {/* Feature 3 */}

              <div className="flex items-start gap-4 mt-5">

                <div className="w-10 h-10 shrink-0 border border-[#c49a32]/40 bg-[#c49a32]/10 flex items-center justify-center">

                  <Building2
                    size={20}
                    className="text-[#c49a32]"
                  />

                </div>

                <div>

                  <h4 className="text-[14px] font-semibold text-white">

                    Trusted Developments

                  </h4>

                  <p className="text-[12px] leading-5 text-white/50 mt-1">

                    Creating spaces for tomorrow.

                  </p>

                </div>

              </div>


              {/* CTA */}

              <a
                href="/contact"
                className="group inline-flex items-center gap-3 mt-8 border border-[#c49a32] px-5 py-3 text-[11px] tracking-[1.8px] font-semibold text-[#c49a32] hover:bg-[#c49a32] hover:text-[#0c1427] transition-all duration-300"
              >

                LET'S CONNECT

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />

              </a>

            </div>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="border-t border-white/10" />


        {/* ================= BOTTOM FOOTER ================= */}

        <div className="py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

          {/* Copyright */}

          <div>

            <p className="text-[13px] sm:text-[14px] font-semibold tracking-[0.8px] text-white/90">

              © 2026 VINDHAYAVASINI CONSTRUCTIONS PVT. LTD.

            </p>

            <p className="mt-3 text-[11px] sm:text-[12px] tracking-[2px] text-[#c49a32]">

              BUILT WITH PRECISION. DELIVERED WITH EXCELLENCE.

            </p>

          </div>


          {/* Certificates */}

          <div className="flex flex-col lg:items-end gap-3">

            <div className="flex flex-wrap gap-2">

              <span className="border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] text-white/70">

                RERA: UPREAPR11196

              </span>

              <span className="border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] text-white/70">

                CIN: U45201UP2005PTC030895

              </span>

            </div>

            <p className="text-[11px] tracking-[1px] text-white/50">

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

    <h3 className="flex items-center gap-4 text-[14px] tracking-[3px] text-[#c49a32]">

      <span className="w-[10px] h-[10px] bg-[#c49a32] block shrink-0" />

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
      className="w-[46px] h-[46px] border border-white/15 bg-white/[0.04] flex items-center justify-center text-white hover:bg-[#c49a32] hover:text-[#0c1427] hover:border-[#c49a32] transition-all duration-300"
    >

      <span className="text-[16px] font-semibold">

        {icon}

      </span>

    </a>

  );

};


export default Footer;