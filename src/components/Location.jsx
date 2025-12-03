import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Location() {
  const { isDark } = useContext(ThemeContext);

  // Google Maps embed URL for Faculty of Sciences of Sfax
  const googleMapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.1310962704333!2d10.716722875643939!3d34.727089772910375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002ca4e684fdcf%3A0xb58c51e46e842136!2sFaculty%20of%20Sciences%20of%20Sfax%20(FSS)!5e0!3m2!1sen!2stn!4v1763667224861!5m2!1sen!2stn";
  return (
    <div
      className={`w-full py-20 mt-50 ${isDark ? "text-white" : "text-black"}`}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Our Location</h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            We're Not located on Mount Olympus unfortunately 😞… but close
            enough. Find us on campus
          </p>
        </div>

        {/* Google Maps Container with Blue Border */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#007CAC]">
          <iframe
            src={googleMapsUrl}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IEEE FSS Student Branch Location"
            className="w-full"
          ></iframe>
        </div>

        {/* Additional Info for location */}
        <div className="text-center mt-8">
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Faculty of Sciences of Sfax, Route de la Soukra, Sfax, Tunisia
          </p>
        </div>
      </div>
    </div>
  );
}

export default Location;
