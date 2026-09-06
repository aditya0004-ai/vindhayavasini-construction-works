import { BriefcaseBusiness } from "lucide-react";

const JoinTeam = () => {
  return (
    <section className="relative overflow-hidden">

      {/* Compact Container */}
      <div className="relative lg:h-[550px] overflow-hidden md:h-[430px] py-18 md:py-0">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=85"
          alt="Join Our Team"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Additional Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <div className="max-w-4xl">

            {/* Top Badge */}
            <div className="mb-10 mt-10 inline-flex items-center gap-3 border border-white/20 bg-black/20 px-6 py-3 backdrop-blur-md">
              <BriefcaseBusiness
                size={17}
                className="text-[#c79a2b]"
              />

              <span className="text-[8px] md:text-[10px] font-semibold tracking-[4px] text-white/90">
                JOIN OUR TEAM
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-elsie text-[46px] leading-[0.95] text-white md:text-[60px]">
              Shape the

              <span className="mt-4 block text-[#c79a2b]">
                Skyline.
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-[19px] font-semibold">
              Join a legacy of excellence. We are looking for visionary minds
              to build the future of luxury real estate.
            </p>

          

          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinTeam;