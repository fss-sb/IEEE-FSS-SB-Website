import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ContactUsPage from "./pages/ContactUsPage";
import WhoWeAre from "./components/WhoWeAre";
import FormPage from "./pages/FormPage";
import ComingSoon from "./pages/ComingSoon";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<WhoWeAre />} />
      <Route path="/subunits" element={<ComingSoon />} />
      <Route path="/events" element={<ComingSoon />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/register" element={<FormPage />} />
      {/** 404 page resource not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
