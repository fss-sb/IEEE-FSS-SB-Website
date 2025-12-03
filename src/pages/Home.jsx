import ContactUs from "../components/ContactUs";
import Hero from "../components/Hero";
import Location from "../components/Location";
import Stats from "../components/Stats";
import Subunits from "../components/Subunits";
import Team from "../components/Team";
import WhyJoin from "../components/WhyJoin";
import WhyNotJoin from "../components/WhyNotJoin";

function Home() {
  const teamMembers = [
    {
      id: 1,
      name: "Mohamad Amine Msedi",
      title: "CHAIR",
      linkedin: "@mohamad amine msedi",
      image: "/SB/msedi.jpg",
    },
    {
      id: 2,
      name: "Ahmad Ben Salah",
      title: "Vice-CHAIR",
      linkedin: "@Ahmad ben salah",
      image: "/SB/saliha.jpg",
    },
    {
      id: 3,
      name: "Mahmoud Koubaa",
      title: "Human Resource Manager",
      linkedin: "@mahmoud koubaa",
      image: "/SB/Mahmoud-koubaa.jpg",
    },
    {
      id: 4,
      name: "Khadija Bouchhima",
      title: "Secretary",
      linkedin: "@khadija bouchhima",
      image: "/SB/khadija-bouchhima.jpg",
    },
    {
      id: 5,
      name: "Omar Zouari",
      title: "Treasurer",
      linkedin: "@omar zouari",
      image: "/SB/omar-zouari.jpg",
    },
    {
      id: 6,
      name: "Yasmine Feki",
      title: "Web Master",
      linkedin: "@Yasmine Feki",
      image: "/SB/yassmine-Feki.jpg",
    },
  ];
  return (
    <>
      <Hero />
      <WhyJoin />
      <WhyNotJoin />
      <Subunits />
      <Team teamMembers={teamMembers} />
      <Stats />
      <Location />
      <ContactUs />
    </>
  );
}

export default Home;
