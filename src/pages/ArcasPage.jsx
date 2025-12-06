import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function ArcasPage() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  // Form state
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderEmail: "",
    githubRepo: "",
    driveLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // State for form availability
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  // NEW: Track if this session has already submitted
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Initialize EmailJS
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_ARCAS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ARCAS;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_ARCAS_PUBLIC_KEY;

  // NEW: Check localStorage on component mount
  useEffect(() => {
    // Check if user already submitted in this session
    const submittedTeam = localStorage.getItem("arcas_submitted_team");
    if (submittedTeam) {
      setHasSubmitted(true);
    }

    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Important dates
  const submissionStartDate = new Date(2025, 11, 6, 22, 0, 0).getTime(); //December 6, 2025 at 10:00 PM (22:00)
  const formDisableDate = new Date(2025, 11, 7, 10, 32, 0).getTime(); // December 7, 2025 at 10:32 AM

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();

      if (now >= formDisableDate) {
        setIsFormDisabled(true);
      }

      if (now < submissionStartDate) {
        setTimeLeft({ hours: 12, minutes: 0, seconds: 0 });
      } else if (now < submissionStartDate + 12 * 60 * 60 * 1000) {
        const timeRemaining = submissionStartDate + 12 * 60 * 60 * 1000 - now;
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsFormDisabled(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleInputChange = (e) => {
    if (isFormDisabled || hasSubmitted) return;

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if already submitted in this session
    if (hasSubmitted) {
      showToast(
        "You have already submitted in this session. Each team can only submit once.",
        "error"
      );
      return;
    }

    if (isFormDisabled) {
      showToast("Submissions are closed. The deadline has passed.", "error");
      return;
    }

    if (
      !formData.teamName ||
      !formData.teamLeaderEmail ||
      !formData.driveLink
    ) {
      showToast(
        "Please fill in team name, leader email, and Google Drive link",
        "error"
      );
      return;
    }

    // Validate Google Drive URL format
    const driveUrlPattern = /^https:\/\/drive\.google\.com\/.+/;
    if (!driveUrlPattern.test(formData.driveLink)) {
      showToast("Please enter a valid Google Drive link", "error");
      return;
    }

    setIsLoading(true);

    try {
      // SIMPLIFIED template parameters - NO file variables
      const templateParams = {
        team_name: formData.teamName,
        team_leader_email: formData.teamLeaderEmail,
        github_repo: formData.githubRepo || "Not provided",
        drive_link: formData.driveLink,
        submission_time: new Date().toLocaleString(),
        year: new Date().getFullYear().toString(),
      };

      console.log("Sending email with params:", templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Submission sent successfully:", response);

      // NEW: Mark this session as submitted
      setHasSubmitted(true);
      localStorage.setItem("arcas_submitted_team", formData.teamName);
      localStorage.setItem("arcas_submission_time", new Date().toISOString());

      showToast(
        "Submission successful! We've received your Google Drive link.",
        "success"
      );

      // Reset form
      setFormData({
        teamName: "",
        teamLeaderEmail: "",
        githubRepo: "",
        driveLink: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", error.text || error.message);
      showToast("Failed to submit. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallengeRedirect = () => {
    window.open(
      "https://drive.google.com/drive/folders/1o78htKcu1h9TJAh1rOWfkZKxUDqOXYhX",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#00000050] text-white mt-50">
      {/* Toast Notification  */}
      {toast.show && (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm transform transition-all duration-300 translate-x-0 opacity-100">
          <div
            className={`rounded-xl shadow-2xl p-5 border-2 ${
              toast.type === "success"
                ? "bg-green-900 border-green-400"
                : "bg-red-900 border-red-400"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <svg
                    className="h-7 w-7 text-green-300"
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
                    className="h-7 w-7 text-red-300"
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
                    toast.type === "success" ? "text-green-100" : "text-red-100"
                  }`}
                >
                  {toast.type === "success" ? "Success!" : "Error!"}
                </p>
                <p
                  className={`text-sm mt-1 font-medium ${
                    toast.type === "success" ? "text-green-200" : "text-red-200"
                  }`}
                >
                  {toast.message}
                </p>
              </div>
              <button
                onClick={hideToast}
                className="ml-4 text-gray-300 hover:text-white"
              >
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
      )}

      {/* Banner Section*/}
      <div className="relative w-full h-[624px] bg-[#00000070]">
        <div className="absolute inset-0 overflow-hidden mt-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/arcasb.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            isLoading="lazy"
          />
        </div>
      </div>

      {/* Timer Section  */}
      <div className="relative z-10 px-4 py-8">
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 rounded-3xl px-6 py-6 border border-gray-800 bg-gray-900/50">
            <span
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: "#D08700" }}
            >
              ARCAS1.0
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white bg-gray-800 rounded-lg px-3 py-1">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">HOURS</div>
                </div>
                <span className="text-2xl font-bold text-gray-500">:</span>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white bg-gray-800 rounded-lg px-3 py-1">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">MINUTES</div>
                </div>
                <span className="text-2xl font-bold text-gray-500">:</span>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white bg-gray-800 rounded-lg px-3 py-1">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">SECONDS</div>
                </div>
              </div>
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#D08700" }}
              >
                LEFT
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="inline-block bg-gray-800 rounded-full px-5 py-2 border border-gray-700">
              <p className="text-gray-300 text-sm">
                {isFormDisabled ? (
                  <span className="text-red-400 font-semibold">
                    Submissions are closed
                  </span>
                ) : timeLeft.hours === 12 &&
                  timeLeft.minutes === 0 &&
                  timeLeft.seconds === 0 ? (
                  <>
                    Submission opens:{" "}
                    <span className="text-white font-semibold">
                      December 6, 2025 • 10:00 PM
                    </span>
                  </>
                ) : (
                  <>
                    Submission closes in:{" "}
                    <span className="text-white font-semibold">
                      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#FFF2DA" }}
            >
              Your Legend Starts Here
            </h2>
          </div>
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-xl text-gray-300">
                Access the challenge materials and start your journey
              </p>
              <button
                onClick={handleChallengeRedirect}
                className="group relative w-full max-w-md bg-[#00000080] hover:bg-[#000000] rounded-xl p-8 border-2 border-gray-700 hover:border-[#D08700] transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <span className="text-xl font-bold text-white text-center">
                    Click here to get redirected to the challenge
                  </span>
                  <div className="relative">
                    <img
                      src="/assets/icons/drive.png"
                      alt="Google Drive"
                      className="w-20 h-20 transition-all duration-300 group-hover:scale-125"
                    />
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    Opens in a new tab
                  </div>
                </div>
              </button>
              <p className="text-gray-400 text-sm max-w-2xl">
                Download the challenge brief, rules, and all necessary materials
                to begin your ARCAS 1.0 journey. Make sure to read all
                instructions carefully before starting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - SIMPLIFIED (No Backup Files) */}
      <div className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#FFF2DA" }}
            >
              Submit Your Work
            </h2>
            <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
              {isFormDisabled ? (
                <span className="text-red-400">
                  Submissions closed on December 7, 2025 • 10:00 AM
                </span>
              ) : (
                "Fill in your team details and provide Google Drive link"
              )}
            </p>
          </div>

          {/* Google Drive Instructions Box */}
          <div className="mb-8 bg-yellow-900/30 border border-yellow-700 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="text-2xl mr-4">📋</div>
              <div>
                <h3 className="text-xl font-bold text-yellow-200 mb-2">
                  Important Submission Instructions
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Create a Google Drive folder</strong> named with
                    your team name
                  </li>
                  <li>
                    <strong>Upload all required files</strong> to this folder:
                    <ul className="list-disc pl-5 mt-1">
                      <li>Presentation (.pptx file)</li>
                      <li>Documentation (.pdf file)</li>
                      <li>Any additional files (.pdf optional)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Set sharing permissions</strong> to "Anyone with the
                    link can view"
                  </li>
                  <li>
                    <strong>Copy the folder link</strong> and paste it in the
                    form below
                  </li>
                </ol>
                <div className="mt-4 p-3 bg-black/40 rounded-lg">
                  <p className="text-sm text-gray-400">
                    <strong>Folder Name Format:</strong>{" "}
                    <code className="text-yellow-300">TeamName_ARCAS1.0</code>
                    <br />
                    <strong>Example:</strong>{" "}
                    <code className="text-yellow-300">
                      https://drive.google.com/drive/folders/your-folder-id
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="relative bg-[#00000080] rounded-[50px] p-8 md:p-12 border border-gray-800">
            {isFormDisabled && (
              <div className="absolute inset-0 bg-black/80 rounded-[50px] flex items-center justify-center z-10">
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">⏰</div>
                  <h3 className="text-2xl font-bold text-red-400 mb-2">
                    Submissions Closed
                  </h3>
                  <p className="text-gray-300">
                    The submission deadline has passed.
                    <br />
                    Submissions were accepted until December 7, 2025 • 10:00 AM
                  </p>
                </div>
              </div>
            )}

            {/* NEW: Already Submitted Message */}
            {hasSubmitted && !isFormDisabled && (
              <div className="absolute inset-0 bg-green-900/80 rounded-[50px] flex items-center justify-center z-10">
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-300 mb-2">
                    Submission Received!
                  </h3>
                  <p className="text-gray-100 mb-4">
                    Thank you for your submission.
                  </p>
                  <p className="text-gray-300 text-sm">
                    Team:{" "}
                    {localStorage.getItem("arcas_submitted_team") ||
                      "Your team"}
                    <br />
                    Submitted at:{" "}
                    {new Date(
                      localStorage.getItem("arcas_submission_time") ||
                        Date.now()
                    ).toLocaleString()}
                  </p>
                  <p className="text-gray-300 text-sm mt-4">
                    Each team can only submit once.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Note - UPDATED with IMPORTANT warning */}
              <div className="text-center pt-4">
                <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 mb-4">
                  <p className="text-red-300 text-sm font-bold mb-1">
                    ⚠️ IMPORTANT:
                  </p>
                  <p className="text-red-200 text-sm">
                    Each team has <strong>ONE SUBMISSION ONLY</strong>. Make
                    sure to put the correct links and information before
                    submitting.
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  {isFormDisabled ? (
                    "The submission period has ended. No further submissions will be accepted."
                  ) : hasSubmitted ? (
                    "You have already submitted. Each team is allowed only one submission."
                  ) : (
                    <>
                      * Required fields: Team Name, Team Leader Email, Google
                      Drive Link
                      <br />
                      All submission files must be in the Google Drive folder.
                    </>
                  )}
                </p>
              </div>
              {/* Team Name */}
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading || isFormDisabled || hasSubmitted}
                  className="w-full px-6 py-4 rounded-[60px] border-2 border-gray-700 bg-[#00000080] text-white placeholder-gray-400 focus:outline-none focus:border-[#D08700] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter your team name"
                />
              </div>

              {/* Team Leader Email */}
              <div>
                <label
                  htmlFor="teamLeaderEmail"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Team Leader Email *
                </label>
                <input
                  type="email"
                  id="teamLeaderEmail"
                  name="teamLeaderEmail"
                  value={formData.teamLeaderEmail}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading || isFormDisabled || hasSubmitted}
                  className="w-full px-6 py-4 rounded-[60px] border-2 border-gray-700 bg-[#00000080] text-white placeholder-gray-400 focus:outline-none focus:border-[#D08700] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter team leader's email address"
                />
              </div>

              {/* Google Drive Link */}
              <div>
                <label
                  htmlFor="driveLink"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Google Drive Folder Link *
                  <span className="text-sm text-gray-400 ml-2">
                    (Contains all submission files)
                  </span>
                </label>
                <input
                  type="url"
                  id="driveLink"
                  name="driveLink"
                  value={formData.driveLink}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading || isFormDisabled || hasSubmitted}
                  className="w-full px-6 py-4 rounded-[60px] border-2 border-gray-700 bg-[#00000080] text-white placeholder-gray-400 focus:outline-none focus:border-[#D08700] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="https://drive.google.com/drive/folders/your-folder-id"
                />
                <div className="mt-2 text-sm text-gray-400 flex items-center">
                  <span className="mr-2">🔗</span>
                  Make sure the folder is shared with "Anyone with the link can
                  view"
                </div>
              </div>

              {/* GitHub Repo Link - OPTIONAL */}
              <div>
                <label
                  htmlFor="githubRepo"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  GitHub Repository Link (Optional)
                </label>
                <input
                  type="url"
                  id="githubRepo"
                  name="githubRepo"
                  value={formData.githubRepo}
                  onChange={handleInputChange}
                  disabled={isLoading || isFormDisabled || hasSubmitted}
                  className="w-full px-6 py-4 rounded-[60px] border-2 border-gray-700 bg-[#00000080] text-white placeholder-gray-400 focus:outline-none focus:border-[#D08700] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="https://github.com/your-username/your-repo"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isLoading || isFormDisabled || hasSubmitted}
                  className={`px-12 py-4 rounded-full w-full md:w-auto font-bold text-lg transition-all duration-300 ${
                    isLoading || isFormDisabled || hasSubmitted
                      ? "opacity-60 cursor-not-allowed bg-gray-600"
                      : "hover:scale-105 hover:shadow-lg"
                  }`}
                  style={{
                    background:
                      isLoading || isFormDisabled || hasSubmitted
                        ? "#4B5563"
                        : "#D08700",
                    color: "white",
                  }}
                >
                  {hasSubmitted ? (
                    "Already Submitted ✓"
                  ) : isFormDisabled ? (
                    "Submissions Closed"
                  ) : isLoading ? (
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
                      Submitting...
                    </div>
                  ) : (
                    "Submit Your Work"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArcasPage;
