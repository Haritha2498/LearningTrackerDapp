import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("Connected with MetaMask. Address:", signer.address);
      alert(`MetaMask is connected. Address: ${signer.address}`);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (res.ok) {
        const data = await res.json();
        const userType = data.userType;
        if (userType === "admin") return navigate("/admindashboard");
        else return navigate("/user");
      } else {
        return navigate("/");
      }
    } catch (err) {
      console.error("Error connecting to MetaMask", err);
      alert("Error connecting to MetaMask");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={loginSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-blue-400 bg-gray-50 placeholder-gray-500 transition duration-200 ease-in-out"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-blue-400 bg-gray-50 placeholder-gray-500 transition duration-200 ease-in-out"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Login
            </button>
            {/* <Link to="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link> */}
          </div>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
