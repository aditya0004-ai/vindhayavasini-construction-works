import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const TABS = [
  { key: "all", label: "All" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "institutional", label: "Institutional" },
];

const API_URL = import.meta.env.VITE_API_URL;

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/projects`
        );

        const projectsData =
          response.data.projects ||
          response.data.data ||
          response.data;

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ================================
  // PROJECT COUNTS
  // ================================
  const counts = useMemo(() => {
    return TABS.reduce((acc, tab) => {
      acc[tab.key] =
        tab.key === "all"
          ? projects.length
          : projects.filter(
              (p) =>
                p.category?.toLowerCase() === tab.key
            ).length;

      return acc;
    }, {});
  }, [projects]);

  // ================================
  // FILTER PROJECTS
  // ================================
  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;

    return projects.filter(
      (project) =>
        project.category?.toLowerCase() === activeTab
    );
  }, [projects, activeTab]);

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <section className="bg-white py-16 sm:py-20 md:py-24 text-center px-5">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A8072]">
          Loading Projects...
        </p>
      </section>
    );
  }

  // ================================
  // ERROR
  // ================================
  if (error) {
    return (
      <section className="bg-white py-16 sm:py-20 md:py-24 text-center px-5">
        <p className="text-sm sm:text-base text-red-500">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12">

      {/* ================================= */}
      {/* TAB NAVIGATION */}
      {/* ================================= */}

      <div className="flex justify-center mb-10 sm:mb-12 md:mb-14">

        {/* Horizontal scroll on small devices */}
        <div className="w-full max-w-full overflow-x-auto scrollbar-hide">

          <div className="flex justify-start sm:justify-center min-w-max mx-auto bg-white border-b border-[#E5E0D8]">

            {TABS.map((tab, index) => {
              const isActive = activeTab === tab.key;

              return (
                <div
                  key={tab.key}
                  className="relative flex items-center flex-shrink-0"
                >

                  <button
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-[12px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-colors rounded-t-[16px] sm:rounded-t-[20px] whitespace-nowrap ${
                      isActive
                        ? "bg-[#0F172A] text-white"
                        : "text-[#3A342C] hover:text-[#14110F]"
                    }`}
                  >

                    {tab.key === "all" && (
                      <LayoutGrid className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    )}

                    {tab.label} ({counts[tab.key]})

                    {isActive && (
                      <motion.span
                        layoutId="active-tab-diamond"
                        className="absolute -bottom-[6px] sm:-bottom-[7px] left-1/2 -translate-x-1/2 w-4 sm:w-2.5 h-2 sm:h-2.5 bg-[#C9A258] rotate-45"
                      />
                    )}

                  </button>

                  {index < TABS.length - 1 && (
                    <div className="w-px h-3.5 sm:h-4 bg-[#D9C9A8] flex-shrink-0" />
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </div>


      {/* ================================= */}
      {/* PROJECT GRID */}
      {/* ================================= */}

      {filteredProjects.length === 0 ? (

        <div className="text-center py-16 sm:py-20 px-4">
          <p className="text-sm sm:text-base text-[#8A8072]">
            No projects found.
          </p>
        </div>

      ) : (

        <AnimatePresence mode="wait">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-x-5
              gap-y-10
              sm:gap-x-6
              sm:gap-y-12
              md:gap-8
              max-w-7xl
              mx-auto
            "
          >

            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.id}
                project={project}
              />
            ))}

          </motion.div>

        </AnimatePresence>
      )}

    </section>
  );
}


// =======================================
// PROJECT CARD
// =======================================

function ProjectCard({ project }) {

  // ================================
  // IMAGE
  // ================================

  const image =
    project.image?.url ||
    project.image ||
    project.images?.[0]?.url ||
    project.images?.[0] ||
    null;


  // ================================
  // ADDRESS / LOCATION FROM BACKEND
  // ================================

  const getAddress = () => {

    // If location is directly a string
    if (typeof project.location === "string") {
      return project.location;
    }

    // If location is an array
    if (Array.isArray(project.location)) {
      return project.location
        .filter(Boolean)
        .join(", ");
    }

    // If location is an object
    if (
      project.location &&
      typeof project.location === "object"
    ) {
      return [
        project.location.area,
        project.location.address,
        project.location.city,
        project.location.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    // Alternative fields from backend
    return [
      project.address,
      project.city,
      project.state,
    ]
      .filter(Boolean)
      .join(", ");
  };


  const address = getAddress();


  return (
    <a
      href={`/projects/${project.slug || project._id}`}
      className="group block min-w-0"
    >

      {/* ================================= */}
      {/* IMAGE */}
      {/* ================================= */}

      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[#EFEAE0] mb-4 sm:mb-5 shadow-[0_8px_30px_rgba(20,17,15,0.08)]">

        {image ? (

          <img
            src={image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center text-[#B0A48A] text-[10px] sm:text-xs uppercase tracking-widest text-center px-4">
            No Image Available
          </div>

        )}

      </div>


      {/* ================================= */}
      {/* CATEGORY */}
      {/* ================================= */}

      <p className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.15em] text-[#C9A258] uppercase mb-1.5 sm:mb-2">
        {project.tag || project.category || "Project"}
      </p>


      {/* ================================= */}
      {/* NAME + ARROW */}
      {/* ================================= */}

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0 flex-1">

          {/* PROJECT NAME */}

          <h3 className="font-serif text-lg sm:text-xl text-[#14110F] leading-snug break-words">
            {project.name}
          </h3>


          {/* ================================= */}
          {/* ADDRESS */}
          {/* ================================= */}

          {address && (

            <div className="flex items-start gap-1.5 text-xs sm:text-sm mt-1.5 sm:mt-2">

              <MapPin className="w-3.5 h-3.5 text-[#8A8072] flex-shrink-0 mt-0.5" />

              <span className="text-[#3A342C] leading-relaxed break-words">
                {address}
              </span>

            </div>

          )}

        </div>


        {/* ================================= */}
        {/* ARROW BUTTON */}
        {/* ================================= */}

        <span className="mt-0.5 sm:mt-1 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E0D8] flex items-center justify-center transition-colors group-hover:bg-[#14110F] group-hover:border-[#14110F]">

          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#14110F] transition-all group-hover:hidden" />

          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white hidden transition-all group-hover:block" />

        </span>

      </div>

    </a>
  );
}