import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  ClipboardList,
  Award,
  Map,
  Images,
  MapPin,
  ShieldCheck,
  Trees,
  Store,
  Trophy,
  Landmark,
  ShoppingBag,
  Crown,
  Wifi,
  Dumbbell,
  Building2,
  Home,
  Waves,
  Car,
  TreePine,
  Baby,
  CircleParking,
  GraduationCap,
  Hospital,
  Utensils,
  Bus,
  Gamepad2,
  Download,
  ExternalLink,

  
  Train,
  Plane,
  HeartPulse,
  Activity,
  Shield,
  ShieldAlert,
  Building,
  Construction,
  Hammer,
  Zap,
  Droplets,
  Wind,
  Sun,
  Leaf,
  Flower2,
  Accessibility,
  Camera,
  BellRing,
  Flame,
  BatteryCharging,
  Lightbulb,
  Armchair,
  Warehouse,
  School,
  Bike,
  Footprints,
  Church,
  Fuel,
  Navigation,
  CircleCheck,
  Sparkles,
  Sofa,
  ConciergeBell,
  Volleyball,
  PartyPopper,
  Fence,
  Layers,
  BrickWall,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const HEADER_HEIGHT = 80;
const TAB_HEIGHT = 64;

/* =========================================================
   COMPONENT
========================================================= */

const ProjectDetails = ({ projectSlug }) => {
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionRefs = useRef({});

  /* =========================================================
     FETCH PROJECT
  ========================================================= */

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/projects/${projectSlug}`
        );

        setProject(response.data.data);
      } catch (error) {
        console.error("Project fetch error:", error);

        setError(
          error.response?.data?.message ||
          "Failed to fetch project."
        );
      } finally {
        setLoading(false);
      }
    };

    if (projectSlug) {
      fetchProject();
    }
  }, [projectSlug]);

  /* =========================================================
     SCROLL TO SECTION
  ========================================================= */

  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];

    if (!section) return;

    setActiveTab(sectionId);

    const y =
      section.getBoundingClientRect().top +
      window.scrollY -
      HEADER_HEIGHT -
      TAB_HEIGHT -
      12;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  /* =========================================================
     ACTIVE TAB ON SCROLL
  ========================================================= */

  useEffect(() => {
    if (!project) return;

    const sectionIds = [
      "overview",
      "highlights",
      "layout-plan",
      "gallery",
      "location",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveTab(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.65],
        rootMargin: `-${HEADER_HEIGHT + TAB_HEIGHT + 20
          }px 0px -35% 0px`,
      }
    );

    sectionIds.forEach((id) => {
      const element = sectionRefs.current[id];

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [project]);

  /* =========================================================
     DYNAMIC HIGHLIGHT ICON
  ========================================================= */
const getHighlightIcon = (highlight) => {
  const text = String(highlight || "").toLowerCase();

  /* =====================================================
     SECURITY
  ===================================================== */

  if (
    text.includes("multi-tier security") ||
    text.includes("multi tier security") ||
    text.includes("multiple security")
  ) {
    return ShieldAlert;
  }

  if (
    text.includes("security") ||
    text.includes("gated") ||
    text.includes("guard") ||
    text.includes("24/7 security") ||
    text.includes("24x7 security") ||
    text.includes("surveillance")
  ) {
    return ShieldCheck;
  }

  if (
    text.includes("cctv") ||
    text.includes("camera")
  ) {
    return Camera;
  }


  /* =====================================================
     TRANSPORT & CONNECTIVITY
  ===================================================== */

  if (
    text.includes("railway station") ||
    text.includes("train station") ||
    text.includes("station")
  ) {
    return Train;
  }

  if (
    text.includes("airport") ||
    text.includes("air connectivity")
  ) {
    return Plane;
  }

  if (
    text.includes("metro")
  ) {
    return Train;
  }

  if (
    text.includes("bus") ||
    text.includes("transport")
  ) {
    return Bus;
  }

  if (
    text.includes("highway") ||
    text.includes("expressway") ||
    text.includes("connectivity")
  ) {
    return Navigation;
  }


  /* =====================================================
     EARTHQUAKE / STRUCTURE
  ===================================================== */

  if (
    text.includes("earthquake") ||
    text.includes("earthquake resistant") ||
    text.includes("seismic")
  ) {
    return Building;
  }

  if (
    text.includes("structure") ||
    text.includes("structural") ||
    text.includes("strong foundation")
  ) {
    return Construction;
  }

  if (
    text.includes("construction") ||
    text.includes("premium construction") ||
    text.includes("quality construction")
  ) {
    return Hammer;
  }

  if (
    text.includes("brick") ||
    text.includes("wall")
  ) {
    return BrickWall;
  }


  /* =====================================================
     WELLNESS & FITNESS
  ===================================================== */

  if (
    text.includes("yoga") ||
    text.includes("meditation")
  ) {
    return HeartPulse;
  }

  if (
    text.includes("gym") ||
    text.includes("fitness") ||
    text.includes("workout")
  ) {
    return Dumbbell;
  }

  if (
    text.includes("sports") ||
    text.includes("stadium") ||
    text.includes("cricket")
  ) {
    return Trophy;
  }

  if (
    text.includes("activity") ||
    text.includes("recreation")
  ) {
    return Activity;
  }

  if (
    text.includes("volleyball") ||
    text.includes("badminton") ||
    text.includes("sports court")
  ) {
    return Volleyball;
  }


  /* =====================================================
     GREEN & NATURE
  ===================================================== */

  if (
    text.includes("green") ||
    text.includes("garden") ||
    text.includes("park") ||
    text.includes("greenery")
  ) {
    return Trees;
  }

  if (
    text.includes("landscape") ||
    text.includes("landscaping")
  ) {
    return Flower2;
  }

  if (
    text.includes("tree") ||
    text.includes("plantation")
  ) {
    return TreePine;
  }

  if (
    text.includes("eco") ||
    text.includes("environment") ||
    text.includes("sustainable")
  ) {
    return Leaf;
  }


  /* =====================================================
     WATER & UTILITIES
  ===================================================== */

  if (
    text.includes("swimming") ||
    text.includes("pool")
  ) {
    return Waves;
  }

  if (
    text.includes("water") ||
    text.includes("water supply") ||
    text.includes("rainwater") ||
    text.includes("rain water")
  ) {
    return Droplets;
  }

  if (
    text.includes("electric") ||
    text.includes("electricity") ||
    text.includes("power backup")
  ) {
    return Zap;
  }

  if (
    text.includes("solar") ||
    text.includes("solar energy")
  ) {
    return Sun;
  }

  if (
    text.includes("backup") ||
    text.includes("generator")
  ) {
    return BatteryCharging;
  }

  if (
    text.includes("ventilation") ||
    text.includes("fresh air")
  ) {
    return Wind;
  }


  /* =====================================================
     INTERNET & SMART FEATURES
  ===================================================== */

  if (
    text.includes("internet") ||
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("fiber") ||
    text.includes("optical")
  ) {
    return Wifi;
  }

  if (
    text.includes("smart home") ||
    text.includes("smart feature") ||
    text.includes("automation")
  ) {
    return Lightbulb;
  }


  /* =====================================================
     SHOPPING & COMMERCIAL
  ===================================================== */

  if (
    text.includes("market") ||
    text.includes("wholesale") ||
    text.includes("commercial")
  ) {
    return Store;
  }

  if (
    text.includes("shopping") ||
    text.includes("mall")
  ) {
    return ShoppingBag;
  }

  if (
    text.includes("restaurant") ||
    text.includes("food") ||
    text.includes("cafe")
  ) {
    return Utensils;
  }


  /* =====================================================
     CLUB & LIFESTYLE
  ===================================================== */

  if (
    text.includes("clubhouse") ||
    text.includes("club house") ||
    text.includes("club")
  ) {
    return Crown;
  }

  if (
    text.includes("lounge") ||
    text.includes("seating")
  ) {
    return Sofa;
  }

  if (
    text.includes("party") ||
    text.includes("banquet") ||
    text.includes("celebration")
  ) {
    return PartyPopper;
  }

  if (
    text.includes("concierge") ||
    text.includes("service")
  ) {
    return ConciergeBell;
  }


  /* =====================================================
     PARKING
  ===================================================== */

  if (
    text.includes("parking")
  ) {
    return CircleParking;
  }

  if (
    text.includes("car")
  ) {
    return Car;
  }

  if (
    text.includes("bike") ||
    text.includes("cycling")
  ) {
    return Bike;
  }


  /* =====================================================
     FAMILY
  ===================================================== */

  if (
    text.includes("kids") ||
    text.includes("children") ||
    text.includes("play area") ||
    text.includes("playground")
  ) {
    return Baby;
  }

  if (
    text.includes("senior") ||
    text.includes("elderly")
  ) {
    return Accessibility;
  }


  /* =====================================================
     EDUCATION & HEALTH
  ===================================================== */

  if (
    text.includes("school") ||
    text.includes("education")
  ) {
    return GraduationCap;
  }

  if (
    text.includes("college") ||
    text.includes("university")
  ) {
    return School;
  }

  if (
    text.includes("hospital") ||
    text.includes("health") ||
    text.includes("medical")
  ) {
    return Hospital;
  }


  /* =====================================================
     BUILDINGS / PROPERTY
  ===================================================== */

  if (
    text.includes("tower") ||
    text.includes("building")
  ) {
    return Building2;
  }

  if (
    text.includes("villa") ||
    text.includes("home") ||
    text.includes("residence")
  ) {
    return Home;
  }

  if (
    text.includes("warehouse") ||
    text.includes("storage")
  ) {
    return Warehouse;
  }


  /* =====================================================
     BANKING
  ===================================================== */

  if (
    text.includes("bank") ||
    text.includes("atm")
  ) {
    return Landmark;
  }


  /* =====================================================
     FIRE SAFETY
  ===================================================== */

  if (
    text.includes("fire safety") ||
    text.includes("fire fighting") ||
    text.includes("fire protection")
  ) {
    return Flame;
  }


  /* =====================================================
     PREMIUM FEATURES
  ===================================================== */

  if (
    text.includes("premium") ||
    text.includes("luxury") ||
    text.includes("world class")
  ) {
    return Sparkles;
  }

  if (
    text.includes("approved") ||
    text.includes("certified") ||
    text.includes("verified")
  ) {
    return CircleCheck;
  }

  if (
    text.includes("boundary") ||
    text.includes("fencing")
  ) {
    return Fence;
  }

  if (
    text.includes("floor") ||
    text.includes("multi-level") ||
    text.includes("multi level")
  ) {
    return Layers;
  }


  /* =====================================================
     DEFAULT
  ===================================================== */

  return Award;
};
  
  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-[#273244] text-[14px]">
          Loading project details...
        </p>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-red-500 text-[14px]">
          {error}
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-[14px]">
        Project not found.
      </div>
    );
  }

  /* =========================================================
     BACKEND DATA
  ========================================================= */

  const highlights = Array.isArray(project.highlights)
    ? project.highlights
    : [];

  const layoutPlans = Array.isArray(project.layoutPlan)
    ? project.layoutPlan
    : [];

  const gallery = Array.isArray(project.gallery)
    ? project.gallery
    : [];

  /* =========================================================
     NAVIGATION TABS
  ========================================================= */

  const tabs = [
    {
      id: "overview",
      label: "OVERVIEW",
      icon: ClipboardList,
    },
    {
      id: "highlights",
      label: "HIGHLIGHTS",
      icon: Award,
    },
    {
      id: "layout-plan",
      label: "LAYOUT PLAN",
      icon: Map,
    },
    {
      id: "gallery",
      label: "GALLERY",
      icon: Images,
    },
    {
      id: "location",
      label: "LOCATION",
      icon: MapPin,
    },
  ];

  /* =========================================================
     REUSABLE: SECTION EYEBROW
  ========================================================= */

  const SectionEyebrow = ({ icon: Icon, label }) => (
    <div
      className="
        pd-eyebrow
        inline-flex
        items-center
        gap-2.5
        border
        border-[#273244]
        px-5
        md:px-6
        py-2
      "
    >
      <Icon size={15} strokeWidth={1.5} className="text-[#b39135]" />

      <span
        className="
          text-[10px]
          md:text-[11px]
          tracking-[2.5px]
          md:tracking-[3px]
          text-[#273244]
          font-medium
        "
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="px-30">

      <style>{`
        .pd-eyebrow { transition: border-color 0.2s ease; }
        .pd-detail-row + .pd-detail-row { margin-top: 22px; }
        .pd-fact-icon { transition: transform 0.25s ease; }
        .pd-fact-row:hover .pd-fact-icon { transform: translateY(-1px); }
      `}</style>

      {/* =====================================================
          STICKY NAVIGATION
      ====================================================== */}

      <div
        className="
        
          sticky
          z-40
          bg-[#f7f7f5]
          border-b-2
          border-[#BB9632]
          shadow-[0_1px_0_rgba(179,145,53,0.35)]
        "
        style={{
          top: HEADER_HEIGHT,
        }}
      >
        <div className="max-w-[1140px] mx-auto px-5">

          <div className="flex">

            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    height: TAB_HEIGHT,
                  }}
                  className="
                    relative
                    flex-shrink-0
                    lg:flex-1
                    min-w-[130px]
                    px-3
                    flex
                    items-center
                    justify-center
                    whitespace-nowrap
                    outline-none
                  "
                >

                  {/* ACTIVE BACKGROUND */}

                  {isActive && (
                    <motion.div
                      layoutId="project-details-active-background"
                      className="
                        absolute
                        inset-x-0
                        top-3
                        bottom-0
                        bg-[#172235]
                        rounded-t-[24px]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  )}

                  {/* TAB CONTENT */}

                  <span
                    className={`
                      relative
                      z-10
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      transition-colors
                      duration-200
                      text-[11px]
                      md:text-[12px]
                      tracking-[1.25px]
                      font-medium
                      ${isActive
                        ? "text-white"
                        : "text-[#273244]"
                      }
                    `}
                  >

                    {isActive && (
                      <Icon
                        size={13}
                        strokeWidth={1.5}
                        className="
                          text-[#b39135]
                          flex-shrink-0
                        "
                      />
                    )}

                    {tab.label}

                  </span>

                  {/* ACTIVE GOLD DIAMOND */}

                  {isActive && (
                    <motion.span
                      layoutId="project-details-active-diamond"
                      className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        -bottom-[4px]
                        w-[8px]
                        h-[8px]
                        rotate-45
                        bg-[#b39135]
                        z-30
                      "
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


      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section
        id="overview"
        ref={(el) => (sectionRefs.current.overview = el)}
        className="py-14 md:py-20 px-5"
        style={{
          scrollMarginTop:
            HEADER_HEIGHT + TAB_HEIGHT + 12,
        }}
      >

        <div
          className="
            max-w-[1140px]
            mx-auto
            w-full
            grid
            lg:grid-cols-2
            gap-10
            lg:gap-16
            items-start
          "
        >

          {/* LEFT */}

          <div>

            <SectionEyebrow
              icon={Building2}
              label={project.category || project.category}
            />

            <h1
              className="
                mt-6
                md:mt-7
                text-[36px]
                md:text-[48px]
                leading-[1.12]
                text-[#1d293b]
                font-elsie
                font-normal
              "
            >
              {project.name}
            </h1>


            {project.overview && (
              <p
                className="
                  mt-5
                  md:mt-6
                  text-[14px]
                  md:text-[15px]
                  leading-[1.75]
                  text-[#536070]
                  max-w-[52ch]
                "
              >
                {project.overview}
              </p>
            )}

          </div>


          {/* RIGHT */}

          <div className="lg:pt-1">

            {[
              {
                icon: Award,
                label: "PROJECT STATUS",
                value: project.status || "Not Available",
              },
              {
                icon: Building2,
                label: "CATEGORY",
                value: project.category || "Not Available",
              },
              {
                icon: MapPin,
                label: "LOCATION",
                value: project.location || "Not Available",
              },
              {
                icon: ClipboardList,
                label: "PROJECT DETAILS",
                value: project.isPublished
                  ? "Available"
                  : "Coming Soon",
              },
            ].map((fact, index, arr) => {
              const FactIcon = fact.icon;
              const isLast = index === arr.length - 1;

              return (
                <div
                  key={fact.label}
                  className={`
                    pd-detail-row
                    pd-fact-row
                    flex
                    gap-5
                    items-center
                    ${!isLast ? "border-b border-[#d8d0bd] pb-[22px]" : ""}
                  `}
                >

                  <FactIcon
                    size={26}
                    strokeWidth={1.3}
                    className="pd-fact-icon text-[#b39135] shrink-0"
                  />

                  <div>

                    <p
                      className="
                        text-[10px]
                        md:text-[11px]
                        tracking-[2.5px]
                        md:tracking-[3px]
                        text-[#7a8490]
                        mb-1
                        font-medium
                      "
                    >
                      {fact.label}
                    </p>

                    <h3
                      className="
                        text-[18px]
                        md:text-[20px]
                        leading-[1.3]
                        text-[#1d293b]
                        font-elsie
                        font-normal
                      "
                    >
                      {fact.value}
                    </h3>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HIGHLIGHTS
      ====================================================== */}

      <section
        id="highlights"
        ref={(el) => (sectionRefs.current.highlights = el)}
        className="py-14 md:py-20 px-5"
        style={{
          scrollMarginTop:
            HEADER_HEIGHT + TAB_HEIGHT + 12,
        }}
      >

        <div className="max-w-[1100px] mx-auto">

          <div className="border-y border-[#d8d0bd] py-10 md:py-12">

            <div className="flex justify-center">
              <SectionEyebrow icon={Award} label="PROJECT HIGHLIGHTS" />
            </div>


            {highlights.length > 0 ? (

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-x-6
                  gap-y-10
                  md:gap-y-12
                  mt-10
                  md:mt-12
                "
              >

                {highlights.map((highlight, index) => {
                  const highlightName =
                    typeof highlight === "string"
                      ? highlight
                      : highlight?.name || "";

                  const Icon =
                    getHighlightIcon(highlightName);

                  return (
                    <div
                      key={highlight?._id || index}
                      className="
                        flex
                        flex-col
                        items-center
                        text-center
                      "
                    >

                      <div
                        className="
                          w-14
                          h-14
                          md:w-16
                          md:h-16
                          flex
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          border
                          border-[#e4dfd0]
                          mb-3.5
                        "
                      >
                        <Icon
                          size={24}
                          strokeWidth={1.5}
                          className="text-[#b39135]"
                        />
                      </div>

                      <p
                        className="
                          max-w-[160px]
                          text-[11px]
                          md:text-[12px]
                          leading-[1.45]
                          tracking-[0.5px]
                          text-[#273244]
                          font-medium
                        "
                      >
                        {highlightName}
                      </p>

                    </div>
                  );
                })}

              </div>

            ) : (

              <p className="text-center mt-10 text-[13px] text-gray-500">
                No highlights available.
              </p>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          LAYOUT PLAN
      ====================================================== */}

      <section
        id="layout-plan"
        ref={(el) =>
          (sectionRefs.current["layout-plan"] = el)
        }
        className="py-14 md:py-20 px-5"
        style={{
          scrollMarginTop:
            HEADER_HEIGHT + TAB_HEIGHT + 12,
        }}
      >

        <div className="max-w-[1140px] mx-auto">

          <div className="text-center mb-9 md:mb-11">
            <SectionEyebrow icon={Map} label="LAYOUT PLAN" />
          </div>


          {layoutPlans.length > 0 ? (

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">

              {layoutPlans.map((plan, index) => (

                <div
                  key={
                    plan._id ||
                    plan.publicId ||
                    index
                  }
                  className="bg-white border border-[#e4dfd0] p-2.5 md:p-3.5"
                >

                  <img
                    src={plan.url}
                    alt={`Layout Plan ${index + 1}`}
                    className="w-full h-auto max-h-[420px] object-contain"
                  />

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-[13px] text-gray-500">
              Layout plan not available.
            </p>

          )}

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ====================================================== */}

      <section
        id="gallery"
        ref={(el) => (sectionRefs.current.gallery = el)}
        className="py-14 md:py-20 px-5"
        style={{
          scrollMarginTop:
            HEADER_HEIGHT + TAB_HEIGHT + 12,
        }}
      >

        <div className="max-w-[1140px] mx-auto">

          <div className="text-center mb-9 md:mb-11">
            <SectionEyebrow icon={Images} label="PROJECT GALLERY" />
          </div>


          {gallery.length > 0 ? (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-4
                md:gap-5
              "
            >

              {gallery.map((image, index) => (

                <div
                  key={
                    image._id ||
                    image.publicId ||
                    index
                  }
                  className="overflow-hidden bg-white border border-[#e4dfd0]"
                >

                  <img
                    src={image.url}
                    alt={`${project.name} ${index + 1}`}
                    className="
                      w-full
                      h-[210px]
                      md:h-[240px]
                      object-cover
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
                  />

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-[13px] text-gray-500">
              No gallery images available.
            </p>

          )}

        </div>

      </section>

     {/* =====================================================
    LOCATION
===================================================== */}

<section
  id="location"
  ref={(el) => (sectionRefs.current.location = el)}
  className="relative py-10 md:py-14 overflow-hidden"
  style={{
    scrollMarginTop: HEADER_HEIGHT + TAB_HEIGHT + 12,
  }}
>
  <div className="w-full">

    {/* MAP CONTAINER */}
    <div
      className="
        relative
        w-full
        h-[520px]
        md:h-[560px]
        overflow-hidden
      "
    >

      {/* ================= CLICKABLE BACKGROUND MAP ================= */}

      {project.liveLocation ? (
        <iframe
          src={project.liveLocation}
          title={`${project.name} Location`}
          className="
            absolute
            inset-0
            z-0
            w-full
            h-full
            border-0
          "
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            z-0
            flex
            items-center
            justify-center
            bg-[#e8e6e0]
          "
        >
          <p className="text-gray-600 text-[13px]">
            Live location is not available.
          </p>
        </div>
      )}

      {/* ================= LIGHT MAP OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          bg-[#172235]/5
          pointer-events-none
        "
      />


      {/* ================= CARD POSITIONING ================= */}

      <div
        className="
          absolute
          inset-0
          z-10
          max-w-[1140px]
          mx-auto
          left-0
          right-0
          px-5
          md:px-8
          flex
          items-center
          justify-end
          pointer-events-none
        "
      >

        {/* ================= LOCATION CARD ================= */}

        <div
          className="
            w-full
            max-w-[500px]
            bg-[#172235]
            text-white
            border-t-[3px]
            border-[#b39135]
            shadow-[0_18px_45px_rgba(0,0,0,0.28)]
            px-6
            py-7
            md:px-8
            md:py-8
            pointer-events-auto
          "
        >

          {/* SMALL HEADING */}

          <div className="flex items-center gap-2.5 mb-3">

            <MapPin
              size={16}
              strokeWidth={1.7}
              className="text-[#b39135]"
            />

            <span
              className="
                text-[9px]
                md:text-[10px]
                tracking-[3px]
                font-semibold
                text-[#c9a74d]
              "
            >
              SITE LOCATION
            </span>

          </div>

          {/* PROJECT NAME */}

          <h2
            className="
              font-elsie
              font-normal
              text-[27px]
              md:text-[34px]
              leading-[1.2]
              text-[#f6f4f0]
              mb-4
            "
          >
            {project.name || "Project Location"}
          </h2>

          {/* DIVIDER */}

          <div className="w-full h-px bg-white/20 mb-4" />

          {/* SITE LOCATION (ADDRESS) */}

          <div className="mb-5">

            <p
              className="
                text-[9px]
                md:text-[10px]
                tracking-[2px]
                font-semibold
                text-[#9ba5b5]
                mb-1.5
              "
            >
              SITE LOCATION
            </p>

            <p
              className="
                text-[13px]
                md:text-[14px]
                leading-[1.6]
                text-[#e4e7ec]
                font-medium
              "
            >
              {project.location || "Location not available"}
            </p>

          </div>

          {/* REGISTERED RERA NO. */}

          {project.reraNumber && (
            <div className="mb-6">

              <p
                className="
                  text-[9px]
                  md:text-[10px]
                  tracking-[2px]
                  font-semibold
                  text-[#9ba5b5]
                  mb-1.5
                "
              >
                REGISTERED RERA NO.
              </p>

              <p
                className="
                  text-[13px]
                  md:text-[14px]
                  leading-[1.6]
                  text-[#c9a74d]
                  font-semibold
                  tracking-[0.5px]
                "
              >
                {project.reraNumber}
              </p>

            </div>
          )}

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col gap-3">

            {/* DOWNLOAD BROCHURE */}

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-[50px]
                bg-[#f5f3ef]
                text-[#172235]
                flex
                items-center
                justify-between
                px-5
                group
                transition-all
                duration-300
                hover:bg-[#b39135]
                hover:text-white
              "
            >

              <span
                className="
                  text-[10px]
                  md:text-[11px]
                  tracking-[1.4px]
                  font-semibold
                  whitespace-nowrap
                "
              >
                DOWNLOAD BROCHURE
              </span>

              <Download
                size={16}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-[2px]
                "
              />

            </a>

            {/* GET DIRECTIONS */}

            <a
              href={
                project.locationUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  project.location || ""
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-[50px]
                border
                border-white/30
                text-white
                flex
                items-center
                justify-between
                px-5
                group
                transition-all
                duration-300
                hover:border-[#b39135]
                hover:bg-white/10
              "
            >

              <span
                className="
                  text-[10px]
                  md:text-[11px]
                  tracking-[1.2px]
                  font-semibold
                  whitespace-nowrap
                "
              >
                GET DIRECTIONS
              </span>

              <ExternalLink
                size={16}
                strokeWidth={1.7}
                className="
                  text-[#b39135]
                  transition-transform
                  duration-300
                  group-hover:translate-x-[2px]
                  group-hover:-translate-y-[2px]
                "
              />

            </a>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>
     

    </div>
  );
};

export default ProjectDetails;