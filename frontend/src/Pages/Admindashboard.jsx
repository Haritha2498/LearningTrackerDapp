import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { abi } from "../scdata/Learn.json";
import { LearningtrackerdappModule } from "../scdata/deployed_addresses.json";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchCertificates();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    // Replace with actual API call
    const coursesData = [
      { id: 1, title: "Blockchain Fundamentals", enrolledStudents: 10 },
      { id: 2, title: "Advanced Smart Contracts", enrolledStudents: 15 },
    ];
    setCourses(coursesData);
  };


  const handleVerifyAndGrantTokens = (certificate) => {
    // Logic to verify the certificate and grant tokens
    // Example: Call smart contract or backend service here
    console.log(`Verifying certificate for ${certificate.candidateName}`);

    // Perform smart contract transaction or API call to grant tokens

    // Simulating token granting process
    setTimeout(() => {
      alert(`Tokens granted for ${certificate.candidateName}'s certificate!`);
    }, 1000); // Simulate an API call delay (1 second)
  };

  const fetchCertificates = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const instance = new Contract(LearningtrackerdappModule, abi, signer);
      const allCertificates = await instance.getCertificates(); // Fetch all certificates from contract

      setCertificates(allCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchStudents = async () => {
    // Replace with actual API call
    const studentsData = [
      { id: 1, name: "John Doe", course: "Blockchain Fundamentals" },
      { id: 2, name: "Jane Smith", course: "Advanced Smart Contracts" },
    ];
    setStudents(studentsData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Educator Dashboard</h1>

      {/* Manage Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Course Title</th>
              <th className="px-4 py-2">Enrolled Students</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.title}</td>
                <td className="border px-4 py-2">{course.enrolledStudents}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Manage Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add New Course Button */}
        <div className="text-right mt-10">
          <a href="/addcourse">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add New Course
            </button>
          </a>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Certificates Provided</h2>
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Certificate Name</th>
              <th className="px-4 py-2">Candidate Name</th>
              <th className="px-4 py-2">Issuing Authority</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Issue Date</th>
              <th className="px-4 py-2">Action</th>{" "}
              {/* New column for action */}
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{certificate.courseTitle}</td>
                <td className="border px-4 py-2">
                  {certificate.candidateName}
                </td>
                <td className="border px-4 py-2">
                  {certificate.issuingAuthority}
                </td>
                <td className="border px-4 py-2">{certificate.duration}</td>
                <td className="border px-4 py-2">{certificate.issueDate}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleVerifyAndGrantTokens(certificate)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Verify and Grant Tokens
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Enrolled Students Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Enrolled Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
