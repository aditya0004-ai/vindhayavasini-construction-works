import { Hammer } from "lucide-react";

const BuildCTA = () => {
  return (
    <section
      className="
        relative
        w-full
        min-h-[200px]
        md:min-h-[240px]
        lg:min-h-[280px]
        overflow-hidden
        bg-[#071522]
      "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dermilxpz/image/upload/v1787765182/ChatGPT_Image_Aug_26_2026_10_55_36_PM_kvzdxj.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#061321]/40" />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[200px]
          md:min-h-[240px]
          lg:min-h-[280px]
          max-w-[1600px]
          flex-col
          items-start
          justify-center
          gap-3
          px-6
          sm:px-10
          md:px-16
          lg:px-[7%]
          py-8
        "
      >
        {/* Icon accent */}
        <div className="flex items-center gap-2 text-[#c9a258]">
          <Hammer size={14} strokeWidth={1.75} />
          <span className="text-[10px] font-medium uppercase tracking-[3px]">
            Let's Get Started
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            max-w-[560px]
            font-serif
            text-[22px]
            font-light
            leading-[1.1]
            tracking-[-0.5px]
            text-white
            sm:text-[28px]
            md:text-[34px]
            lg:text-[38px]
          "
        >
          Ready to build your dream?
        </h2>

        {/* Supporting paragraph */}
        <p
          className="
            max-w-[400px]
            text-[13px]
            font-light
            leading-relaxed
            text-white/75
          "
        >
          Schedule a visit with our team and let's turn your vision into a
          reliable, well-crafted reality.
        </p>

        {/* Button */}
      <a
  href="tel:+919415664728"
  className="
    inline-block
    mt-2
    bg-[#c9a258]
    px-6
    py-2.5
    text-[11px]
    font-medium
    uppercase
    tracking-[2.5px]
    text-[#111820]
    transition-all
    duration-300
    hover:bg-[#d7b66c]
    hover:-translate-y-0.5
  "
>
  Schedule a Visit
</a>
      </div>
    </section>
  );
};

export default BuildCTA;