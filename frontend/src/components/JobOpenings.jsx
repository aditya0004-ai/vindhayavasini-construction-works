import { useEffect, useState } from "react";
import { Search, Send, ChevronDown, MapPin, Briefcase, Award } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const JobOpenings = () => {
  const [jobs, setJobs] = useState([]);
  const [openJob, setOpenJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // API_URL already contains "/api"
        const response = await fetch(`${API_URL}/jobs`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch jobs");
        }

        setJobs(result.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleDetails = (id) => {
    setOpenJob(openJob === id ? null : id);
  };

  return (
    <section className="bg-[#f7f7f6] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-3 border border-slate-400 px-5 py-2 text-[9px] md:text-[11px] tracking-[4px] text-slate-700">
            <Search size={15} className="text-[#a88635]" />
            CURRENT OPENINGS
          </div>

          <h2 className="font-elsie text-3xl leading-tight text-[#182235] md:text-6xl font-light">
            Join the <span className="text-[#a88635]">Team.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base md:leading-8 text-slate-600 text-[15px] md:text-lg">
            Discover rewarding career opportunities to create landmark developments,
            advance engineering excellence, and shape the future of real estate with Vindhayavasini Constructions.
          </p>
        </div>

        {/* Jobs */}
        <div className="border-t border-slate-300">

          {loading && (
            <div className="py-14 text-center text-slate-500">
              Loading opportunities...
            </div>
          )}

          {error && !loading && (
            <div className="py-14 text-center text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="py-14 text-center text-slate-500">
              No current openings available.
            </div>
          )}

          {!loading &&
            !error &&
            jobs.map((job) => (
              <div
                key={job._id}
                className="border-b border-slate-300 py-7 md:py-9"
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                  {/* Job Information */}
                  <div>
                    <h3 className="font-elsie text-2xl text-[#182235] md:text-3xl">
                      {job.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                      {job.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} className="text-[#a88635]" />
                          {job.location}
                        </span>
                      )}

                      {job.type && (
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={15} className="text-[#a88635]" />
                          {job.type}
                        </span>
                      )}

                      {job.experience && (
                        <span className="flex items-center gap-1.5">
                          <Award size={15} className="text-[#a88635]" />
                          {job.experience}
                        </span>
                      )}

                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex shrink-0 gap-3">

                    <a
                      href={`mailto:hr@yourcompany.com?subject=Application for ${job.title}`}
                      className="flex items-center justify-center gap-2 bg-[#182235] px-6 py-3 text-xs font-semibold tracking-[1.5px] text-white transition hover:bg-[#a88635]"
                    >
                      <Send size={15} className="text-[#c9a54b]" />
                      APPLY NOW
                    </a>

                    <button
                      onClick={() => toggleDetails(job._id)}
                      className="flex items-center justify-center gap-3 border border-slate-300 px-5 py-3 text-xs font-semibold tracking-[1.5px] text-[#182235] transition hover:border-[#a88635]"
                    >
                      VIEW DETAILS

                      <ChevronDown
                        size={16}
                        className={`text-[#a88635] transition-transform duration-300 ${openJob === job._id ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                  </div>
                </div>

                {/* Expanded Job Details */}
                {openJob === job._id && (
                  <div className="mt-8 border-t border-slate-200 pt-7">

                    {job.roleOverview && (
                      <div>
                        <h4 className="font-elsie text-xl text-[#182235]">
                          Role Overview
                        </h4>

                        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                          {job.roleOverview}
                        </p>
                      </div>
                    )}

                    <div className="mt-7 grid gap-8 md:grid-cols-2">

                      {job.responsibilities?.length > 0 && (
                        <div>
                          <h4 className="mb-3 font-elsie text-xl text-[#182235]">
                            Responsibilities
                          </h4>

                          <ul className="space-y-2 text-sm leading-6 text-slate-600">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-[#a88635]">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.requirements?.length > 0 && (
                        <div>
                          <h4 className="mb-3 font-elsie text-xl text-[#182235]">
                            Requirements
                          </h4>

                          <ul className="space-y-2 text-sm leading-6 text-slate-600">
                            {job.requirements.map((item, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-[#a88635]">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;