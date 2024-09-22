import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { abi } from "../scdata/Learn.json";
import { BrowserProvider, Contract } from "ethers";
import { LearningtrackerdappModule } from "../scdata/deployed_addresses.json";

// Register the charts to avoid 'Canvas is already in use' issues
Chart.register(...registerables);

const Userdashboard = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState({
    courseTitle: "",
    issuingAuthority: "",
    candidateName: "",
    duration: "",
    issueDate: "",
  });
  const [uploadedCertificates, setUploadedCertificates] = useState([]);
  const provider = new BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    const signer = await provider.getSigner();
    alert(`MetaMask is connected. Address: ${signer.address}`);
  }

  const [userData] = useState({
    username: "John Doe",
    metamaskAddress: "0x1234...abcd",
    coursesCompleted: 5,
    certificatesEarned: 3,
    tokens: 500,
    learningStreak: 10,
    badges: ["React Master", "10 Courses Completed"],
    recentlyLoggedCourses: [
      {
        cname: "React Development",
        status: "Pending Verification",
        date: "2023-08-12",
      },
      { cname: "JavaScript Basics", status: "Verified", date: "2023-06-23" },
    ],
  });

  const progressData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Courses Completed",
        data: [0, 1, 2, 3, 4, 5],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    connectToMetamask();

    const signer = await provider.getSigner();
    const instance = new Contract(LearningtrackerdappModule, abi, signer);
    const tx = await instance.addCertificate(
      certificateDetails.candidateName,
      certificateDetails.courseTitle,
      certificateDetails.issuingAuthority,
      certificateDetails.duration,
      certificateDetails.issueDate
    );

    await tx.wait();
    await submitForApproval(certificateDetails);
    await fetchCertificates();

    setCertificateDetails({
      courseTitle: "",
      issuingAuthority: "",
      candidateName: "",
      duration: "",
      issueDate: "",
    });
    setShowUploadForm(false);
  };

  const fetchCertificates = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(LearningtrackerdappModule, abi, signer);
      const certificates = await instance.getCertificates();
      setUploadedCertificates(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleCancel = () => {
    setCertificateDetails({
      courseTitle: "",
      issuingAuthority: "",
      candidateName: "",
      duration: "",
      issueDate: "",
    });
    setShowUploadForm(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const submitForApproval = async (certificateDetails) => {
    try {
      const response = await fetch("/api/submitcertificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificateDetails),
      });

      if (!response.ok) throw new Error("Failed to submit for approval");
      const data = await response.json();
      console.log("Approval request response:", data);
    } catch (error) {
      console.error("Error submitting for approval:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="col-span-1 text-center space-y-4 bg-white shadow-lg p-4 rounded-lg">
          <Avatar
            name={userData.username}
            size="80"
            className="mx-auto"
            round={true}
          />
          <h2 className="text-2xl font-bold">{userData.username}</h2>
          <p className="text-sm text-gray-500">
            MetaMask Address: {userData.metamaskAddress}
          </p>
        </div>

        {/* Stats */}
        <div className="col-span-1 bg-blue-50 shadow-lg p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Stats</h3>
          <div className="space-y-2">
            <p>
              Courses Completed: <strong>{userData.coursesCompleted}</strong>
            </p>
            <p>
              Certificates Earned:{" "}
              <strong>{userData.certificatesEarned}</strong>
            </p>
            <p>
              Tokens: <strong>{userData.tokens}</strong>
            </p>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="col-span-1 md:col-span-2 bg-green-50 shadow-lg p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Learning Progress</h3>
          <Line data={progressData} />
          <div className="mt-4">
            <h4 className="font-semibold">Milestones</h4>
            <p className="text-gray-600">
              5 courses completed. Next milestone: 10 courses!
            </p>
          </div>
        </div>

        {/* Activity Log */}
        <div className="col-span-1 bg-yellow-50 shadow-lg p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Activity Log</h3>
          <div className="space-y-2">
            {userData.recentlyLoggedCourses.map((course, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md">
                <p>
                  {course.cname} -
                  <span
                    className={`font-bold ${
                      course.status === "Verified"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {course.status}
                  </span>{" "}
                  on {course.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Certificate Button */}
        <div className="col-span-2 flex justify-center mb-4">
          <button
            className="h-10 w-48 bg-black text-white rounded-full hover:bg-gray-800"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? "Cancel Upload" : "Upload Certificate"}
          </button>
        </div>

        {/* Certificate Upload Form */}
        {showUploadForm && (
          <div className="bg-white shadow-lg p-6 rounded-md mb-6 col-span-2">
            <h3 className="text-xl font-semibold mb-4">Upload Certificate</h3>
            <form onSubmit={handleSubmit}>
              {Object.keys(certificateDetails).map((key) => (
                <div className="mb-4" key={key}>
                  <label
                    htmlFor={key}
                    className="block font-semibold mb-2 capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={key === "issueDate" ? "date" : "text"}
                    name={key}
                    id={key}
                    value={certificateDetails[key]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                >
                  Upload Certificate
                </button>
                <button
                  type="button"
                  className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Fetched Certificates Section */}
        <div className="col-span-2 bg-white shadow-lg p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">My Certificates</h3>
          <div className="space-y-2">
            {uploadedCertificates.length === 0 ? (
              <p>No certificates uploaded yet.</p>
            ) : (
              uploadedCertificates.map((cert, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md">
                  <p>
                    <strong>Course Title:</strong> {cert.courseTitle}
                  </p>
                  <p>
                    <strong>Issued to:</strong> {cert.candidateName}
                  </p>
                  <p>
                    <strong>Authority:</strong> {cert.issuingAuthority}
                  </p>
                  <p>
                    <strong>Date:</strong> {cert.issueDate}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
