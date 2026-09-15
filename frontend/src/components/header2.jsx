import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react";

const Header2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ================================================= */}
      {/* ================= DESKTOP HEADER ================ */}
      {/* ================================================= */}

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
            h-[83px]
            px-6
            lg:px-65
            flex
            items-center
            justify-between
          "
        >

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787848495/ChatGPT_Image_Aug_27_2026_02_30_52_AM_oyvtse.png"
              alt="Vindhayavasini Constructions Works"
              className="
                rounded-full
                w-[68px]
                sm:w-[75px]
                h-auto
                object-contain
                transition-all
                duration-300
              "
            />
          </Link>


          {/* ================================================= */}
          {/* ================= DESKTOP NAV =================== */}
          {/* ================================================= */}

          <nav className="hidden lg:flex items-center">

            {/* ABOUT US */}

            <Link
              to="/about"
              className="
                flex
                items-center
                gap-2
                px-4
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

              <ChevronDown
                size={16}
                strokeWidth={2}
              />
            </Link>


            {/* SEPARATOR */}

            <span className="h-5 w-[1px] bg-gray-300" />


            {/* PROJECTS */}

            <Link
              to="/projects"
              className="
                px-4
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
            </Link>


           

           


           


            {/* SEPARATOR */}

            <span className="h-5 w-[1px] bg-gray-300" />


            {/* CAREERS */}

            <Link
              to="/careers"
              className="
                px-4
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
            </Link>


            {/* SEPARATOR */}

            <span className="h-5 w-[1px] bg-gray-300" />


            {/* CONTACT */}

            <Link
              to="/contact"
              className="
                px-4
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
            </Link>

          </nav>


          {/* ================================================= */}
          {/* ================= RIGHT ICONS =================== */}
          {/* ================================================= */}

          <div className="flex items-center gap-3">

            {/* PHONE */}

            <a
              href="tel:+919999999999"
              className="
                hidden
                lg:flex
                w-[44px]
                h-[44px]
                rounded-full
                bg-[#101a2d]
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
                hidden
                lg:flex
                w-[44px]
                h-[44px]
                rounded-full
                bg-[#101a2d]
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


            {/* ================================================= */}
            {/* =============== MOBILE MENU BUTTON ============= */}
            {/* ================================================= */}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
                lg:hidden
                w-[44px]
                h-[44px]
                flex
                items-center
                justify-center
                text-[#101a2d]
              "
              aria-label="Open menu"
            >
              <Menu
                size={27}
                strokeWidth={1.5}
              />
            </button>

          </div>

        </div>
      </header>


      {/* ===================================================== */}
      {/* ================= MOBILE MENU ====================== */}
      {/* ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[100]
          bg-white
          lg:hidden
          transition-all
          duration-500
          ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >

        {/* ================= TOP BAR ================= */}

        <div
          className="
            h-[82px]
            px-6
            flex
            items-center
            justify-between
          "
        >

          {/* LOGO */}

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="https://res.cloudinary.com/dcqcmt2h5/image/upload/v1787848495/ChatGPT_Image_Aug_27_2026_02_30_52_AM_oyvtse.png"
              alt="Vindhayavasini Constructions Works"
              className="
                w-[70px]
                h-auto
                object-contain
                rounded-full
              "
            />
          </Link>


          {/* CLOSE BUTTON */}

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="
              w-[42px]
              h-[42px]
              flex
              items-center
              justify-center
              text-[#222]
            "
            aria-label="Close menu"
          >
            <X
              size={27}
              strokeWidth={1.3}
            />
          </button>

        </div>


        {/* ================= MENU CONTENT ================= */}

        <div
          className="
            px-7
            pt-8
            pb-[105px]
            h-[calc(100vh-82px)]
            overflow-y-auto
            flex
            flex-col
          "
        >

          {/* ================= ABOUT US ================= */}

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="
              py-4
              border-t
              border-gray-200
              text-[18px]
              text-[#4b5261]
              font-serif
            "
          >
            About Us
          </Link>


          {/* ================= PROJECTS ================= */}

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="
              border-t
              border-gray-200
              py-4
              text-[18px]
              text-[#4b5261]
              font-serif
            "
          >
            Home
          </Link>





          {/* ================= CAREERS ================= */}

          <Link
            to="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="
              border-t
              border-gray-200
              py-4
              text-[18px]
              text-[#4b5261]
              font-serif
            "
          >
            Careers
          </Link>


          {/* ================= CONTACT ================= */}

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="
              border-t
              border-gray-200
              py-4
              text-[18px]
              text-[#4b5261]
              font-serif
            "
          >
            Contact
          </Link>

        </div>


        {/* ================================================= */}
        {/* ================ BOTTOM BUTTONS ================= */}
        {/* ================================================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            bg-white
            px-6
            pb-5
            pt-3
          "
        >

          <div
            className="
              border-t
              border-gray-200
              pt-4
              flex
              gap-2
            "
          >

            {/* CALL US */}

            <a
              href="tel:+919415664728"
              className="
                flex-1
                h-[40px]
                bg-[#101a2d]
                flex
                items-center
                justify-center
                gap-2
                text-white
                text-[10px]
                font-semibold
                tracking-[0.7px]
              "
            >
              <Phone
                size={13}
                strokeWidth={1.8}
                className="text-[#c49a32]"
              />

              CALL US
            </a>


            {/* EMAIL US */}

            <a
              href="mailto:ravimum82@gmail.com"
              className="
                flex-1
                h-[40px]
                bg-[#101a2d]
                flex
                items-center
                justify-center
                gap-2
                text-white
                text-[10px]
                font-semibold
                tracking-[0.7px]
              "
            >
              <Mail
                size={13}
                strokeWidth={1.8}
                className="text-[#c49a32]"
              />

              EMAIL US
            </a>

          </div>

        </div>

      </div>
    </>
  );
};

export default Header2;