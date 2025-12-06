import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function WhyJoin() {
  const { isDark } = useContext(ThemeContext);

  const cards = [
    {
      id: 1,
      title: "Discover Who You Are",
      description:
        "Trace your path between what once was and what can be. Explore your strengths, challenge your limits, and uncover the version of yourself destined to leave a mark.",
      icon: "discover.svg",
      gradientClass: "animate-border-1",
    },
    {
      id: 2,
      title: "Grow Your Network",
      description:
        "Step into a circle that has been expanding for generations. Build meaningful connections, exchange wisdom, and shape the future with those who stand beside you.",
      icon: "network.svg",
      gradientClass: "animate-border-2",
    },
    {
      id: 3,
      title: "Integrate, Build and Innovate",
      description:
        "Take inspiration from ancient brilliance and transform it into tomorrow's breakthroughs. Learn, create, and innovate — not only for yourself, but for those who come after, right?",
      icon: "build.svg",
      gradientClass: "animate-border-3",
    },
  ];

  return (
    <div className="w-full py-20 mt-15">
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}
        <h3
          className={`text-4xl font-bold text-center mb-16 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Why Join Our Community?
        </h3>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-fr">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`gradient-border ${card.gradientClass} rounded-3xl h-full`}
            >
              {/* Card Content */}
              <div
                className={`relative z-10 flex flex-col items-center text-center space-y-6 p-8 rounded-3xl h-full ${
                  isDark ? "bg-[#000000CD]" : "bg-[#FFFFFFCD]"
                }`}
              >
                {/* Title */}
                <h4
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {card.title}
                </h4>

                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center m-4">
                  <img
                    src={`/assets/icons/${card.icon}`}
                    alt={card.title}
                    className="w-12 h-12"
                    loading="lazy"
                  />
                </div>

                {/* Description */}
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyJoin;
