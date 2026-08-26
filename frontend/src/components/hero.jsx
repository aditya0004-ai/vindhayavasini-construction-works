import React from "react";
import {
  PlayCircle,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Users,
  Settings,
} from "lucide-react";

// ==========================================
// IMAGE URLS
// Replace these URLs with your actual images
// ==========================================

const buildingImage =
  "https://res.cloudinary.com/dermilxpz/image/upload/v1787765992/ChatGPT_Image_Aug_26_2026_11_09_31_PM_luaamv.png";


// ==========================================
// CONSTRUCTION PROCESS
// Each step has its own image URL
// ==========================================

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


// ==========================================
// FEATURES
// ==========================================

const features = [
  {
    icon: ShieldCheck,
    title: "Safe",
    subtitle: "Construction",
  },

  {
    icon: Leaf,
    title: "Sustainable",
    subtitle: "Design",
  },

  {
    icon: Users,
    title: "Expert",
    subtitle: "Team",
  },

  {
    icon: Settings,
    title: "Quality",
    subtitle: "Materials",
  },
];


// ==========================================
// MAIN COMPONENT
// ==========================================

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#020b18] text-white overflow-hidden">

      {/* ======================================
          HERO SECTION
      ====================================== */}

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-12 pt-10 lg:pt-14">

        <div className="grid lg:grid-cols-[42%_58%] items-center min-h-[650px]">


          {/* ==================================
              LEFT CONTENT
          ================================== */}

          <div className="relative z-10">

            {/* Small Heading */}

            <p className="text-[#f6a400] font-semibold tracking-[4px] text-sm mb-6">
              WE BUILD YOUR DREAM
            </p>


            {/* Main Heading */}

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05]">

              Building Tomorrow,

              <br />

              <span className="text-[#ffab00]">
                Today.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-8 max-w-xl text-gray-300 text-base md:text-lg leading-8">

              Experience the power of modern construction
              with innovative 3D technology and sustainable
              building practices.

            </p>


            {/* ==================================
                BUTTONS
            ================================== */}

            <div className="flex flex-wrap gap-5 mt-9">

              {/* Watch Animation */}

              <button
                className="
                  flex
                  items-center
                  gap-3
                  bg-[#f6a400]
                  hover:bg-[#ffb52b]
                  text-white
                  font-semibold
                  px-7
                  py-3.5
                  rounded-full
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-orange-500/20
                "
              >

                <PlayCircle size={21} />

                Contact

              </button>


              {/* Our Projects */}

              <button
                className="
                  flex
                  items-center
                  gap-2
                  border
                  border-gray-500
                  hover:border-[#f6a400]
                  hover:text-[#f6a400]
                  px-7
                  py-3.5
                  rounded-full
                  font-semibold
                  transition-all
                  duration-300
                "
              >

                Our Projects

              </button>

            </div>


            {/* ==================================
                FEATURES
            ================================== */}

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-6
                mt-16
                max-w-2xl
              "
            >

              {features.map((feature, index) => {

                const Icon = feature.icon;

                return (

                  <div
                    key={index}
                    className="flex flex-col gap-1"
                  >

                    <Icon
                      size={27}
                      strokeWidth={1.7}
                      className="text-[#f6a400]"
                    />

                    <p className="text-sm font-medium text-white mt-1">
                      {feature.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {feature.subtitle}
                    </p>

                  </div>

                );

              })}

            </div>

          </div>


          {/* ==================================
              MAIN BUILDING IMAGE
          ================================== */}

          <div
            className="
              relative
              lg:-ml-10
              xl:-ml-20
              mt-10
              lg:mt-0
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                inset-10
                bg-[#f6a400]/10
                blur-[100px]
                rounded-full
              "
            />


            {/* Building */}

            <img
              src={buildingImage}
              alt="Modern construction building"
              className="
                relative
                w-full
                object-contain
                drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]
              "
            />

          </div>

        </div>

      </div>


      {/* ======================================
          CONSTRUCTION PROCESS SECTION
      ====================================== */}

      <div
        className="
          relative
          mx-3
          md:mx-6
          rounded-[25px]
          border
          border-gray-700/80
          bg-[#041223]/90
          overflow-hidden
        "
      >

        {/* ==================================
            PROCESS HEADER
        ================================== */}

        <div className="text-center pt-7 md:pt-8">

          <p
            className="
              text-[#f6a400]
              font-semibold
              tracking-[3px]
              text-xs
              md:text-sm
            "
          >
            CONSTRUCTION PROCESS
          </p>


          <h2
            className="
              text-2xl
              md:text-3xl
              font-bold
              mt-3
            "
          >
            From Concept to Creation
          </h2>

        </div>


        {/* ==================================
            PROCESS CARDS
        ================================== */}

        <div
          className="
            max-w-[1450px]
            mx-auto
            px-5
            md:px-8
            py-8
          "
        >

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-6
              gap-8
            "
          >

            {processSteps.map((step, index) => (

              <div
                key={step.number}
                className="relative"
              >

                {/* ==================================
                    CARD
                ================================== */}

                <div
                  className="
                    group
                    relative
                    rounded-2xl
                    border
                    border-gray-600/80
                    bg-[#0b1829]
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#f6a400]/70
                    hover:shadow-xl
                    hover:shadow-black/30
                  "
                >

                  {/* Number */}

                  <div
                    className="
                      absolute
                      top-3
                      left-3
                      z-20
                      text-[#f6a400]
                      font-semibold
                      text-lg
                    "
                  >
                    {step.number}
                  </div>


                  {/* ==================================
                      PROCESS IMAGE
                  ================================== */}

                  <div
                    className="
                      h-[170px]
                      overflow-hidden
                      bg-[#101c2c]
                    "
                  >

                    <img
                      src={step.src}
                      alt={step.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                  </div>

                </div>


                {/* ==================================
                    ARROW
                ================================== */}

                {index !== processSteps.length - 1 && (

                  <div
                    className="
                      hidden
                      xl:flex
                      absolute
                      top-[75px]
                      -right-7
                      z-30
                      items-center
                      justify-center
                    "
                  >

                    <ArrowRight
                      size={24}
                      className="text-white"
                    />

                  </div>

                )}


                {/* ==================================
                    CARD TEXT
                ================================== */}

                <div className="text-center mt-4">

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    {step.title}
                  </h3>


                  <p
                    className="
                      text-sm
                      text-gray-400
                      leading-5
                      mt-1
                      px-2
                    "
                  >
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

export default Hero;