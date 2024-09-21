import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();  // Use navigate hook for redirection

  const redirectToSignup = () => {
    navigate('/sign-up');  // Redirect to signup page
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col  items-center justify-center"
      style={{ backgroundImage: `url('/src/assets/images/BackgroundV.png')`}}  // Adjust path to your image
    >
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-black">LearnTracker</span>
          <nav className="space-x-4 px-5 py-1 bg-black text-white rounded-full hover:bg-gray-900">
            <a href="#swap" className="hover:text-gray-300">Courses</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center space-y-10">
        <div className="text-center text-7xl font-bold text-black">
          <h1 className="relative">
            <span className="block">Learn</span>
            <span className="block">Tracker</span>
          </h1>
          <p className="mt-4 text-xl text-black">
            Empowering decentralized learning with secure, blockchain-based certificate issuance and tracking.
          </p>
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

    </div>
  );
};

export default Home;