import React from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const Certificate = ({ cname, course, date, grade }) => {
  const downloadCertificate = () => {
    const element = document.getElementById("certificate");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "certificate.png"; // Set the filename for the download
      link.click();
    });
  };

  return (
    <div
      className="flex flex-col items-center bg-cover bg-center min-h-screen p-8"
      style={{
        backgroundImage:
          "url('/src/assets/images/stock-photo-man-going-write-something-notebook-top-view.jpeg')",
      }}
    >
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 w-full shadow-md">
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
              to="/certificate"
              className="text-white hover:bg-blue-600 px-4 py-2 rounded"
            >
              Back
            </Link>
            <Link
              to="/courses"
              className="text-white hover:bg-blue-600 px-4 py-2 rounded"
            >
              Courses
            </Link>
          </div>
        </div>
      </nav>

      <div
        id="certificate"
        className="flex flex-col items-center bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl border-4 border-blue-500 mt-6"
      >
        <img
          src="/src/assets/images/Dapp.png"
          alt="Academy Logo"
          className="w-20 h-20 mb-6"
        />
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          LEARNING TRACKER ACADEMY
        </h1>

        <div className="flex flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100 p-8 rounded-lg shadow-md w-full">
          <img
            src="/src/assets/images/images.png"
            alt="Student"
            className="w-36 h-36 mb-4 rounded-full border-4 border-blue-300 shadow-lg"
          />
          <p className="text-lg mb-2 font-semibold text-gray-800">
            This is to certify that
          </p>
          <p className="text-3xl font-bold text-purple-700 mb-4">{cname}</p>
          <p className="text-lg mb-2 font-semibold text-gray-800">
            has successfully completed
          </p>
          <p className="text-3xl font-bold text-purple-700 mb-4">{course}</p>
          <p className="text-lg mb-2 font-semibold text-gray-800">Course on</p>
          <p className="text-3xl font-bold text-purple-700 mb-4">{date}</p>
          <p className="text-lg mb-2 font-semibold text-gray-800">with grade</p>
          <p className="text-3xl font-bold text-purple-700 mb-6">{grade}</p>
          <p className="text-lg font-semibold text-gray-600 mt-4">
            <b>Learning Tracker Academy</b>
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadCertificate}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
      >
        Download Certificate
      </button>
    </div>
  );
};

// Example usage of the component with dynamic props
const ExampleUsage = () => {
  const cname = "Student Name"; // Replace with actual student name
  const course = "Course Name"; // Replace with actual course name
  const date = "Date"; // Fetch this dynamically
  const grade = "Grade"; // Fetch this dynamically

  return (
    <Certificate cname={cname} course={course} date={date} grade={grade} />
  );
};

export default ExampleUsage;
