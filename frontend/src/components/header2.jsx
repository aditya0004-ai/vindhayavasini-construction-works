import { ChevronDown, Phone, Mail } from "lucide-react";

const Header2 = () => {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-white
        shadow-md
        transition-all
        duration-300
      "
    >
      <div
        className="
          max-w-[1800px]
          mx-auto
          h-[80px]
          px-8
          lg:px-65
          flex
          items-center
          justify-between
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787848495/ChatGPT_Image_Aug_27_2026_02_30_52_AM_oyvtse.png"
            alt="Vindhayavasini Constructions Works"
            className="
              rounded-full
              w-[75px]
              h-auto
              object-contain
              transition-all
              duration-300
            "
          />
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center">

          {/* ABOUT US */}
          <a
            href="#"
            className="
              flex
              items-center
              gap-2
              px-5
              text-[14px]
              font-semibold
              tracking-[1.5px]
              text-[#222]
              hover:text-[#c99b22]
              transition-colors
              duration-300
              hover:underline
            "
          >
            ABOUT US
            <ChevronDown size={16} strokeWidth={2} />
          </a>

          {/* SEPARATOR */}
          <span className="h-5 w-[1px] bg-gray-300" />

          {/* PROJECTS */}
          <a
            href="#"
            className="
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              text-[#222]
              hover:text-[#c99b22]
              transition-colors
              duration-300
              hover:underline
            "
          >
            PROJECTS
          </a>

          {/* SEPARATOR */}
          <span className="h-5 w-[1px] bg-gray-300" />

          {/* BLOGS */}
          <a
            href="#"
            className="
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              text-[#222]
              hover:text-[#c99b22]
              transition-colors
              duration-300
              hover:underline
            "
          >
            BLOGS
          </a>

          {/* SEPARATOR */}
          <span className="h-5 w-[1px] bg-gray-300" />

          {/* CAREERS */}
          <a
            href="#"
            className="
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              text-[#222]
              hover:text-[#c99b22]
              transition-colors
              duration-300
              hover:underline
            "
          >
            CAREERS
          </a>

          {/* SEPARATOR */}
          <span className="h-5 w-[1px] bg-gray-300" />

          {/* CONTACT */}
          <a
            href="#"
            className="
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              text-[#222]
              hover:text-[#c99b22]
              transition-colors
              duration-300
              hover:underline
            "
          >
            CONTACT
          </a>
        </nav>

        {/* ================= RIGHT ICONS ================= */}
        <div className="flex items-center gap-3">

          {/* PHONE */}
          <a
            href="tel:+919999999999"
            className="
              w-[44px]
              h-[44px]
              rounded-full
              bg-[#101a2d]
              flex
              items-center
              justify-center
              text-white
              hover:bg-white
              hover:text-[#101a2d]
              transition-all
              duration-300
            "
          >
            <Phone size={18} strokeWidth={1.8} />
          </a>

          {/* MAIL */}
          <a
            href="mailto:info@example.com"
            className="
              w-[44px]
              h-[44px]
              rounded-full
              bg-[#101a2d]
              flex
              items-center
              justify-center
              text-white
              hover:bg-white
              hover:text-[#101a2d]
              transition-all
              duration-300
            "
          >
            <Mail size={18} strokeWidth={1.8} />
          </a>

        </div>
      </div>
    </header>
  );
};

export default Header2;