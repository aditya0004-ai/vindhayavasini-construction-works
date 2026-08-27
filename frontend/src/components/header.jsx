import { useEffect, useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
       fixed
       top-0
       left-0
       w-full
       z-50
       transition-all
       duration-500
    ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
        }
  `}
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
            src={
              scrolled
                ? "https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787848495/ChatGPT_Image_Aug_27_2026_02_30_52_AM_oyvtse.png"
                : "https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787849148/ChatGPT_Image_Aug_27_2026_09_45_36_AM_omywnd.png"
            }
            // alt="Vindhayavasini Constructions Works"
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
            className={`
              flex
              items-center
              gap-2
              px-5
              text-[14px]
              font-semibold
              tracking-[1.5px]
              transition-colors
              duration-300
              hover:underline
              ${scrolled
                ? "text-[#222] hover:text-[#c99b22]"
                : "text-white hover:text-[#c99b22]"
              }
            `}
          >
            ABOUT US

            <ChevronDown
              size={16}
              strokeWidth={2}
            />
          </a>


          {/* SEPARATOR */}
          <span
            className={`
              h-5
              w-[1px]
              ${scrolled
                ? "bg-gray-300"
                : "bg-white/40"
              }
            `}
          />


          {/* PROJECTS */}
          <a
            href="#"
            className={`
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              transition-colors
              duration-300
              hover:underline
              ${scrolled
                ? "text-[#222] hover:text-[#c99b22]"
                : "text-white hover:text-[#c99b22]"
              }
            `}
          >
            PROJECTS
          </a>


          {/* SEPARATOR */}
          <span
            className={`
              h-5
              w-[1px]
              ${scrolled
                ? "bg-gray-300"
                : "bg-white/40"
              }
            `}
          />


          {/* BLOGS */}
          <a
            href="#"
            className={`
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              transition-colors
              duration-300
              hover:underline
              ${scrolled
                ? "text-[#222] hover:text-[#c99b22]"
                : "text-white hover:text-[#c99b22]"
              }
            `}
          >
            BLOGS
          </a>


          {/* SEPARATOR */}
          <span
            className={`
              h-5
              w-[1px]
              ${scrolled
                ? "bg-gray-300"
                : "bg-white/40"
              }
            `}
          />


          {/* CAREERS */}
          <a
            href="#"
            className={`
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              transition-colors
              duration-300
              hover:underline
              ${scrolled
                ? "text-[#222] hover:text-[#c99b22]"
                : "text-white hover:text-[#c99b22]"
              }
            `}
          >
            CAREERS
          </a>


          {/* SEPARATOR */}
          <span
            className={`
              h-5
              w-[1px]
              ${scrolled
                ? "bg-gray-300"
                : "bg-white/40"
              }
            `}
          />


          {/* CONTACT */}
          <a
            href="#"
            className={`
              px-5
              text-[14px]
              font-medium
              tracking-[1.5px]
              transition-colors
              duration-300
              hover:underline
              ${scrolled
                ? "text-[#222] hover:text-[#c99b22]"
                : "text-white hover:text-[#c99b22]"
              }
            `}
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
            <Phone
              size={18}
              strokeWidth={1.8}
            />
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
            <Mail
              size={18}
              strokeWidth={1.8}
            />
          </a>

        </div>

      </div>
    </header>
  );
};

export default Header;