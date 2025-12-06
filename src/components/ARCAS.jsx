import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

function ArcasBanner() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { isDark } = useContext(ThemeContext);

  // Note: December is month 11 (zero-based)
  const targetDate = new Date(2025, 11, 6, 22, 0, 0).getTime(); // December 6, 2025 10:00 PM

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Time's up
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  function navigateToEvent() {
    navigate("/ARCAS1.0");
  }

  return (
    <div className="relative w-full mt-50" onClick={navigateToEvent}>
      {/* Banner Section - Responsive */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[380px] bg-[#00000070] flex items-center justify-center">
        <div className="relative w-full h-[150px] sm:h-[220px] md:h-[280px] lg:h-[310px] overflow-hidden">
          {/* Image Container - Moved up by 40px */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/arcasb.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "calc(100% + 40px)", //  40px to height
              width: "100%",
              top: "-55px", // Move up by 40px
            }}
          />
        </div>
      </div>

      {/* Timer Section -*/}
      <div className="relative z-10 px-4 py-4 md:py-6 lg:py-8">
        <div className="text-center">
          {/* Main Timer Container  */}
          <div
            className={`inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 lg:gap-4 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {/* ARCAS1.0  */}
            <span
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: "#D08700" }}
            >
              ARCAS1.0
            </span>

            {/* Timer Container - Smaller */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3">
              {/* Timer Numbers with labels */}
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Days */}
                <div className="text-center">
                  <div
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold rounded-lg px-2 sm:px-3 py-1 ${
                      isDark
                        ? "text-white bg-gray-900/50"
                        : "text-black bg-gray-200/80"
                    }`}
                  >
                    {formatNumber(timeLeft.days)}
                  </div>
                  <div
                    className={`text-xs sm:text-sm mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    DAYS
                  </div>
                </div>

                <span
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  :
                </span>

                {/* Hours */}
                <div className="text-center">
                  <div
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold rounded-lg px-2 sm:px-3 py-1 ${
                      isDark
                        ? "text-white bg-gray-900/50"
                        : "text-black bg-gray-200/80"
                    }`}
                  >
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <div
                    className={`text-xs sm:text-sm mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    HOURS
                  </div>
                </div>

                <span
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  :
                </span>

                {/* Minutes */}
                <div className="text-center">
                  <div
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold rounded-lg px-2 sm:px-3 py-1 ${
                      isDark
                        ? "text-white bg-gray-900/50"
                        : "text-black bg-gray-200/80"
                    }`}
                  >
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <div
                    className={`text-xs sm:text-sm mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    MIN
                  </div>
                </div>

                <span
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  :
                </span>

                {/* Seconds */}
                <div className="text-center">
                  <div
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold rounded-lg px-2 sm:px-3 py-1 ${
                      isDark
                        ? "text-white bg-gray-900/50"
                        : "text-black bg-gray-200/80"
                    }`}
                  >
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div
                    className={`text-xs sm:text-sm mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    SEC
                  </div>
                </div>
              </div>

              {/* LEFT text - Smaller */}
              <span
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
                style={{ color: "#D08700" }}
              >
                LEFT
              </span>
            </div>
          </div>

          {/* Countdown Date Info - Smaller */}
          <div className="mt-4 md:mt-6">
            <div
              className={`inline-block rounded-full px-3 sm:px-4 py-1 sm:py-2 border ${
                isDark
                  ? "bg-gray-800/40 backdrop-blur-sm border-gray-700/30"
                  : "bg-gray-100/80 border-gray-300/50"
              }`}
            >
              <p
                className={`text-sm sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Until{" "}
                <span
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  December 6, 2025 • 10:00 PM
                </span>
              </p>
            </div>
          </div>

          {/* Progress Bar for visual countdown - Optional, keep if needed */}
          <div className="max-w-md mx-auto mt-6">
            <p
              className={`text-xs sm:text-sm mt-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Time remaining: {timeLeft.days} day(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArcasBanner;
