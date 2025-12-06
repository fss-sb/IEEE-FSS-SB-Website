import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <footer
      className={`
        w-full
        flex justify-between items-start
        px-12 py-16
        mt-60
        bg-gradient-to-t
        ${
          isDark
            ? "from-black to-black/40 text-white"
            : "from-[#4F94B9] to-[#4F94B9]/40 text-black"
        }
       `}
    >
      {/* LEFT SECTION (Navigation + Socials) - Hidden on mobile */}
      <div className="footer-left-section w-1/2 flex flex-col space-y-12 pl-50">
        {/* Logo */}
        <div>
          <img
            src={
              isDark
                ? "/assets/logos/old_IEEE_SB_white.png"
                : "/assets/logos/old_IEEE_SB_black.png"
            }
            alt="SB logo"
            className="h-7 w-auto"
            loading="lazy"
          />
        </div>

        {/* Navigation Grid */}
        <div className="flex space-x-20">
          {/* About */}
          <ul className="space-y-2 ">
            <li className="font-bold text-xl mb-3">About</li>
            <li
              className="cursor-pointer hover:opacity-70"
              onClick={() => {
                navigate("/about");
              }}
            >
              Who we Are
            </li>
            <li
              className="cursor-pointer hover:opacity-70"
              onClick={() => {
                navigate("/subunits");
              }}
            >
              Subunits
            </li>
          </ul>

          {/* Our Work */}
          <ul className="space-y-2">
            <li className="font-bold text-xl mb-3">Our Work</li>
            <li
              className="cursor-pointer hover:opacity-70"
              onClick={() => {
                navigate("/events");
              }}
            >
              Events
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <ul className="flex space-x-10">
          {/* Facebook */}
          <a
            href="https://facebook.com/IEEE.FSS.SB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-70"
          >
            <img
              src="/assets/icons/facebook.svg"
              alt="facebook icon"
              className="h-5 w-5"
              loading="lazy"
            />
            <p className="text-blue-600 text-xs">Facebook</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ieee.fss.sb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-70"
          >
            <img
              src={
                isDark
                  ? "/assets/icons/instagram-black.svg"
                  : "/assets/icons/instagram-white.svg"
              }
              alt="instagram icon"
              className="h-5 w-5"
              loading="lazy"
            />
            <p className="text-[#ff0062] text-xs">Instagram</p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/fss-sb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-70"
          >
            <img
              src={
                isDark
                  ? "/assets/icons/github-white.svg"
                  : "/assets/icons/github-black.svg"
              }
              alt="github icon"
              className="h-5 w-5"
              loading="lazy"
            />
            <p className="text-xs">GitHub</p>
          </a>
        </ul>
      </div>

      {/* VERTICAL DIVIDER - Hidden on mobile */}
      <div
        className={`
        footer-divider w-[3px] h-74 self-center rounded-2xl
        ${isDark ? "bg-white/40" : "bg-black/40"}
      `}
      ></div>

      {/* RIGHT SECTION (Text + Decorative Image) - Full width on mobile */}
      <div className="footer-right-section w-1/2 flex flex-col items-end text-center space-y-14.5 px-50 ">
        {/* Header */}
        <h2 className="text-3l font-semibold tracking-wide">
          FSS IEEE Student Branch
        </h2>

        {/* Decorative flame + image (1 asset) */}
        <img
          src={isDark ? "/assets/brand-white.svg" : "/assets/brand-black.svg"}
          alt="decor"
          className="h-20 w-auto"
          loading="lazy"
        />

        {/* Bottom text */}
        <p className="text-sm opacity-80 mt-8">
          © IEEE FSS SB | 2025 All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
