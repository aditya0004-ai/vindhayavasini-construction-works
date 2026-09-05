import { MessageSquare } from "lucide-react";

const GetInTouch = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="relative h-[550px] md:h-[550px] overflow-hidden">
        
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury office"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/6 to-black/14" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">

          {/* Top Badge */}
          <div className="mb-7 mt-20 flex items-center gap-3 border border-white/25 bg-white/5 px-7 py-2.5 backdrop-blur-sm">
            <MessageSquare
              size={15}
              strokeWidth={1.5}
              className="text-[#c9a34a]"
            />

            <span className="text-[10px] font-semibold tracking-[0.3em] text-white/85">
              GET IN TOUCH
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-elsie text-[48px] leading-[1.05] text-white md:text-[60px]">
            Start a
          </h2>

          <h2 className="font-elsie mt-2 text-[48px] leading-[1.05] text-[#c9a34a] md:text-[60px]">
            Conversation.
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-[760px] text-[17px] font-medium leading-relaxed text-white/85 md:text-[19px]">
            Whether you’re looking for your next luxury residence or a premium
            commercial space, our concierges are ready to assist you.
          </p>

         
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;