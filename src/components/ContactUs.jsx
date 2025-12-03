import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const { isDark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    object: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });

  // Get EmailJS credentials from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // Test function to simulate error (remove in production)
  const testError = () => {
    showToast("This is a test error message", "error");
  };

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Test mode: Simulate error (remove in production)
    const testMode = false; // Set to true to test error state
    if (testMode) {
      setIsLoading(true);
      setTimeout(() => {
        showToast(
          "This is a test error message. Emails are disabled in test mode.",
          "error"
        );
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      // Get current date for the email template
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Prepare template parameters (must match your EmailJS template variables)
      const templateParams = {
        from_name: formData.fullName, // Maps to {{from_name}}
        from_email: formData.email, // Maps to {{from_email}}
        subject: formData.object, // Maps to {{subject}}
        message: formData.content, // Maps to {{message}}
        date: formattedDate, // Maps to {{date}}
        year: now.getFullYear().toString(), // Maps to {{year}}
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", response);

      // Show success toast
      showToast(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        object: "",
        content: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Show error toast
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full py-20 mt-15 ${isDark ? "text-white" : "text-black"}`}
    >
      {/* Toast Notification - IMPROVED VISIBILITY */}
      {toast.show && (
        <div
          className={`fixed bottom-4 left-4 z-50 max-w-sm transform transition-all duration-300 ${
            toast.show
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div
            className={`rounded-xl shadow-2xl p-5 border-2 ${
              toast.type === "success"
                ? "bg-green-100 border-green-600 dark:bg-green-900 dark:border-green-400"
                : "bg-red-100 border-red-600 dark:bg-red-900 dark:border-red-400"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <svg
                    className="h-7 w-7 text-green-700 dark:text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-7 w-7 text-red-700 dark:text-red-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p
                  className={`text-base font-bold ${
                    toast.type === "success"
                      ? "text-green-900 dark:text-green-100"
                      : "text-red-900 dark:text-red-100"
                  }`}
                >
                  {toast.type === "success" ? "Success!" : "Error!"}
                </p>
                <p
                  className={`text-sm mt-1 font-medium ${
                    toast.type === "success"
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {toast.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={hideToast}
                  className={`inline-flex rounded-md p-1 focus:outline-none focus:ring-2 ${
                    toast.type === "success"
                      ? "text-green-700 hover:text-green-800 focus:ring-green-500 dark:text-green-300 dark:hover:text-green-200"
                      : "text-red-700 hover:text-red-800 focus:ring-red-500 dark:text-red-300 dark:hover:text-red-200"
                  }`}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you!
          </p>
        </div>

        {/* Form Container with Transparent Background */}
        <div
          className={`rounded-[50px] p-10 backdrop-blur-sm border-2 ${
            isDark ? "bg-black/60" : "bg-white/60"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className={`block text-lg font-medium mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-[60px] border-2 focus:outline-none focus:ring-2 focus:ring-[#007CAC] transition-all ${
                  isDark
                    ? "bg-black/40 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-black placeholder-gray-500"
                } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-lg font-medium mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-[60px] border-2 focus:outline-none focus:ring-2 focus:ring-[#007CAC] transition-all ${
                  isDark
                    ? "bg-black/40 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-black placeholder-gray-500"
                } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                placeholder="Enter your email address"
              />
            </div>

            {/* Object Field */}
            <div>
              <label
                htmlFor="object"
                className={`block text-lg font-medium mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Object *
              </label>
              <input
                type="text"
                id="object"
                name="object"
                value={formData.object}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-[60px] border-2 focus:outline-none focus:ring-2 focus:ring-[#007CAC] transition-all ${
                  isDark
                    ? "bg-black/40 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-black placeholder-gray-500"
                } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                placeholder="What is this regarding?"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label
                htmlFor="content"
                className={`block text-lg font-medium mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Message *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows={6}
                className={`w-full h-[400px] px-4 py-3 rounded-[40px] border-2 focus:outline-none focus:ring-2 focus:ring-[#007CAC] transition-all resize-none ${
                  isDark
                    ? "bg-black/40 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-black placeholder-gray-500"
                } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-12 py-4 rounded-full w-full font-bold text-lg transition-all duration-300 ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-105"
                } ${
                  isDark
                    ? "bg-[#007CAC] hover:bg-[#005a8c] text-white"
                    : "bg-[#052C80] hover:bg-[#041e5c] text-white"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="text-center mt-12">
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Or reach out to us directly at:{" "}
            <span className="font-semibold">ieee.fss.sb@org.com</span>
          </p>
          <p
            className={`text-sm mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Using EmailJS for secure email delivery
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
