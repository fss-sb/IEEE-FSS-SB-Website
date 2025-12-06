import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { scroller } from "react-scroll";

function WhoWeAre() {
  const { isDark } = useContext(ThemeContext);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };

  return (
    <div
      className={`w-full py-20 min-h-screen mt-20 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <div
            className={`w-24 h-1 ${
              isDark ? "bg-[#76d8ff]" : "bg-[#052C80]"
            } mx-auto`}
          ></div>
        </div>

        {/* Main Paragraph + Logo */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Text Card */}
          <div className="flex-1 lg:pr-12">
            <div className="gradient-border animate-border-1 rounded-3xl h-full">
              <div
                className={`p-8 rounded-3xl h-full ${
                  isDark ? "bg-[#000000EE]" : "bg-[#FFFFFFEE]"
                }`}
              >
                <div className="space-y-4 text-lg leading-relaxed relative z-10">
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } relative z-10`}
                  >
                    We are{" "}
                    <button
                      onClick={() => scrollToSection("section-2")}
                      className="highlight-term highlight-green cursor-pointer border-none bg-transparent p-0 relative z-10"
                    >
                      IEEE FSS Student Branch
                    </button>
                    , a community of innovators who blend the wisdom of the past
                    with the technology of the future. As part of the global
                    IEEE network, we stand proudly within{" "}
                    <button
                      onClick={() => scrollToSection("section-4")}
                      className="highlight-term highlight-blue cursor-pointer border-none bg-transparent p-0 relative z-10"
                    >
                      Region 8
                    </button>
                    , connecting with brilliant minds across Europe, Africa, and
                    the Middle East.
                  </p>

                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } relative z-10`}
                  >
                    Guided by the{" "}
                    <button
                      onClick={() => scrollToSection("section-3")}
                      className="highlight-term highlight-red cursor-pointer border-none bg-transparent p-0 relative z-10"
                    >
                      IEEE Tunisia Section
                    </button>
                    , we thrive in collaboration and shared knowledge. We don't
                    just follow innovation, we shape it. From ancient
                    inspiration to modern creation, we transform ideas into
                    impactful projects that push boundaries and light the way
                    for those who will follow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex-1">
            <div className=" overflow-hidden">
              <div className={`p-8 rounded-3xl `}>
                <img
                  src={"SB_logo.png"}
                  alt="IEEE FSS Student Branch"
                  className="w-full h-90 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <Section
          id="section-2"
          title="Faculty of Sciences of Sfax (FSS)"
          content={[
            "The Faculty of Sciences of Sfax (FSS) is a prestigious academic institution affiliated with the University of Sfax, located in Sfax, Tunisia. It specializes in higher education and research in various scientific fields.",
            "Renowned for its strong academic programs and research initiatives, FSS fosters a dynamic environment for learning and innovation, collaborating with both national and international institutions. It plays a key role in developing highly skilled professionals and contributing to the scientific and technological advancement of the region.",
          ]}
          image="/assets/about/fss-building.png"
          imageRight={false}
          isDark={isDark}
          gradientClass="animate-border-1"
        />

        <Section
          id="section-3"
          title="IEEE Tunisia Section"
          content={[
            "The IEEE Tunisia Section, founded in 2008, is a prominent branch of the Institute of Electrical and Electronics Engineers (IEEE), focused on advancing IEEE's mission across Tunisia.",
            "The section actively supports student branches, technical chapters, special interest groups, and student awards, fostering growth and collaboration within the engineering and technology community. With over 43 student branches across engineering schools, faculties, and universities, the IEEE Tunisia Section plays a vital role in connecting professionals and students, driving technological progress, and addressing humanitarian challenges through the application of engineering and technology.",
          ]}
          image="/assets/about/ieee-tunisia.png"
          imageRight={true}
          isDark={isDark}
          gradientClass="animate-border-2"
        />

        <Section
          id="section-4"
          title="IEEE Region 8"
          content={[
            "IEEE Region 8 is one of the global regions of the Institute of Electrical and Electronics Engineers (IEEE), encompassing Europe, Africa, and the Middle East.",
            "Region 8 provides a broad platform for networking, collaboration, and professional growth, offering a wide range of activities such as conferences, educational programs, and technical workshops. It also supports student branches, chapters, and special interest groups to enhance participation and engagement at all levels. IEEE Region 8 plays a crucial role in connecting engineers, researchers, and professionals, fostering innovation and advancing technological solutions for global and regional challenges.",
          ]}
          image="/assets/about/ieee-region8.png"
          imageRight={false}
          isDark={isDark}
          gradientClass="animate-border-3"
        />
      </div>
    </div>
  );
}

/* Section Component */
function Section({
  id,
  title,
  content,
  image,
  imageRight,
  isDark,
  gradientClass,
}) {
  return (
    <div
      id={id}
      className={`flex flex-col ${
        imageRight ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12 mb-20`}
    >
      {/* Text */}
      <div className={`flex-1 ${imageRight ? "lg:pl-12" : "lg:pr-12"}`}>
        <div className={`gradient-border ${gradientClass} rounded-3xl h-full`}>
          <div
            className={`p-8 rounded-3xl h-full ${
              isDark ? "bg-[#000000EE]" : "bg-[#FFFFFFEE]"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {title}
            </h2>

            <div className="space-y-4 text-lg leading-relaxed relative z-10">
              {content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } relative z-10`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1">
        <div
          className={`gradient-border ${gradientClass} rounded-3xl overflow-hidden`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default WhoWeAre;
