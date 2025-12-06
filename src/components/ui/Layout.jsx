import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isArcasRoute = location.pathname === "/ARCAS1.0";

  return (
    <div
      className={`min-h-screen flex flex-col bg-theme-aware bg-cover bg-fixed bg-center transition-all duration-300 ${
        isArcasRoute ? "arcas-route" : ""
      }`}
    >
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
