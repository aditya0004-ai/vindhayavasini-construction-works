import { Layers } from "lucide-react";

const PortfolioHero = () => {
  return (
    <section className="relative overflow-hidden bg-[white] pt-34 pb-16">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#e9e9e9]/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        {/* Portfolio Label */}
        <div className="inline-flex items-center gap-2 border border-gray-300 bg-white/30 px-4 py-2 mb-7">
          <Layers size={16} strokeWidth={1.8} className="text-[#b18a2e]" />
          <span className="text-[12px] tracking-[3px] text-[#2d3540] font-medium">
            OUR PORTFOLIO
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[#29313d] text-[44px] md:text-[47px] leading-[1.1] font-light">
          Masterpieces in
        </h1>

        <h2 className="font-serif text-[#b18a2e] text-[48px] md:text-[47px] leading-[1.1] font-light mt-1">
          Concrete.
        </h2>

        {/* Description */}
        <p className="max-w-[680px] mx-auto mt-6 text-[15px] md:text-[16px] leading-[1.6] text-[#596575] font-light">
          Explore our curated collection of integrated townships, luxury
          residences, and landmark commercial destinations.
        </p>

      </div>
    </section>
  );
};

export default PortfolioHero;