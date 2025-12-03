import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function WhyNotJoin() {
  const { isDark } = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          document.querySelector(".nav-cta-button")?.classList.add("pulse-cta");
        } else {
          setIsVisible(false);
          document
            .querySelector(".nav-cta-button")
            ?.classList.remove("pulse-cta");
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    document.body.classList.add("tunnel-effect");
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    document.body.classList.remove("tunnel-effect");
  };

  return (
    <div ref={sectionRef} className="w-full py-20 relative">
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}
        <h3
          className={`text-4xl font-bold text-center mb-16 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Why <span className="text-red-400">Not</span> Join Us?
        </h3>

        {/* Single Card - Same style as WhyJoin */}
        <div
          ref={cardRef}
          className="gradient-border animate-border-2 rounded-3xl max-w-2xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Content */}
          <div
            className={`flex flex-col items-center text-center space-y-8 p-12 rounded-3xl ${
              isDark ? "bg-[#000000]" : "bg-[#FFFFFF]"
            }`}
          >
            {/* Animated Loading Dots */}
            <div className="flex justify-center space-x-3 mb-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDark ? "bg-gray-400" : "bg-gray-600"
                } animate-bounce`}
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isDark ? "bg-gray-400" : "bg-gray-600"
                } animate-bounce`}
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isDark ? "bg-gray-400" : "bg-gray-600"
                } animate-bounce`}
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>

            {/* Conclusion */}
            <div className="space-y-6">
              <p
                className={`text-xl leading-relaxed ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Well, looks like we couldn't find any good reasons not to join!
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDark ? "text-[#beefff]" : "text-[#052C80]"
                }`}
              >
                So here's your sign to click that button already!
              </p>

              {/* Hover prompt */}
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                } mt-4 transition-all duration-300 ${
                  isHovering ? "opacity-100 scale-105" : "opacity-70"
                }`}
              >
                {isHovering
                  ? "The light at the end of the tunnel is on top!"
                  : "(Hover to see the light)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyNotJoin;
