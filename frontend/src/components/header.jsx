import { ChevronDown, Phone } from "lucide-react"
import { useRef, useState } from "react"

const navItems = [
  {label: "HOME", dropdown : null},
  {label: "COMPANY",
   dropdown: ["About us", "Our Team", "Careers"]
  },
  {label: "SERVICES",
    dropdown: ["Constructions", "Renovation", "Maintenance", "Consultation"]
  },
  {label: "PROJECTS",
    dropdown: ["Completed Projects", "Ongoing Projects", "Gallery"]
  }
]
const header = () => {
   const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);

  const handleEnter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
 
  return (
    <header className='w-full bg-white shadow-sm relative z-50'>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <img
        src='/logo.png'
        alt='Vindhayavasini Construction Works'
        className="h-10 w-auto"
        />
      </div>

      <nav className="hidden lg:flex items-center gap-7">
        {navItems.map((item) => {
          return (
          <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && handleEnter(item.label)}
          onMouseLeave={() => item.dropdown && handleLeave()}
          >
            <div className={"flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-orange-500 cursor-pointer transition-colors py-2"}>
              <span>{item.label}</span>
              {item.dropdown && (
                <ChevronDown
                size={14}
                className={`mt-0.5 transition-transform duration-200 ${
                  openMenu === item.label ? "rotate-180" : ""
                }`}
                />
              )}
            </div>
            {item.dropdown && (
              <div
              className={`absolute left-0 top-full min-w-[200px] bg-white rounded-md shadow-lg border border-gray-100 py-2 origin-top transition-all duration-150 ${
                openMenu === item.label
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
              } `}
              >
                {item.dropdown.map((sub) => (
                  <a
                   key={sub}
                   href=""
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                   >
                  {sub}

                   </a>
                 
                  
                ))}

              </div>
            )}

          </div>)
        })}

      </nav>

      <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2">
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-950 text-white">
              <Phone size={16} fill="white" />
            </span>
            <span className="font-semibold text-gray-900 text-sm">
              Call Us
            </span>
          </div>

          <button className="bg-blue-950 hover:bg-orange-600 text-white font-bold text-sm tracking-wide px-6 py-3 transition-colors">
            GET IN TOUCH
          </button>
        </div>
      </div>
    </header>
  )
}

export default header
