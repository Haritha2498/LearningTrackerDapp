import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();  // Use navigate hook for redirection

  const redirectToSignup = () => {
    navigate('/sign-up');  // Redirect to signup page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">LearnTracker</span>
          <nav className="space-x-4 px-5 py-1 bg-black text-white rounded-full hover:bg-gray-900">
            <a href="#swap" className="hover:text-gray-700">Courses</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center space-y-10">
        <div className="text-center text-7xl font-bold">
          {/* Replace SWAPP with Learn Tracker */}
          <h1 className="relative">
            <span className="block">Learn</span>
            <span className="block">Tracker</span>
          </h1>
          <p className="mt-4 text-xl">Empowering decentralized learning with secure, blockchain-based certificate issuance and tracking.</p>
        </div>

        <div className="space-y-4">
          <button
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 item-center"
            onClick={redirectToSignup}  // Redirect to signup on click
          >
            Go to Learn Tracker
          </button>
        </div>
      </main>

      {/* Footer Links */}
      {/* <footer className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-4">
        <a href="#github" className="hover:text-gray-700">GitHub</a>
        <a href="#discord" className="hover:text-gray-700">Discord</a>
        <a href="#twitter" className="hover:text-gray-700">Twitter</a>
      </footer> */}
    </div>
  );
};

export default Home;