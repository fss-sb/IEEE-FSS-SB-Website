import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(true); //  state for navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const navRef = useRef(null); // Ref for the navbar container

  const navigate = useNavigate();

  // Scroll control effect
  useEffect(() => {
    const controlNavbar = () => {
      // Only apply on mobile screens
      if (window.innerWidth >= 948) return; // Desktop - keep navbar always visible

      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down more than 200px
      else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Add throttling to improve performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlNavbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  function register() {
    navigate("/register");
  }

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setOpenDropdown((prev) => (prev === "about" ? null : prev));
      }
      if (workRef.current && !workRef.current.contains(event.target)) {
        setOpenDropdown((prev) => (prev === "work" ? null : prev));
      }

      // Close MOBILE menu if click outside panel
      if (
        mobileOpen &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // Function to handle navigation for desktop dropdown items
  const handleDesktopNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null); // Close dropdown after navigation
  };

  // Function to handle navigation for mobile menu items
  const handleMobileNavigation = (path) => {
    navigate(path);
    setMobileOpen(false); // Close mobile menu after navigation
  };

  const isAboutOpen = openDropdown === "about";
  const isWorkOpen = openDropdown === "work";

  return (
    <>
      {/* NAVBAR - Added transform transition for hide/show effect */}
      <div
        ref={navRef}
        className={`
          fixed top-5 left-1/2 transform -translate-x-1/2
          w-11/12 max-w-7xl
          p-[3px] rounded-[60px]
          bg-gradient-to-r from-[#007CAC] via-[#014598] to-[#007CAC]
          shadow-lg shadow-black/10
          z-50
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-32"}
        `}
      >
        <nav
          className={`
            h-17 flex items-center justify-between
            px-8 py-4 rounded-[60px]
            ${isDark ? "bg-black text-white" : "bg-white text-black"}
          `}
        >
          {/* LOGO */}
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={
                isDark
                  ? "/assets/logos/old_SB_white.webp"
                  : "/assets/logos/old_SB_black.webp"
              }
              alt="IEEE Student Branch"
              className="h-10 w-auto"
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            <ul className="flex items-center space-x-12 font-bold text-sm">
              <li
                className="hover:opacity-80 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>

              {/* ABOUT */}
              <li className="relative" ref={aboutRef}>
                <div
                  className="flex items-center space-x-1 hover:opacity-80 cursor-pointer"
                  onClick={() => toggleDropdown("about")}
                >
                  <span>About</span>
                  <img
                    src={
                      isDark
                        ? "/assets/icons/arrow-down-white.svg"
                        : "/assets/icons/arrow-down-black.svg"
                    }
                    className={`w-2.5 h-2.5 transition-transform duration-200 ${
                      isAboutOpen ? "rotate-180" : ""
                    }`}
                    alt="dropdown"
                  />
                </div>

                <ul
                  className={`
                    absolute left-0 top-full mt-2
                    w-40 py-3 rounded-xl shadow-lg
                    transition-all duration-200
                    ${isDark ? "bg-[#111] text-white" : "bg-white text-black"}
                    ${
                      isAboutOpen
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none translate-y-2"
                    }
                  `}
                >
                  <li
                    className="px-4 py-2 hover:bg-gray-600/20 cursor-pointer"
                    onClick={() => handleDesktopNavigation("/about")}
                  >
                    Who We Are
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-600/20 cursor-pointer"
                    onClick={() => handleDesktopNavigation("/subunits")}
                  >
                    Subunits
                  </li>
                </ul>
              </li>

              {/* WORK */}
              <li className="relative" ref={workRef}>
                <div
                  className="flex items-center space-x-1 hover:opacity-80 cursor-pointer"
                  onClick={() => toggleDropdown("work")}
                >
                  <span>Our Work</span>
                  <img
                    src={
                      isDark
                        ? "/assets/icons/arrow-down-white.svg"
                        : "/assets/icons/arrow-down-black.svg"
                    }
                    className={`w-2.5 h-2.5 transition-transform duration-200 ${
                      isWorkOpen ? "rotate-180" : ""
                    }`}
                    alt="dropdown"
                  />
                </div>

                <ul
                  className={`
                    absolute left-0 top-full mt-2
                    w-40 py-3 rounded-xl shadow-lg
                    transition-all duration-200
                    ${isDark ? "bg-[#111] text-white" : "bg-white text-black"}
                    ${
                      isWorkOpen
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none translate-y-2"
                    }
                  `}
                >
                  <li
                    className="px-4 py-2 hover:bg-gray-600/20 cursor-pointer"
                    onClick={() => handleDesktopNavigation("/events")}
                  >
                    Events
                  </li>
                </ul>
              </li>

              <li
                className="hover:opacity-80 cursor-pointer"
                onClick={() => {
                  navigate("/contactus");
                }}
              >
                Contact us
              </li>
            </ul>
          </div>

          {/* DESKTOP CTA */}
          <div className="desktop-cta flex items-center space-x-4">
            <button
              className="
                px-4 py-[2px]
                rounded-full font-bold
                bg-gradient-to-r from-[#007CAC] to-[#052C80]
                text-white text-sm
                hover:opacity-90 transition-opacity
                h-[30px] w-[120px] flex items-center justify-center
                nav-cta-button
              "
              onClick={register}
            >
              Join IEEE
            </button>

            <button
              onClick={toggleTheme}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-300
                ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-400"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }
              `}
            >
              {isDark ? (
                <img src="/assets/icons/sun-black.svg" className="w-[18px]" />
              ) : (
                <img src="/assets/icons/moon-white.svg" className="w-[18px]" />
              )}
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="mobile-menu flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className={
                isDark
                  ? "w-8 h-8 flex items-center justify-center  border-[1px]  text-white rounded-[50%]"
                  : "w-8 h-8 flex items-center justify-center  border-[1px] border-black  text-black rounded-[50%]"
              }
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40 backdrop-blur-sm
            flex justify-end
          "
        >
          {/* SLIDE PANEL */}
          <div
            ref={mobilePanelRef}
            className={`
              w-72 h-full p-6
              shadow-xl relative
              transform transition-transform duration-300
              ${isDark ? "bg-black text-white" : "bg-white text-black"}
            `}
          >
            {/* INTERNAL CLOSE BUTTON */}
            <button
              onClick={() => setMobileOpen(false)}
              className="
                absolute top-4 right-4
                text-2xl font-bold
                hover:opacity-70
              "
            >
              ✕
            </button>

            {/* MENU CONTENT */}
            <ul className="flex flex-col space-y-4 font-bold text-sm mt-10">
              <li
                className="hover:opacity-80 cursor-pointer"
                onClick={() => handleMobileNavigation("/")}
              >
                Home
              </li>

              {/* ABOUT */}
              <li>
                <div className="font-semibold mb-1">About</div>

                {/* VERTICAL LINE BLOCK */}
                <div className="pl-4 border-l-[2px] border-gray-400 space-y-2">
                  <div
                    className="pl-3 cursor-pointer hover:opacity-80"
                    onClick={() => handleMobileNavigation("/about")}
                  >
                    Who We Are
                  </div>
                  <div
                    className="pl-3 cursor-pointer hover:opacity-80"
                    onClick={() => handleMobileNavigation("/subunits")}
                  >
                    Subunits
                  </div>
                </div>
              </li>

              {/* WORK */}
              <li>
                <div className="font-semibold mb-1">Our Work</div>

                {/* VERTICAL LINE */}
                <div className="pl-4 border-l-[2px] border-gray-400 space-y-2">
                  <div
                    className="pl-3 cursor-pointer hover:opacity-80"
                    onClick={() => handleMobileNavigation("/events")}
                  >
                    Events
                  </div>
                </div>
              </li>

              <li
                className="hover:opacity-80 cursor-pointer"
                onClick={() => handleMobileNavigation("/contactus")}
              >
                Contact us
              </li>

              <li>
                <button
                  className="w-full nav-cta-button px-4 py-[2px] rounded-full font-bold bg-gradient-to-r from-[#007CAC] to-[#052C80] text-white text-sm hover:opacity-90 transition-opacity h-[30px]  flex items-center justify-center"
                  onClick={register}
                >
                  Join IEEE
                </button>
              </li>

              <li>
                <button
                  onClick={toggleTheme}
                  className={`
                    w-full h-[30px] rounded-full mt-2
                    flex items-center justify-center
                    transition-all duration-300
                    ${
                      isDark
                        ? "bg-white text-black hover:bg-gray-400"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                    }
                  `}
                >
                  {isDark ? (
                    <img
                      src="/assets/icons/sun-black.svg"
                      className="w-[18px]"
                    />
                  ) : (
                    <img
                      src="/assets/icons/moon-white.svg"
                      className="w-[18px]"
                    />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
