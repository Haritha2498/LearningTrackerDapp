import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const redirectToSignup = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between p-6 z-10">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-extrabold text-white tracking-wide">
            SkillChain
          </span>
          <nav className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition">
            <a href="/sign-up" className="font-medium">
              Courses
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="z-10 flex flex-col items-center justify-center space-y-12 mt-10">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight">
            Empower Your <br /> Learning Journey
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-100">
            Decentralized learning platform for secure, blockchain-based <br />{" "}
            certificate issuance and tracking.
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div className="flex space-x-6">
          <button
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 shadow-lg transform hover:scale-105 transition-transform"
            onClick={redirectToSignup}
          >
            Get Started
          </button>
          {/* <button
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 shadow-lg transform hover:scale-105 transition-transform"
          >
            Learn More
          </button> */}
        </div>
      </main>

      {/* Decorative Circles */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply opacity-70 filter blur-3xl"></div>
      <div className="absolute bottom-16 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply opacity-70 filter blur-2xl"></div>
    </div>
  );
};

export default Home;