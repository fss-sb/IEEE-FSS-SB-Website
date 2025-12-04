import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Stats() {
  const { isDark } = useContext(ThemeContext);

  const stats = [
    {
      id: 1,
      number: "13",
      label: "Subunits",
      description: "Specialized technical communities",
      gradient: "from-[#007CAC] to-[#00D4FF]",
    },
    {
      id: 2,
      number: "220+",
      label: "Members",
      description: "Active student members",
      gradient: "from-[#007CAC] to-[#8801A3]",
    },
    {
      id: 3,
      number: "30+",
      label: "Events",
      description: "Workshops & activities organized",
      gradient: "from-[#007CAC] to-[#E54144]",
    },
  ];

  return (
    <div
      className={`w-full py-30 ${isDark ? "bg-[#00000099]" : "bg-[#ffffff70]"}`}
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-6 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Our Impact in Numbers
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Growing community, expanding horizons - see how we're making a
            difference
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat, isDark }) {
  return (
    <div className="text-center group">
      {/* Animated Gradient Border Card */}
      <div
        className={`gradient-border rounded-3xl p-[2px] bg-gradient-to-r ${stat.gradient} animate-gradient-rotate`}
      >
        <div
          className={`rounded-3xl p-8 h-full ${
            isDark ? "bg-black" : "bg-white"
          } transition-all duration-300 group-hover:scale-105`}
        >
          {/* Number with Gradient Text */}
          <div
            className={`text-6xl font-bold mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
          >
            {stat.number}
          </div>

          {/* Label */}
          <h3
            className={`text-2xl font-bold mb-2 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {stat.label}
          </h3>

          {/* Description */}
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {stat.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
