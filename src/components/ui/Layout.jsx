import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

function Layout({ children }) {
  const { isDark } = useContext(ThemeContext);

  const [bgImage, setBgImage] = useState("/assets/background-light.webp");

  useEffect(() => {
    if (isDark) {
      setBgImage("/assets/background-dark.webp");
    } else {
      setBgImage("/assets/background-light.webp");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* BACKGROUND */}
      <img
        src={bgImage}
        alt="Background"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        className="
          fixed
          top-0
          left-0
          w-screen
          h-screen
          object-cover
          -z-10
        "
      />

      {/* CONTENT */}
      <div className="flex-1 relative z-10 overflow-x-hidden">{children}</div>
    </div>
  );
}

export default Layout;
