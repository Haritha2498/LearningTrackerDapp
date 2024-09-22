import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("admin");
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (res.ok) {
      return navigate("/login");
    } else {
      return navigate("/sign-up");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      userName,
      password,
      email,
      userType,
    };
    signupSubmit(userDetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 lg:p-16 max-w-lg w-full relative">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 h-32 w-32 bg-indigo-500 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 h-32 w-32 bg-pink-500 rounded-full filter blur-3xl opacity-30"></div>

        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={submitForm} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-full shadow-md focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 bg-gray-100 focus:outline-none transition duration-200 ease-in-out"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-full shadow-md focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 bg-gray-100 focus:outline-none transition duration-200 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-full shadow-md focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 bg-gray-100 focus:outline-none transition duration-200 ease-in-out"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="relative">
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-6 py-4 border-none rounded-full shadow-md focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 bg-gray-100 focus:outline-none transition duration-200 ease-in-out"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out font-semibold text-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
