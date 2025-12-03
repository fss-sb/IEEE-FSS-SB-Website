import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function ComingSoon() {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`w-full mt-40 min-h-screen flex items-center justify-center ${
        isDark ? "bg-[#00000040] text-white" : "bg-[#ffffff40] text-black"
      }`}
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Animated Construction Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🚧</div>
          <div className="w-32 h-2 bg-gradient-to-r from-[#007CAC] to-[#052C80] mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Main Message */}
        <div className="gradient-border animate-border-1 rounded-3xl max-w-2xl mx-auto mb-8">
          <div
            className={`p-12 rounded-3xl ${
              isDark ? "bg-[#000000EE]" : "bg-[#FFFFFFEE]"
            }`}
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#007CAC] to-[#052C80] bg-clip-text text-transparent">
              Coming Soon
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              We're building something amazing! This page is currently under
              construction and will be available soon. The ancient oracles are
              working on it...
            </p>

            {/* Progress Animation */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700">
              <div
                className="bg-gradient-to-r from-[#007CAC] to-[#052C80] h-2 rounded-full animate-progress"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crafting the future... 65% complete
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          <p>In the meantime, check out our other amazing pages!</p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
