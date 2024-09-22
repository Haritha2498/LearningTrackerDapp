import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { abi } from "../scdata/Learn.json";
import { BrowserProvider, Contract } from "ethers";
import { LearningtrackerdappModule } from "../scdata/deployed_addresses.json";

// Register the charts to avoid 'Canvas is already in use' issues
Chart.register(...registerables);

const Userdashboard = () => {
  const [showUploadForm, setShowUploadForm] = useState(false); // State to show/hide upload form
  const [certificateDetails, setCertificateDetails] = useState({
    courseTitle: "",
    issuingAuthority: "",
    candidateName: "",
    duration: "",
    issueDate: "",
  });

  const [uploadedCertificates, setUploadedCertificates] = useState([]); // State to hold fetched certificates

  const provider = new BrowserProvider(window.ethereum);

  async function connentToMetamask() {
    const signer = await provider.getSigner();
    console.log("signer", signer.address);
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
    nftCertificates: ["ReactNFT", "JavaScriptNFT"],
  });

  // Chart data
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

  const categoryData = {
    labels: ["Development", "Design", "Marketing"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., upload to server or blockchain)
    connentToMetamask();

    const signer = await provider.getSigner();
    const instance = new Contract(LearningtrackerdappModule, abi, signer);
    const txl = await instance.addCertificate(
      certificateDetails.candidateName,
      certificateDetails.courseTitle,
      certificateDetails.issuingAuthority,
      certificateDetails.duration,
      certificateDetails.issueDate
    );

    await txl.wait(); // Wait for the transaction to be mined
    console.log("transaction details:", txl);

    await submitForApproval(certificateDetails);

    // Fetch the certificates again after adding new data
    await fetchCertificates();

    // Reset form and hide upload form
    setCertificateDetails({
      courseTitle: "",
      issuingAuthority: "",
      candidateName: "",
      duration: "",
      issueDate: "",
    });
    setShowUploadForm(false);
  };

  // Fetch certificate data from the blockchain
  const fetchCertificates = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(LearningtrackerdappModule, abi, signer);
      const certificates = await instance.getCertificates(); // Assuming getCertificates is a function that returns all certificates

      // Assuming the certificates data comes as an array of objects
      setUploadedCertificates(certificates);
      console.log("Fetched certificates:", certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    // Reset form and hide the upload form
    setCertificateDetails({
      courseTitle: "",
      issuingAuthority: "",
      candidateName: "",
      duration: "",
      issueDate: "",
    });
    setShowUploadForm(false);
  };

  // Fetch certificates when the component mounts
  useEffect(() => {
    fetchCertificates();
  }, []);

  // Destroy charts properly using useEffect
  useEffect(() => {
    return () => {
      if (window.Chart) {
        window.Chart.helpers.each(Chart.instances, function (instance) {
          instance.destroy();
        });
      }
    };
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

      if (!response.ok) {
        throw new Error("Failed to submit for approval");
      }

      const data = await response.json();
      console.log("Approval request response:", data);
    } catch (error) {
      console.error("Error submitting for approval:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* User Info */}
      <div className="col-span-1 text-center space-y-4">
        <Avatar
          name={userData.username}
          size="80"
          className="mx-auto"
          round={true}
        />
        <h2 className="text-xl md:text-2xl font-bold">{userData.username}</h2>
        <p className="text-sm text-gray-500">
          MetaMask Address: {userData.metamaskAddress}
        </p>
      </div>

      {/* Stats */}
      <div className="col-span-1 lg:col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Stats</h3>
        <div className="space-y-2">
          <p>
            Courses Completed: <strong>{userData.coursesCompleted}</strong>
          </p>
          <p>
            Certificates Earned: <strong>{userData.certificatesEarned}</strong>
          </p>
          <p>
            Tokens: <strong>{userData.tokens}</strong>
          </p>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Learning Progress
        </h3>
        <div className="bg-white shadow-md p-3 md:p-4 rounded-lg mb-4">
          <Line data={progressData} />
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Milestones</h4>
          <p className="text-gray-600 text-sm md:text-base">
            5 courses completed. Next milestone: 10 courses!
          </p>
        </div>
      </div>

      {/* Activity Log */}
      <div className="col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Activity Log</h3>
        <div className="space-y-2">
          {userData.recentlyLoggedCourses.map((course, index) => (
            <div key={index} className="bg-white shadow-md p-3 rounded-md">
              <p>
                {course.cname} -{" "}
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
      <button
        className="h-8 w-40 bg-black text-white rounded-full hover:bg-gray-900 item-center mb-5 text-xs"
        onClick={() => setShowUploadForm(!showUploadForm)}
      >
        {showUploadForm ? "Cancel Upload" : "Upload Certificate"}
      </button>

      {/* Certificate Upload Form */}
      {showUploadForm && (
        <div className="bg-white shadow-md p-6 rounded-md mb-6 col-span-2 md:col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Upload Certificate</h3>
          <form onSubmit={handleSubmit}>
            {/* Certificate Form Fields */}
            <div className="mb-4">
              <label htmlFor="courseTitle" className="block font-semibold mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="courseTitle"
                id="courseTitle"
                value={certificateDetails.courseTitle}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="issuingAuthority"
                className="block font-semibold mb-2"
              >
                Issuing Authority
              </label>
              <input
                type="text"
                name="issuingAuthority"
                id="issuingAuthority"
                value={certificateDetails.issuingAuthority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="candidateName"
                className="block font-semibold mb-2"
              >
                Candidate Name
              </label>
              <input
                type="text"
                name="candidateName"
                id="candidateName"
                value={certificateDetails.candidateName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block font-semibold mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                value={certificateDetails.duration}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="issueDate" className="block font-semibold mb-2">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                id="issueDate"
                value={certificateDetails.issueDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

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
      <div className="col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          My Certificates
        </h3>
        <div className="space-y-2">
          {uploadedCertificates.length === 0 ? (
            <p>No certificates uploaded yet.</p>
          ) : (
            uploadedCertificates.map((cert, index) => (
              <div key={index} className="bg-white shadow-md p-3 rounded-md">
                <p>
                  <strong>Course Title:</strong> {cert.courseTitle}
                </p>
                <p>
                  <strong>Issuing Authority:</strong> {cert.issuingAuthority}
                </p>
                <p>
                  <strong>Candidate Name:</strong> {cert.candidateName}
                </p>
                <p>
                  <strong>Duration:</strong> {cert.duration}
                </p>
                <p>
                  <strong>Issue Date:</strong> {cert.issueDate}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
