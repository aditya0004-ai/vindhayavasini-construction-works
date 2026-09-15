
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  TreePine,
  ShieldCheck,
  ArrowRight,
  Download,
  Gem,
  ArrowUpDown,
  Eye,
  X,
  ExternalLink,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: "citizen-city",
    name: "CITIZEN CITY",
    title: "Citizen City",
    location: "NEW GOMTI NAGAR, AYODHYA ROAD, LUCKNOW",
    description:
      "Citizen City is a 318-acre integrated township in New Gomti Nagar, Lucknow, bringing together premium residences, commercial hubs, green spaces and modern infrastructure.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "318 Acres", label: "Township" },
      { icon: TreePine, value: "100 Acres", label: "Greenery" },
      { icon: ShieldCheck, value: "5 Km from High", label: "Court" },
    ],
  },
  {
    id: "subhalaya-1",
    name: "SUBHALAAY I",
    title: "Subhalaya I",
    location: "CITIZEN CITY, AYODHYA ROAD, LUCKNOW",
    description:
      "Subhalaya I is a premium residential development offering 2 & 3 BHK apartments and 4 BHK penthouses in Citizen City, featuring a sophisticated lifestyle with modern amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "2 & 3 BHK", label: "Apartments" },
      { icon: Gem, value: "4 BHK", label: "Penthouses" },
      { icon: ArrowUpDown, value: "Stilt + 14", label: "Floors" },
    ],
  },
  {
    id: "subhalaya-2",
    name: "SUBHALAAY II",
    title: "Subhalaya II",
    location: "CITIZEN CITY, AYODHYA ROAD, LUCKNOW",
    description:
      "Subhalaya II Phase I offers contemporary residences designed around comfort, connectivity and modern urban living.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "Premium", label: "Residences" },
      { icon: TreePine, value: "Green", label: "Landscape" },
      { icon: ShieldCheck, value: "Secure", label: "Community" },
    ],
  },
  {
    id: "lotus-court",
    name: "LOTUS COURT",
    title: "Lotus Court",
    location: "CITIZEN CITY, LUCKNOW",
    description:
      "Lotus Court is designed as an elegant residential destination combining spacious homes, greenery and thoughtfully planned surroundings.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "Premium", label: "Homes" },
      { icon: TreePine, value: "Green", label: "Spaces" },
      { icon: ShieldCheck, value: "Safe", label: "Living" },
    ],
  },
  {
    id: "lotus-arcade",
    name: "LOTUS ARCADE",
    title: "Lotus Arcade",
    location: "CITIZEN CITY, LUCKNOW",
    description:
      "Lotus Arcade brings commercial spaces and modern conveniences together in a strategically connected location.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "Modern", label: "Commercial" },
      { icon: TreePine, value: "Prime", label: "Location" },
      { icon: ShieldCheck, value: "Secure", label: "Premises" },
    ],
  },
  {
    id: "lotus-enclave",
    name: "LOTUS ENCLAVE",
    title: "Lotus Enclave",
    location: "CITIZEN CITY, LUCKNOW",
    description:
      "Lotus Enclave offers thoughtfully planned homes with a balance of contemporary architecture and peaceful surroundings.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    features: [
      { icon: Building2, value: "Premium", label: "Homes" },
      { icon: TreePine, value: "Beautiful", label: "Landscape" },
      { icon: ShieldCheck, value: "Secure", label: "Living" },
    ],
  },
];

/* =========================================================
   CONFIG
========================================================= */

const HEADER_HEIGHT = 80;
const TAB_HEIGHT = 64;

const BROCHURE_URL =
  "https://res.cloudinary.com/wcimdxco/image/upload/v1789465919/Vindhayavasini_Construction_Company_Profile.pdf";

const BROCHURE_DOWNLOAD_URL =
  "https://res.cloudinary.com/wcimdxco/image/upload/fl_attachment/Vindhayavasini_Construction_Company_Profile.pdf";

const LOGO_URL =
  "https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787848495/ChatGPT_Image_Aug_27_2026_02_30_52_AM_oyvtse.png";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
      delay: 0.05,
    },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
      mass: 0.9,
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: "blur(4px)",
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* =========================================================
   COMPONENT
========================================================= */

const ProjectSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [showBrochure, setShowBrochure] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  const projectRefs = useRef([]);
  const projectTabsRef = useRef(null);
  const closeButtonRef = useRef(null);

  /* -------------------------------------------------------
     OPEN / CLOSE BROCHURE
  ------------------------------------------------------- */

  const openBrochure = () => {
    setPdfLoading(true);
    setPdfError(false);
    setShowBrochure(true);
  };

  const closeBrochure = () => {
    setShowBrochure(false);
  };

  /* -------------------------------------------------------
     ESCAPE KEY + BODY SCROLL LOCK
  ------------------------------------------------------- */

  useEffect(() => {
    if (!showBrochure) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeBrochure();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [showBrochure]);

  /* -------------------------------------------------------
     FOCUS CLOSE BUTTON
  ------------------------------------------------------- */

  useEffect(() => {
    if (showBrochure) {
      closeButtonRef.current?.focus();
    }
  }, [showBrochure]);

  /* -------------------------------------------------------
     SCROLL ACTIVE TAB INTO VIEW
  ------------------------------------------------------- */

  useEffect(() => {
    if (!projectTabsRef.current) return;

    const activeTab = projectTabsRef.current.querySelector(
      `[data-project-tab="${activeProject}"]`
    );

    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeProject]);

  /* -------------------------------------------------------
     INTERSECTION OBSERVER
  ------------------------------------------------------- */

  useEffect(() => {
    const sections = projectRefs.current.filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          const index = Number(
            visible[0].target.getAttribute(
              "data-project-index"
            )
          );

          if (!Number.isNaN(index)) {
            setActiveProject(index);
          }
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${HEADER_HEIGHT + TAB_HEIGHT + 20}px 0px -35% 0px`,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  /* -------------------------------------------------------
     SCROLL TO PROJECT
  ------------------------------------------------------- */

  const scrollToProject = (index) => {
    const section = projectRefs.current[index];

    if (!section) return;

    setActiveProject(index);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <section className="bg-white mb-30">
      {/* TOP HEADING */}

      <div className="max-w-[1200px] mx-auto px-5 pt-16 pb-9">
        <div className="flex justify-center mb-8">
          <div className="border border-[#111827] px-5 py-2 flex items-center gap-2">
            <Building2
              size={17}
              strokeWidth={1.5}
              className="text-[#c49a32]"
            />

            <span className="text-[#111827] text-[15px] tracking-[3px] font-medium">
              OUR PROJECTS
            </span>
          </div>
        </div>

        <h2 className="text-center text-[#111827] font-elsie md:font-light text-[30px] md:text-[42px] lg:text-[55px] leading-tight">
          Addresses that define{" "}
          <span className="text-[#c49a32]">
            the city.
          </span>
        </h2>
      </div>

      {/* STICKY NAVIGATION */}

      <div
        className="sticky z-40 bg-white border-b border-[#eadfc6] shadow-[0_1px_0_rgba(196,154,50,0.35)]"
        style={{ top: HEADER_HEIGHT }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            ref={projectTabsRef}
            className="flex flex-nowrap overflow-x-auto scrollbar-hide lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => {
              const isActive = activeProject === index;

              return (
                <button
                  key={project.id}
                  type="button"
                  data-project-tab={index}
                  onClick={() => scrollToProject(index)}
                  style={{ height: TAB_HEIGHT }}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className="relative flex-shrink-0 lg:flex-1 min-w-[150px] px-4 flex items-center justify-center whitespace-nowrap text-[11px] tracking-[1.5px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#c49a32] focus-visible:ring-inset"
                >
                  {isActive && (
                    <motion.div
                      layoutId="project-active-background"
                      className="mt-3 absolute inset-x-0 top-0 bottom-0 bg-[#111827] rounded-t-[20px]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-200 text-[13px] ${
                      isActive
                        ? "text-white"
                        : "text-[#18233a]"
                    }`}
                  >
                    {isActive && (
                      <Building2
                        size={13}
                        strokeWidth={1.5}
                        className="text-[#c49a32] flex-shrink-0"
                      />
                    )}

                    {project.name}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="project-active-diamond"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-[10px] h-[10px] rotate-45 bg-[#c49a32] z-30"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PROJECTS */}

      <div className="max-w-[1200px] mx-auto px-5">
        {projects.map((project, index) => {
          return (
            <section
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              data-project-index={index}
              className="py-14 lg:py-20 border-b border-[#eadfc6]"
              style={{
                scrollMarginTop:
                  HEADER_HEIGHT + TAB_HEIGHT + 12,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 items-center">
                {/* TEXT */}

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`order-2 ${
                    index % 2 === 0
                      ? "lg:order-2"
                      : "lg:order-1"
                  }`}
                >
                  <h3 className="text-[#111827] font-elsie font-light text-[34px] md:text-[38px] mb-3 leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin
                      size={14}
                      strokeWidth={1.5}
                      className="text-[#c49a32] flex-shrink-0"
                    />

                    <span className="text-[#375477] tracking-[1.5px] text-[11px] font-medium">
                      {project.location}
                    </span>
                  </div>

                  <p className="text-[#23416b] text-[15px] leading-7 max-w-[560px] mb-6">
                    {project.description}
                  </p>

                  {/* FEATURES */}

                  <div className="grid grid-cols-3 border-b border-[#eadfc6] pb-5 mb-6">
                    {project.features.map(
                      (feature, featureIndex) => {
                        const Icon = feature.icon;
                        const isLast =
                          featureIndex ===
                          project.features.length - 1;

                        return (
                          <div
                            key={`${project.id}-feature-${featureIndex}`}
                            className={`flex flex-col items-center justify-center text-center px-2 ${
                              !isLast
                                ? "border-r border-[#eadfc6]"
                                : ""
                            }`}
                          >
                            <Icon
                              size={22}
                              strokeWidth={1.4}
                              className="text-[#c49a32] mb-2"
                            />

                            <strong className="text-[#111827] text-[13px] font-medium leading-tight">
                              {feature.value}
                            </strong>

                            <span className="text-[#111827] text-[13px] leading-tight">
                              {feature.label}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() =>
                        scrollToProject(index)
                      }
                      className="bg-[#111827] text-white px-6 py-3 text-[12px] tracking-[0.5px] font-medium flex items-center justify-center gap-3 hover:bg-[#1d293e] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c49a32] focus-visible:ring-offset-2"
                    >
                      VIEW PROJECT

                      <ArrowRight
                        size={15}
                        className="text-[#c49a32]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={openBrochure}
                      className="border border-[#111827] text-[#111827] px-6 py-3 text-[12px] tracking-[0.5px] font-medium flex items-center justify-center gap-3 hover:bg-[#111827] hover:text-white transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c49a32] focus-visible:ring-offset-2"
                    >
                      VIEW BROCHURE

                      <Eye size={14} />
                    </button>
                  </div>
                </motion.div>

                {/* IMAGE */}

                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`order-1 ${
                    index % 2 === 0
                      ? "lg:order-1"
                      : "lg:order-2"
                  }`}
                >
                  <div className="relative overflow-hidden group rounded-sm">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-[300px] md:h-[360px] lg:h-[420px] object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* =====================================================
          PROFESSIONAL BROCHURE VIEWER
      ===================================================== */}

      <AnimatePresence>
        {showBrochure && (
          <motion.div
            key="brochure-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeBrochure();
              }
            }}
            className="fixed inset-0 z-[9999] bg-[#0b1220]/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Company brochure viewer"
          >
            <motion.div
              key="brochure-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="vcw-brochure-panel relative w-full md:max-w-5xl h-[92dvh] md:h-[88vh] bg-white flex flex-col overflow-hidden rounded-t-[22px] md:rounded-2xl shadow-2xl"
            >
              {/* HEADER */}

              <div className="bg-gradient-to-r from-[#111827] to-[#1d293e] text-white px-4 md:px-7 py-4 md:py-5 flex items-center justify-between gap-3 flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm">
                    <img
                      src={LOGO_URL}
                      alt="Vindhayavasini Construction Works logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xs md:text-sm font-semibold tracking-wide truncate">
                      VINDHAYAVASINI
                    </h2>

                    <p className="text-[10px] md:text-xs text-gray-300 tracking-wider truncate">
                      CONSTRUCTION WORKS &middot; COMPANY PROFILE
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  {/* OPEN IN NEW TAB */}

                  <a
                    href={BROCHURE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] md:text-xs border border-white/25 rounded-md px-2.5 md:px-3 py-2 hover:bg-white hover:text-[#111827] transition-colors"
                    aria-label="Open brochure in new tab"
                  >
                    <ExternalLink size={14} />

                    <span className="hidden sm:inline">
                      OPEN
                    </span>
                  </a>

                  {/* DOWNLOAD */}

                  <a
                    href={BROCHURE_DOWNLOAD_URL}
                    download="Vindhayavasini-Construction-Company-Profile.pdf"
                    className="flex items-center gap-2 text-[10px] md:text-xs border border-white/25 rounded-md px-2.5 md:px-3 py-2 hover:bg-white hover:text-[#111827] transition-colors"
                    aria-label="Download brochure"
                  >
                    <Download size={14} />

                    <span className="hidden sm:inline">
                      DOWNLOAD
                    </span>
                  </a>

                  {/* CLOSE */}

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeBrochure}
                    className="text-white hover:text-[#c49a32] transition-colors p-1.5 rounded-md hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#c49a32]"
                    aria-label="Close brochure"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* PDF VIEWER */}

              <div className="relative flex-1 bg-[#3d4247] min-h-0">
                {/* LOADING */}

                {pdfLoading && !pdfError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#3d4247] z-10">
                    <LoaderCircle
                      size={34}
                      className="text-[#c49a32] animate-spin"
                    />

                    <span className="text-white/70 text-xs tracking-wide">
                      Loading brochure&hellip;
                    </span>
                  </div>
                )}

                {/* ERROR */}

                {pdfError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#3d4247] z-10 px-6 text-center">
                    <AlertCircle
                      size={40}
                      className="text-[#c49a32]"
                    />

                    <p className="text-white text-sm">
                      Unable to display the brochure here.
                    </p>

                    <a
                      href={BROCHURE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#c49a32] text-[#111827] px-5 py-3 text-xs font-semibold rounded-md"
                    >
                      OPEN PDF DIRECTLY
                    </a>
                  </div>
                )}

                <iframe
                  src={`${BROCHURE_URL}#toolbar=1&navpanes=0&scrollbar=1`}
                  title="Vindhayavasini Construction Works Company Profile"
                  className="w-full h-full border-0"
                  onLoad={() => {
                    setPdfLoading(false);
                    setPdfError(false);
                  }}
                  onError={() => {
                    setPdfLoading(false);
                    setPdfError(true);
                  }}
                />
              </div>

              {/* MOBILE FALLBACK NOTE */}

              <div className="md:hidden flex-shrink-0 bg-[#f4ede0] border-t border-[#eadfc6] px-4 py-2.5 text-center">
                <span className="text-[11px] text-[#5a4a2c]">
                  Trouble viewing?{" "}

                  <a
                    href={BROCHURE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    Open the PDF directly
                  </a>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          CUSTOM STYLES
      ===================================================== */}

      <style>{`
        .vcw-brochure-panel {
          box-shadow: 0 25px 60px -15px rgba(17, 24, 39, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .vcw-brochure-panel {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectSection;