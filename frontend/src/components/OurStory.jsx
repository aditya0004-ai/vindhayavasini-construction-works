import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Building2,
  Crown,
  MapPin,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";

const OurStory = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Video URL
  const videoUrl =
    "https://media.istockphoto.com/id/473361357/video/cranes-at-a-skyscraper-construction.mp4?s=mp4-640x640-is&k=20&c=iuAGLUb6XsMmTIEE4IsHLQvA2rUguMiUIGjq5cWacDk=";

  // Poster image URL
  const posterImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked by browser");
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const stats = [
    {
      icon: Crown,
      number: "20+",
      text: "Years of Experience & Trust",
    },
    {
      icon: Building2,
      number: "318",
      text: "Acres Flagship Township",
    },
    {
      icon: MapPin,
      number: "7",
      text: "Total Projects",
    },
    {
      icon: Building2,
      number: "1,325+",
      text: "Apartments Sold",
    },
  ];

  return (
    <section className="w-full bg-[#f8f7f4] px-5 py-12 md:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1360px]">

        {/* ==============================
            TOP / OUR STORY
        ============================== */}
        <div className="text-center">

          {/* Our Story Button */}
          <div className=" flex justify-center py-8">
            <div className="inline-flex items-center gap-2.5 border border-[#172033] px-6 py-2">
              <BookOpen
                size={17}
                strokeWidth={1.5}
                className="text-[#c49a3a]"
              />

              <span className="text-[15px] font-medium tracking-[0.22em] text-[#111827]">
                OUR STORY
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="mx-auto max-w-3xl font-elsie text-[30px] font-light leading-[1.15] tracking-[-0.02em] text-[#151515] sm:text-[36px] md:text-[42px] lg:text-[55px]">
            Building India's future,
            <br />
            one <span className="text-[#c49a3a]">landmark at a time.</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-3xl text-[15px] font-light leading-6 text-[#55708a] md:text-[15px] md:leading-7">
            With over 20 years of building trust, Vindhayavasini Constructions creates
            more than just structures; it develops thriving communities and
            landmark spaces where people build a lifetime of memories.
          </p>
        </div>

        {/* ==============================
            STATS + VIDEO
        ============================== */}
        <div className="mt-15 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10 ">

          {/* ==============================
              LEFT SIDE
          ============================== */}
          <div className="w-full">

            {/* Stats */}
            <div className="w-full">

              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    className="relative flex min-h-[76px] items-center border-b border-[#dfd8c8]"
                  >

                    {/* Icon */}
                    <div className="flex w-[52px] shrink-0 justify-center border-r border-[#ddcda8] py-3">
                      <Icon
                        size={20}
                        strokeWidth={1.4}
                        className="text-[#c49a3a]"
                      />
                    </div>

                    {/* Number */}
                    <div className="ml-5 mr-5 md:mr-15 w-[80px] shrink-0">
                      <span className="font-sans text-[30px] font-light tracking-[-0.03em] text-[#071936] md:text-[37px]">
                        {stat.number}
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <span className="font-serif text-[15px] text-[#071936] md:text-[16px]">
                        {stat.text}
                      </span>
                    </div>

                    {/* Small diamond */}
                    <div className="absolute -bottom-[5px] left-[50%] z-10 flex h-2.5 w-2.5 -translate-x-1/2 rotate-45 items-center justify-center border border-[#dfcfad] bg-[#f8f7f4]">
                      <div className="h-[2px] w-[2px] bg-[#c49a3a]" />
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Buttons */}
            <div className="mt-13 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* About Vindhayavasini */}
              <a
                href="/about"
                className="
    group
    flex
    h-[50px]
    items-center
    justify-center
    gap-2
    bg-[#0d1629]
    px-5
    text-[12px]
    font-semibold
    tracking-wide
    text-white
    transition-all
    duration-300
    hover:bg-[#c49a3a]
  "
              >
                <span>ABOUT VINDHAYAVASINI CONSTRUCTIONS</span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="
      text-[#c49a3a]
      transition-transform
      duration-300
      group-hover:translate-x-1
      group-hover:text-white
    "
                />
              </a>



            </div>
          </div>

          {/* ==============================
              RIGHT SIDE VIDEO
          ============================== */}
          <div className="relative w-full">

            {/* Gold Border */}
            <div className="border-[3px] border-[#c49a3a] p-0">

              <div className="relative aspect-[1.35/1] w-full overflow-hidden bg-gray-200">

                {/* Video */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={videoUrl}
                  poster={posterImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />

                {/* Slight overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/5" />

                {/* Sound Button */}
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="
                    absolute
                    bottom-3
                    right-3
                    z-20
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    border
                    border-white/30
                    bg-[#101827]/80
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:bg-[#101827]
                  "
                >
                  {muted ? (
                    <VolumeX size={15} strokeWidth={1.5} />
                  ) : (
                    <Volume2 size={15} strokeWidth={1.5} />
                  )}
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;