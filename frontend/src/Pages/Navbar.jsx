// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Learning Tracker</Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-600 px-4 py-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/sign-up"
            className="text-white hover:bg-blue-600 px-4 py-2 rounded"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-white hover:bg-blue-600 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/certificate"
            className="text-white hover:bg-blue-600 px-4 py-2 rounded"
          >
            Certificate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
