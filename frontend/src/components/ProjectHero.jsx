import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, ArrowDownRight } from "lucide-react";

const ProjectHero = ({ projectSlug }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        if (!projectSlug) {
          setError("Project slug is missing");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/projects/${projectSlug}`
        );

        setProject(response.data.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectSlug]);

  /* Loading */
  if (loading) {
    return (
      <section className="h-[420px] flex items-center justify-center bg-[#14110F]">
        <p className="text-[#C9A258]/80 text-xs tracking-[2px] uppercase">
          Loading project
        </p>
      </section>
    );
  }

  /* Error */
  if (error) {
    return (
      <section className="h-[420px] flex flex-col items-center justify-center bg-[#14110F] px-5">
        <p className="text-red-400/90 text-sm text-center">{error}</p>
      </section>
    );
  }

  /* Project Not Found */
  if (!project) {
    return (
      <section className="h-[420px] flex items-center justify-center bg-[#14110F]">
        <p className="text-white/60 text-sm">Project not found</p>
      </section>
    );
  }

  const backgroundImage = project.image?.url || "";

  return (
    <section
      className="mb-20 relative h-screen bg-cover bg-center overflow-hidden bg-[#14110F]"
      style={{
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : "none",
      }}
    >
      {/* Base scrim — keeps the whole frame legible */}
      <div className="absolute inset-0 bg-[#14110F]/55" />

      {/* Directional gradient — content side reads clean, image breathes on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14110F] via-[#14110F]/75 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-[620px]">
          {/* CATEGORY */}
          {project.category && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white text-xs font-bold font-sans tracking-[2.5px] uppercase mb-5 border border-white px-5 py-2">
                {project.category}
              </span>
            </div>
          )}

          {/* PROJECT NAME */}
          <h1 className="font-serif text-[70px] text-white leading-[1.08] tracking-tight">
            {project.name}
          </h1>

          {/* SUB HEADING */}
          {project.subHeading && (
            <h2 className="mt-3 text-[#BB9632] text-[15px] md:text-[17px] font-medium font-sans">
              {project.subHeading}
            </h2>
          )}

          {/* OVERVIEW */}
          {project.overview && (
            <p className="mt-3 text-white text-[15px] md:text-[16px] leading-[1.65] max-w-[480px] line-clamp-2 font-semibold">
              {project.overview}
            </p>
          )}

          {/* LOCATION + STATUS ROW */}
          {/* <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.location && (
              <div className="flex items-center gap-1.5 text-white/55">
                <MapPin size={14} className="text-[#C9A258]" />
                <span className="text-[13px]">{project.location}</span>
              </div>
            )}

            {project.status && (
              <div className="flex items-center gap-1.5 border border-[#C9A258]/30 px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A258]" />
                <span className="text-[11px] tracking-[1px] text-[#C9A258] uppercase">
                  {project.status}
                </span>
              </div>
            )}
          </div> */}

          {/* BUTTON */}
          <button
            className="group mt-7 border border-white bg-[#0F172A] hover:bg-[#C9A258] hover:border-[#C9A258] text-white px-6 py-3 flex items-center gap-2.5 transition-colors duration-300"
            onClick={() => {
              document
                .getElementById("enquiry-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-[15px] font-semibold tracking-[1.5px] uppercase">
              Enquire now
            </span>
            <ArrowDownRight
              size={17}
              className="text-[#C9A258] group-hover:text-white transition-colors duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;