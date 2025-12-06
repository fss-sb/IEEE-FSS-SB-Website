import ArcasBanner from "./ARCAS";

function ArcasComingSoon() {
  return (
    <div className="min-h-screen bg-[#00000070] mt-50">
      <div className="container mx-auto px-4 py-16">
        {/* Additional coming soon content */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-[#00000070] backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
            <h2 className="text-3xl font-bold mb-6 text-gray-200">
              ARCAS 1.0 is Almost Here!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The submission portal will open on{" "}
              <span className="text-[#ffcf75] font-bold">
                December 6, 2025 at 10:00 PM
              </span>
              . Prepare your team and get ready for an exciting challenge!
            </p>

            <div className="flex flex-col md:flex-row gap-6 mt-10 items-stretch md:items-center justify-center">
              <div className="bg-[#00000070] p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
                <div className="flex items-center justify-center mb-5">
                  <img src="/assets/icons/drive.png" className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Google Drive Ready
                </h3>
                <p className="text-gray-400 text-sm">
                  Create a shared folder with your team name for submission
                </p>
              </div>

              <div className="bg-[#00000070] p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
                <div className="flex items-center justify-center mb-5">
                  <img src="/assets/icons/team.png" className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Team Formation
                </h3>
                <p className="text-gray-400 text-sm">
                  Gather your team members and assign roles
                </p>
              </div>

              <div className="bg-[#00000070] p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
                <div className="flex items-center justify-center mb-5">
                  <img src="/assets/icons/book.png" className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">
                  Review Materials
                </h3>
                <p className="text-gray-400 text-sm">
                  Study the challenge brief and competition rules
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-gray-500 text-sm">
            <p>Page will automatically update when ARCAS 1.0 launches</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArcasComingSoon;
