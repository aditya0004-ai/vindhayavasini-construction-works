const values = [
  {
    number: "01",
    title: "Trust",
    description:
      "Two decades. Thousands of families. Every commitment delivered with clarity, compliance and care.",
  },
  {
    number: "02",
    title: "Quality",
    description:
      "Construction held to enduring standards, with materials and craftsmanship chosen to last.",
  },
  {
    number: "03",
    title: "Innovation",
    description:
      "New methods, thoughtful planning and design choices that improve everyday living.",
  },
  {
    number: "04",
    title: "Legacy",
    description:
      "As part of the BBD Group, we build for generations—not just for today, but for decades ahead.",
  },
  {
    number: "05",
    title: "Community",
    description:
      "More than just residences. We design vibrant neighborhoods where people connect, grow, and thrive together.",
  },
];

const WhyUs = () => {
  return (
    <section className="bg-[#fcfbf8] py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-0">

          {/* =========================================
              LEFT CONTENT
          ========================================== */}
          <div className="relative pr-0 lg:pr-12 xl:pr-14">

            {/* Small Label */}
            <div className="inline-flex items-center gap-2 border border-[#172033] px-5 py-2 mb-6">
              <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[#172033] text-[8px]">
                ✓
              </span>

              <span className="text-[10px] tracking-[0.2em] font-medium text-[#172033]">
                WHY VINDAYAVASINI CONSTRUCTIONS
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className="
                max-w-[440px]
                text-[#10182b]
                text-[32px] text-center
                sm:text-[38px] 
                lg:text-[42px]
                xl:text-[46px]
                leading-[1.22]
                font-light
                tracking-[-0.03em]
                font-serif
              "
            >
              Five values we've spent twenty years earning.
            </h2>

            {/* Building Illustration */}
            <div className="relative mt-4 lg:mt-5 w-full">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Viraj Constructions building"
                className="
                  w-full
                  max-w-[420px]
                  h-[180px]
                  object-cover
                  opacity-[0.10]
                  mix-blend-multiply
                  grayscale
                "
              />

              {/* Fade overlay to create sketch-like appearance */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf8] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* =========================================
              RIGHT VALUES
          ========================================== */}
          <div className="border-t border-[#e6d9bd] mb-5 mt-3">

            {values.map((value, index) => (
              <div
                key={value.number}
                className="
                  group
                  grid
                  grid-cols-[52px_1fr]
                  xl:grid-cols-[64px_0.9fr_1.3fr]
                  gap-x-3
                  xl:gap-x-0
                  min-h-[92px]
                  xl:min-h-[100px]
                  border-b
                  border-[#e6d9bd]
                  items-center
                  transition-all
                  duration-300
                  hover:bg-[#f8f5ee]
                  px-0
                  xl:px-0
                  mb-8
                "
              >

                {/* Number */}
                <div
                  className="
                    text-[#c6a052]
                    text-[26px]
                    lg:text-[28px]
                    xl:text-[30px]
                    font-light
                    leading-none
                    mb-6 mt-3
                    md:mb-0
                    ml-25
                    md:ml-0
                  "
                >
                  {value.number}
                </div>

                {/* Title */}
                <div
                  className="
                    xl:col-span-1
                    text-[#10182b]
                    text-[20px]
                    sm:text-[22px]
                    lg:text-[23px]
                    xl:text-[24px]
                    font-light
                    font-serif
                    leading-none
                    mb-6 mt-3
                    md:mb-0
                    ml-20
                    md:ml-0
                  "
                >
                  {value.title}
                </div>

                {/* Description */}
                <div
                  className="
                    col-span-2
                    xl:col-span-1
                    xl:pl-6
                    mt-[-4px]
                    xl:mt-0
                    pb-4
                    xl:pb-0
                    text-[#53647c]
                    text-[13px]
                    sm:text-[13.5px]
                    lg:text-[14px]
                    leading-[1.55]
                    font-light
                    max-w-[420px]
                    text-center
                 
                  "
                >
                  {value.description}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;