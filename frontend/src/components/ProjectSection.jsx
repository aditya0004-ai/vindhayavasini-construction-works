import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  TreePine,
  ShieldCheck,
  ArrowRight,
  Download,
  Gem,
  ArrowUpDown,
} from "lucide-react";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: "bdd-green-city",
    name: "BBD GREEN CITY",
    title: "BBD Green City",
    location: "NEW GOMTI NAGAR, AYODHYA ROAD, LUCKNOW",

    description:
      "BBD Green City is a 318-acre integrated township in New Gomti Nagar, Lucknow, bringing together premium residences, commercial hubs, green spaces and modern infrastructure.",

    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",

    features: [
      { icon: Building2, value: "318 Acres", label: "Township" },
      { icon: TreePine, value: "100 Acres", label: "Greenery" },
      { icon: ShieldCheck, value: "5 Km from High", label: "Court" },
    ],
  },
  {
    id: "sunbreeze-1",
    name: "SUNBREEZE I",
    title: "Sunbreeze I",
    location: "BBD GREEN CITY, AYODHYA ROAD, LUCKNOW",

    description:
      "Sunbreeze I is a premium residential development offering 2 & 3 BHK apartments and 4 BHK penthouses in BBD Green City, featuring a sophisticated lifestyle with modern amenities.",

    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",

    features: [
      { icon: Building2, value: "2 & 3 BHK", label: "Apartments" },
      { icon: Gem, value: "4 BHK", label: "Penthouses" },
      { icon: ArrowUpDown, value: "Stilt + 14", label: "Floors" },
    ],
  },
  {
    id: "sunbreeze-2",
    name: "SUNBREEZE II",
    title: "Sunbreeze II",
    location: "BBD GREEN CITY, AYODHYA ROAD, LUCKNOW",

    description:
      "Sunbreeze II Phase I offers contemporary residences designed around comfort, connectivity and modern urban living.",

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
    location: "BBD GREEN CITY, LUCKNOW",

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
    location: "BBD GREEN CITY, LUCKNOW",

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
    location: "LUCKNOW",

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
   CONFIG — tweak these two numbers if your fixed header
   height changes, everything else derives from them
========================================================= */

const HEADER_HEIGHT = 80; // px — height of the sticky site header above this section
const TAB_HEIGHT = 64; // px — height of the sticky project tab bar

/* =========================================================
   COMPONENT
========================================================= */

const ProjectSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef([]);

  /* =======================================================
     SCROLL DETECTION
     rootMargin is derived from the sticky header + tab bar so
     the "active" tab updates right as a section clears the
     sticky bar, instead of a hard-coded offset that drifts
     out of sync with the actual layout.
  ======================================================= */

  useEffect(() => {
    const sections = projectRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = Number(
            visible[0].target.getAttribute("data-project-index")
          );
          if (!Number.isNaN(index)) setActiveProject(index);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${HEADER_HEIGHT + TAB_HEIGHT + 20}px 0px -35% 0px`,
      }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () =>
      sections.forEach((section) => section && observer.unobserve(section));
  }, []);

  const scrollToProject = (index) => {
    const section = projectRefs.current[index];
    if (!section) return;
    setActiveProject(index);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white">
      {/* =================================================
          TOP HEADING
      ================================================= */}
      <div className="max-w-[1200px] mx-auto px-5 pt-16 pb-9">
        <div className="flex justify-center mb-8">
          <div className="border border-[#111827] px-5 py-2 flex items-center gap-2">
            <Building2 size={17} strokeWidth={1.5} className="text-[#c49a32]" />
            <span className="text-[#111827] text-[15px] tracking-[3px] font-medium">
              OUR PROJECTS
            </span>
          </div>
        </div>

        <h2 className="text-center text-[#111827] font-elsie font-light text-[34px] md:text-[42px] lg:text-[55px] leading-tight">
          Addresses that define the{" "}
          <span className="text-[#c49a32]">city.</span>
        </h2>
      </div>

      {/* =================================================
          STICKY NAVIGATION
          - height driven by TAB_HEIGHT constant
          - top offset locked to the real header height
          - overflow-x-auto keeps it usable on small screens
            without breaking the sticky behavior
      ================================================= */}
      <div
        className="sticky z-40 bg-white border-b border-[#eadfc6] shadow-[0_1px_0_rgba(196,154,50,0.35)]"
        style={{ top: HEADER_HEIGHT }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex ">
            {projects.map((project, index) => {
              const isActive = activeProject === index;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => scrollToProject(index)}
                  style={{ height: TAB_HEIGHT }}
                  className="relative flex-shrink-0 lg:flex-1 min-w-[150px] px-4 flex items-center justify-center whitespace-nowrap text-[11px] tracking-[1.5px] font-medium outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="project-active-background"
                      className="mt-3 absolute inset-x-0 top-0 bottom-0 bg-[#111827] rounded-t-[20px]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}

                  <span
                    className={`relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-200 text-[13px] ${
                      isActive ? "text-white" : "text-[#18233a]"
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
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================
          PROJECTS
          - min-height dropped to something content-sized so
            sections don't leave huge dead space before the
            next reveal animation fires
          - whileInView now uses once: true so text doesn't
            fade in/out repeatedly while scrolling past a tall
            section (this was the main cause of the "broken"
            animation feel)
      ================================================= */}
      <div className="max-w-[1200px] mx-auto px-5">
        {projects.map((project, index) => {
          return (
            <section
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              data-project-index={index}
              className="py-14 lg:py-20 border-b border-[#eadfc6]"
              style={{ scrollMarginTop: HEADER_HEIGHT + TAB_HEIGHT + 12 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 items-center">
                {/* =====================================
                    TEXT
                ====================================== */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}
                >
                  <h3 className="text-[#111827] font-elsie font-light text-[34px] md:text-[38px] mb-3 leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={14} strokeWidth={1.5} className="text-[#c49a32] flex-shrink-0" />
                    <span className="text-[#375477] tracking-[1.5px] text-[11px] font-medium">
                      {project.location}
                    </span>
                  </div>

                  <p className="text-[#23416b] text-[15px] leading-7 max-w-[560px] mb-6">
                    {project.description}
                  </p>

                  {/* FEATURES */}
                  <div className="grid grid-cols-3 border-b border-[#eadfc6] pb-5 mb-6">
                    {project.features.map((feature, featureIndex) => {
                      const Icon = feature.icon;
                      const isLast = featureIndex === project.features.length - 1;

                      return (
                        <div
                          key={featureIndex}
                          className={`flex flex-col items-center justify-center text-center px-2 ${
                            !isLast ? "border-r border-[#eadfc6]" : ""
                          }`}
                        >
                          <Icon size={22} strokeWidth={1.4} className="text-[#c49a32] mb-2" />
                          <strong className="text-[#111827] text-[13px] font-medium leading-tight">
                            {feature.value}
                          </strong>
                          <span className="text-[#111827] text-[13px] leading-tight">
                            {feature.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      className="bg-[#111827] text-white px-6 py-3 text-[12px] tracking-[0.5px] font-medium flex items-center justify-center gap-3 hover:bg-[#1d293e] transition-colors duration-300"
                    >
                      VIEW PROJECT
                      <ArrowRight size={15} className="text-[#c49a32]" />
                    </button>

                    <button
                      type="button"
                      className="border border-[#111827] text-[#111827] px-6 py-3 text-[12px] tracking-[0.5px] font-medium flex items-center justify-center gap-3 hover:bg-[#111827] hover:text-white transition-colors duration-300"
                    >
                      DOWNLOAD BROCHURE
                      <Download size={14} />
                    </button>
                  </div>
                </motion.div>

                {/* =====================================
                    IMAGE
                ====================================== */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative overflow-hidden group rounded-sm">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[300px] md:h-[360px] lg:h-[420px] object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectSection;