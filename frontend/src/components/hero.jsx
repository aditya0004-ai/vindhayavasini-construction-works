import React from "react";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Users,
  Settings,
} from "lucide-react";

// IMAGE URLS
const buildingImage =
  "https://res.cloudinary.com/dermilxpz/image/upload/v1787765992/ChatGPT_Image_Aug_26_2026_11_09_31_PM_luaamv.png";

const processSteps = [
  {
    number: "01",
    title: "Excavation",
    description: "Site preparation and land excavation",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787764711/ChatGPT_Image_Aug_26_2026_10_47_16_PM_ep2azc.png",
  },
  {
    number: "02",
    title: "Foundation",
    description: "Foundation laying and base preparation",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787764696/ChatGPT_Image_Aug_26_2026_10_46_24_PM_nnyzgz.png",
  },
  {
    number: "03",
    title: "Columns",
    description: "Column construction and reinforcement",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787764781/ChatGPT_Image_Aug_26_2026_10_49_28_PM_jyytkw.png",
  },
  {
    number: "04",
    title: "Structure",
    description: "Floor construction and structural work",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787764895/ChatGPT_Image_Aug_26_2026_10_51_15_PM_pzdjat.png",
  },
  {
    number: "05",
    title: "Finishing",
    description: "Interior and exterior finishing work",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787765170/ChatGPT_Image_Aug_26_2026_10_55_28_PM_iz3qua.png",
  },
  {
    number: "06",
    title: "Complete",
    description: "Final touches and quality inspection",
    src: "https://res.cloudinary.com/dermilxpz/image/upload/v1787765182/ChatGPT_Image_Aug_26_2026_10_55_36_PM_kvzdxj.png",
  },
];

const features = [
  { icon: ShieldCheck, title: "Safe", subtitle: "Construction" },
  { icon: Leaf, title: "Sustainable", subtitle: "Design" },
  { icon: Users, title: "Expert", subtitle: "Team" },
  { icon: Settings, title: "Quality", subtitle: "Materials" },
];

const ConstructionHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#00152D] text-white">

      {/* subtle background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#f6a400]/5 blur-[120px]" />

      {/* ================= HERO ================= */}
      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        <div className="grid min-h-[560px] items-center gap-4 lg:grid-cols-[44%_56%]">

          {/* LEFT */}
          <div className="relative z-10 py-12 lg:py-14">

            <p className="mb-4 text-xs font-semibold tracking-[3px] text-[#f6a400]">
              WE BUILD YOUR DREAM
            </p>

            <h1 className="max-w-[650px] text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl xl:text-[68px]">
              Building Tomorrow,
              <br />
              <span className="text-[#ffab00]">Today.</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-6 text-gray-300 sm:text-base">
              Experience modern construction powered by innovative 3D
              technology, expert craftsmanship, and sustainable building
              practices.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-full bg-[#f6a400] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-[#ffb52b] hover:-translate-y-0.5">
                <Phone size={18} />
                Contact Us
              </button>

              <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-[#f6a400] hover:text-[#f6a400]">
                Our Projects
                <ArrowRight size={16} />
              </button>
            </div>

            {/* FEATURES */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group flex items-center gap-3 sm:block"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f6a400]/10">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#f6a400]"
                      />
                    </div>

                    <div className="sm:mt-2">
                      <p className="text-xs font-semibold text-white">
                        {feature.title}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex items-center justify-center lg:-ml-8">
            <div className="absolute h-[380px] w-[380px] rounded-full bg-[#f6a400]/10 blur-[100px]" />

            <img
              src={buildingImage}
              alt="Modern construction building"
              className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </div>

      {/* ================= PROCESS ================= */}
      <div className="relative mx-3 mb-4 rounded-[22px] border border-white/10 bg-[#061526]/90 shadow-2xl backdrop-blur-sm sm:mx-5 lg:mx-8">

        {/* Header */}
        <div className="flex flex-col items-center px-5 pt-7 text-center">
          <p className="text-[10px] font-semibold tracking-[3px] text-[#f6a400] sm:text-xs">
            CONSTRUCTION PROCESS
          </p>

          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            From Concept to Creation
          </h2>

          <div className="mt-3 h-[2px] w-10 rounded-full bg-[#f6a400]" />
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-[1450px] px-4 py-7 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">

            {processSteps.map((step, index) => (
              <div key={step.number} className="group relative">

                {/* Image Card */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1829] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#f6a400]/60 group-hover:shadow-lg group-hover:shadow-black/30">

                  {/* Number */}
                  <div className="absolute left-2.5 top-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#00152D]/85 text-[10px] font-bold text-[#f6a400] backdrop-blur-sm">
                    {step.number}
                  </div>

                  {/* Image */}
                  <div className="h-[125px] overflow-hidden sm:h-[135px] lg:h-[120px]">
                    <img
                      src={step.src}
                      alt={step.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#071321] to-transparent" />
                </div>

                {/* Arrow */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute -right-4 top-[52px] z-30 hidden lg:flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#061526]">
                    <ArrowRight
                      size={13}
                      className="text-[#f6a400]"
                    />
                  </div>
                )}

                {/* Text */}
                <div className="px-1 pt-3 text-center">
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-1 max-w-[170px] text-[10px] leading-4 text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionHero;
