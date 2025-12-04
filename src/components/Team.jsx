import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Team(props) {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`w-full py-20 ${
        isDark ? "bg-[#00000053] text-white" : "bg-[#ffffff6c] text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Meet Our Team</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {props.teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member, isDark }) {
  return (
    <div className="flex flex-col items-center text-center group relative">
      {/* Image Container */}
      <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden">
        {/* Main Image */}
        <img
          src={`/assets/heads/${member.image}`}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Default Info (visible when not hovering) */}
      <div className="group-hover:opacity-0 transition-opacity duration-300">
        <h4
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {member.title}
        </h4>
        <p
          className={`text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          {member.name}
        </p>
      </div>

      {/* Hover Overlay Card - Dark theme aware */}
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-74 rounded-2xl p-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl z-10 backdrop-blur-md border-2 ${
          isDark
            ? "bg-black/90 border-[#007CAC] text-white"
            : "bg-white/95 border-[#052C80] text-black"
        }`}
      >
        {/* Title */}
        <h4
          className={`text-lg font-bold mb-2 text-center ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {member.title}
        </h4>

        {/* Name */}
        <p
          className={`text-base font-semibold mb-4 text-center ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {member.name}
        </p>

        {/* LinkedIn */}
        <div
          className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
            isDark ? "bg-[#007CAC] text-white" : "bg-[#052C80] text-white"
          }`}
        >
          <img
            src="/assets/icons/linkedin-icon.svg"
            alt="LinkedIn"
            className="w-5 h-5"
          />
          <span className="text-sm">{member.linkedin}</span>
        </div>
      </div>
    </div>
  );
}

export default Team;
