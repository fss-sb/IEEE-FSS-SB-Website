import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ContactUsPage from "./pages/ContactUsPage";
import WhoWeAre from "./components/WhoWeAre";
import FormPage from "./pages/FormPage";
import ComingSoon from "./pages/ComingSoon";
import ArcasPage from "./pages/ArcasPage";
import ArcasComingSoon from "./components/ArcasComingSoon";

function Router() {
  // Define the launch date for ARCAS1.0
  const arcasLaunchDate = new Date(2025, 11, 6, 22, 0, 0).getTime(); // December 6, 2025, 10:00 PM
  const currentTime = new Date().getTime();

  // Check if ARCAS1.0 should be accessible
  const isArcasAvailable = currentTime >= arcasLaunchDate;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<WhoWeAre />} />
      <Route path="/subunits" element={<ComingSoon />} />
      <Route path="/events" element={<ComingSoon />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/register" element={<FormPage />} />

      {/* Conditionally render ARCAS1.0 page or coming soon page */}
      <Route
        path="/ARCAS1.0"
        element={isArcasAvailable ? <ArcasPage /> : <ArcasComingSoon />}
      />

      {/** 404 page resource not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
