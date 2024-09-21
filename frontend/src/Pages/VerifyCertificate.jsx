import React, { useState } from "react";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://your-api-endpoint/certificates/${certificateId}`
      );

      if (!response.ok) {
        throw new Error("Certificate not found.");
      }

      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <nav className="bg-gray-800 p-4 shadow-md w-full">
        <div className="container mx-auto flex justify-end">
          <a href="/" className="text-white hover:text-blue-400">
            Home
          </a>
        </div>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-10">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Verify Your Certificate
        </h1>

        <label className="block text-lg mb-2">Certificate ID</label>
        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Certificate ID"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 transition duration-200"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {verificationResult && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-lg font-semibold text-green-600">
              Certificate Verified Successfully!
            </p>
            <div className="text-gray-700 mt-2">
              <p>
                <strong>Student Name:</strong> {verificationResult.cname}
              </p>
              <p>
                <strong>Course:</strong> {verificationResult.course}
              </p>
              <p>
                <strong>Grade:</strong> {verificationResult.grade}
              </p>
              <p>
                <strong>Date:</strong> {verificationResult.date}
              </p>
            </div>
          </div>
        )}
      </div>

      <a href="/" className="mt-6 text-blue-600 underline">
        Back to Home
      </a>
    </div>
  );
};

export default VerifyCertificate;
