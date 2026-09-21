import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image:
      "https://res.cloudinary.com/wcimdxco/image/upload/v1789905368/vindhayavasini-construction/projects/x9o4z5wbuyxim7jawpij.jpg",

    title: "POLICE LINE DEVELOPMENT PROJECT",
    href: "/projects/police-line-development-project",

    subtitle:
      "Building a Secure and Modern Future for Our Police Force",

    description:
      "Secure police infrastructure with residential, administrative, and operational facilities, developed for efficient service and long-term use."
  },

  {
    image:
      "https://res.cloudinary.com/wcimdxco/image/upload/v1789912814/vindhayavasini-construction/projects/tklkp7fsd1b1g2ybwll9.jpg",

    title: "UNITECH UNIHOMES PHASE 4",
    href: "/projects/unitech-unihomes-phase-4",

    subtitle:
      "Homes that compliment you",

    description:
      "Thoughtfully planned residences with comfortable homes, landscaped surroundings, and well-designed community spaces for everyday living.",
  },

  {
    image:
      "https://res.cloudinary.com/wcimdxco/image/upload/v1789916184/vindhayavasini-construction/projects/dor9qbpb9xufyu4ufuuc.jpg",

    title: "COMMISSIONER OFFICE",
    href: "/projects/commissioner-office",

    subtitle:
      "A Modern Administrative Facility Designed for Efficient Governance and Public Service",

    description:
      "A well-planned administrative facility featuring functional spaces, efficient planning, and a professional environment for public service and governance.",
  },

  {
    image:
      "https://res.cloudinary.com/wcimdxco/image/upload/v1789964827/vindhayavasini-construction/projects/zmkszjzmbufesffc7xy2.jpg",

    title: "DISTRICT COURT",
    href: "/projects/district-court",

    subtitle:
      "Modern Judicial Infrastructure for Efficient and Accessible Justice",

    description:
      "A modern district court facility designed with dedicated courtrooms, administrative spaces, and efficient infrastructure for judicial services.",
  },
 
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // =========================
  // AUTO SLIDER
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden">

      {/* =========================
    BACKGROUND IMAGES
========================= */}
      {slides.map((item, index) => {
        const isActive = activeSlide === index;

        return (
          <img
            key={index}
            src={item.image}
            alt={item.title}
            className={`
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-opacity
            duration-1000
            ease-in-out
        ${isActive
                ? "opacity-100 animate-kenburns"
                : "opacity-0 scale-[1.13]"
              }
      `}
          />
        );
      })}

      {/* =========================
          DARK OVERLAY
      ========================= */}
      <div className="absolute inset-0 bg-black/30" />

      {/* =========================
          LEFT DARK GRADIENT
      ========================= */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/80
          via-black/60
          to-transparent
        "
      />

      {/* =========================
          HERO CONTENT
      ========================= */}
      <div
        className="
          relative
          z-10
          h-full
          max-w-[1800px]
          mx-auto
          px-8
          lg:px-55
          flex
          items-center
        "
      >
        <div
          key={activeSlide}
          className="
            w-full
            max-w-[850px]
            pt-[70px]
            animate-fadeIn
          "
        >

          {/* TITLE */}
          <h1
            className="
              text-white
              font-elsie
              text-[36px]
              sm:text-[52px]
              md:text-[58px]
              lg:text-[58px]
              xl:text-[58px]
              leading-[1.05]
              tracking-[-1px]
            "
          >
            {slide.title}
          </h1>

          {/* SUBTITLE */}
          <h2
            className="
              mt-3
              text-[#c99b22]
              text-[17px]
              md:text-[19px]
              lg:text-[19px]
              font-medium
            "
          >
            {slide.subtitle}
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-3
              md:mt-4
              max-w-[650px]
              text-white
              text-[16px]
              md:text-[17px]
              leading-[1.7]
              font-semibold
            "
          >
            {slide.description}
          </p>

          {/* KNOW MORE BUTTON */}
          <a
            href={slide.href}
            className="
    group
    mt-7
    md:mt-9
    w-[200px]
    h-[55px]
    flex
    items-center
    justify-center
    gap-6
    border
    border-white
    bg-[#101a2d]
    text-white
    text-[16px]
    font-semibold
    tracking-wide
    hover:bg-[#c99b22]
    transition-all
    duration-300
  "
          >
            <span>KNOW MORE</span>

            <ArrowRight
              size={22}
              strokeWidth={1.7}
              className="
      text-[#c99b22]
      group-hover:text-white
      group-hover:translate-x-1
      transition-all
    "
            />
          </a>
        </div>
      </div>

      {/* =========================
          SLIDER DOTS
      ========================= */}
      <div
        className="
          absolute
          z-20
          md:bottom-10
          bottom-12
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-3
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              w-[15px]
              h-[15px]
              rounded-[4px]
              border
              border-white
              transition-all
              duration-300
              ${activeSlide === index
                ? "bg-[#101a2d]"
                : "bg-transparent"
              }
            `}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;