import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  function register() {
    navigate("/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-20 hero-container mt-15 ">
      {/* Content Container - brings text and image closer */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-5 hero-content">
        {/* Left Text Section */}
        <div
          className={`flex-1 flex flex-col space-y-8 hero-text-section ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {/* Welcome Text */}
          <h3 className={`text-4xl font-bold leading-tight hero-title`}>
            Welcome To
            <br />
            <span className={`bg-clip-text`}>FSS IEEE Student Branch</span>
          </h3>

          {/* Description */}
          <p className={`text-xl leading-relaxed max-w-md hero-description`}>
            From ancient wisdom, the technical and digital innovation loop shall
            continue. Join faculty of science of Sfax IEEE student branch today!
            Lets shape a better future !
          </p>

          {/* CTA Button */}
          <button
            className={`
            w-115 px-8 py-4 rounded-full font-bold text-lg hero-button
            ${isDark ? "bg-[#007CAC]" : "bg-[#052C80]"}
            text-white
            hover:opacity-90 transition-all duration-300
            hover:scale-105
            shadow-lg
            mt-4
          `}
            onClick={register}
          >
            Join IEEE FSS SB Today!
          </button>
        </div>

        {/* Right Image Section - Centered and closer to text */}
        <div className="flex-1 flex items-center justify-center hero-image-section">
          <img
            src={
              isDark
                ? "/assets/ouroboros-white.svg"
                : "/assets/ouroboros-black.svg"
            }
            alt="ouroboros"
            className="w-64 h-64 animate-spin-slow hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
