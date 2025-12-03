// src/pages/FormPage.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function FormPage() {
  const { isDark } = useContext(ThemeContext);

  // Replace this URL with your actual form URL
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfGtn9HhwHHWWaVL4JnnxTvW6SrjfWHNN2dt6SN9om55YcqZg/viewform";

  return (
    <div
      className={`w-full min-h-screen py-45 ${
        isDark ? " text-white" : " text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Join IEEE FSS Student Branch
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Fill out the form below to become a member of our community
          </p>
        </div>

        {/* Form Iframe Container */}
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl border-2 ${
            isDark ? "border-[#007CAC]" : "border-[#052C80]"
          }`}
        >
          <iframe
            src={formUrl}
            width="100%"
            height="800"
            title="IEEE FSS Membership Form"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>

        {/* Optional: Loading state or fallback */}
        <div className="text-center mt-8">
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            If the form doesn't load, please{" "}
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              open it in a new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
