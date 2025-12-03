import Navbar from "../components/ui/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        className={`
        min-h-screen pt-40
        flex flex-col items-center justify-start
        px-6
        
        transition-all duration-300
      `}
      >
        <div className="text-center max-w-2xl">
          {/* Main 404 Number */}
          <h1
            className={`
            text-9xl font-bold mb-4
            ${
              isDark
                ? "bg-gradient-to-r from-[#44caff] to-[#477df3]"
                : "bg-gradient-to-r from-[#005171] to-[#031742]"
            }
            bg-clip-text text-transparent
            drop-shadow-lg
          `}
          >
            404
          </h1>

          {/* Main Title */}
          <h2
            className={`
            text-4xl font-bold mb-6
            ${isDark ? "text-white" : "text-gray-800"}
          `}
          >
            {"The Oracle Could Not Find This Page :("}
          </h2>

          {/* Description */}
          <p
            className={`
            text-xl mb-12 leading-relaxed
            ${isDark ? "text-gray-300" : "text-gray-600"}
            max-w-md mx-auto
          `}
          >
            Even the ancient oracle couldn't predict this one. Return to the
            homepage to continue your quest.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => {
              navigate("/");
            }}
            className={`
              inline-block
              px-8 py-4 rounded-full font-bold text-lg
              bg-gradient-to-r from-[#007CAC] to-[#052C80]
              text-white
              hover:opacity-90 transition-all duration-300
              hover:scale-105
              shadow-lg
              border-2 border-transparent
              hover:border-white/20
            `}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
