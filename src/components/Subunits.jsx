import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Subunits() {
  const { isDark } = useContext(ThemeContext);

  // First row data - 7 elements
  const row1Subunits = [
    {
      id: 1,
      name: "Power & Energy Society",
      logo: isDark ? "pes-logo-white.png" : "pes-logo-black.png",
      borderColor: "#057210",
    },
    {
      id: 2,
      name: "IEEE COSMOC",
      logo: "comsoc-logo.png",
      borderColor: "#0051FF",
    },
    {
      id: 3,
      name: "IEEE CS",
      logo: isDark ? "cs-logo-white.png" : "cs-logo-black.png",
      borderColor: "#D4AA00",
    },
    {
      id: 4,
      name: "IEEE SIGHT",
      logo: isDark ? "sight-logo-white.png" : "sight-logo-black.png",
      borderColor: isDark ? "#FFFFFF" : "#000000",
    },
    {
      id: 5,
      name: "IEEE FSS RAS",
      logo: "ras-logo.png",
      borderColor: "#A80000",
    },
    {
      id: 6,
      name: "IAS",
      logo: isDark ? "ias-logo-white.png" : "ias-logo-black.png",
      borderColor: "#00814F",
    },
    { id: 7, name: "wie", logo: "wie-logo.png", borderColor: "#690083" },
  ];

  // Second row data - 6 elements
  const row2Subunits = [
    { id: 8, name: "ies", logo: "ies-logo.png", borderColor: "#CE6700" },
    { id: 9, name: "CAS", logo: "cas-logo.png", borderColor: "#00472C" },
    { id: 10, name: "GRSS", logo: "grss-logo.png", borderColor: "#007CAC" },
    {
      id: 11,
      name: "SMC",
      logo: isDark ? "smc-logo-white.png" : "smc-logo-black.png",
      borderColor: isDark ? "#FFFFFF" : "#000000",
    },
    {
      id: 12,
      name: "CIS",
      logo: isDark ? "cis-logo-white.png" : "cis-logo-black.png",
      borderColor: "#00B8FF",
    },
    { id: 13, name: "AESS", logo: "aess-logo.png", borderColor: "#20719D" },
  ];

  // Subunit Card Component
  function SubunitCard({ subunit }) {
    return (
      <div
        className="flex-shrink-0 w-60 h-40 flex items-center justify-center rounded-4xl border-2 backdrop-blur-sm"
        style={{
          borderColor: subunit.borderColor,
          backgroundColor: isDark ? `rgba(0, 0, 0, 0.5)` : "#FFFFFF77",
        }}
      >
        <img
          src={`/assets/logos/subunits/colored/${subunit.logo}`}
          alt={subunit.name}
          className="w-38 h-38 object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`w-full py-20 ${isDark ? "text-white" : "text-black"}`}>
      {/* Title & Description - Still centered with max-width */}
      <div className="max-w-6xl mx-auto px-8 mb-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Our Subunits</h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Join the community that shares your center of interest,
            <br />
            become an essential part of the future we pursue
          </p>
        </div>
      </div>

      {/* Carousel Section - Full width */}
      <div className="space-y-12 w-full">
        {/* First Row - Right to Left - Full width */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-scroll-right flex space-x-8 w-max">
            {/* Original set */}
            {row1Subunits.map((subunit) => (
              <SubunitCard key={subunit.id} subunit={subunit} />
            ))}
            {/* Duplicate set for seamless loop */}
            {row1Subunits.map((subunit) => (
              <SubunitCard key={`${subunit.id}-dup`} subunit={subunit} />
            ))}
          </div>
        </div>

        {/* Second Row - Left to Right - Full width */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-scroll-left flex space-x-8 w-max">
            {/* Original set */}
            {row2Subunits.map((subunit) => (
              <SubunitCard key={subunit.id} subunit={subunit} />
            ))}
            {/* Duplicate set for seamless loop */}
            {row2Subunits.map((subunit) => (
              <SubunitCard key={`${subunit.id}-dup`} subunit={subunit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subunits;
