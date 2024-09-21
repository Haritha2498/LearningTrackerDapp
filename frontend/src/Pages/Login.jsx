import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";
// import { toast } from "react-toastify";
// import jwtDecode from "jwt-decode"; (Uncomment this if you have jwt-decode installed)

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    try {
      // Connection to MetaMask
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("Connected with MetaMask. Address:", signer.address);
      alert(`MetaMask is connected. Address: ${signer.address}`);

      // const userType = data.userType;
      // console.log(userType)

      // Handle login
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
        console.log(userType)

        if (userType === "admin") 
          return navigate("/educatordashboard");
        else 
        return navigate("/user");
        
        
      } else {
        // toast.error("Please check your credentials");
        return navigate("/");
      }
    } catch (err) {
      console.error("Error connecting to MetaMask", err);
      alert("Error connecting to MetaMask");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-blue-500 mb-6">
          Login
        </h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <Link to="#" className="text-blue-700 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const getUserType = () => {
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authtoken"))
    ?.split("=")[1];

  if (authToken) {
    // If jwtDecode is available, decode the token
    const decoded = jwtDecode(authToken);
    console.log("decoded", decoded);
    return decoded.userType;

    return "admin"; // Dummy return for now
  }
  return null;
};

export { LoginPage as default, getUserType };
