// Certificate.js
import React from "react";

const Certificate = () => {
  const cname = "Student Name"; // Replace with actual student name
  const course = "Course Name"; // Replace with actual course name
  const grade = "A+"; // Replace with actual grade
  const date = "2024-09-21"; // Replace with actual date

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <img
          src="/src/assets/images/im2.png"
          alt="Academy Logo"
          className="w-16 h-16 mb-4"
        />
        <h1 className="text-4xl font-semibold text-red-800 mb-6">
          LEARNING TRACKER ACADEMY
        </h1>

        <div className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-full">
          <img
            src="/src/assets/images/images.jpeg"
            alt="Student"
            className="w-32 h-32 mb-4 rounded-full border-4 border-gray-200"
          />
          <p className="text-lg mb-4">This is to certify that</p>
          <p className="text-2xl font-semibold text-violet-700">{cname}</p>
          <p className="text-lg mb-4">has successfully completed</p>
          <p className="text-2xl font-semibold text-violet-700">{course}</p>
          <p className="text-lg mb-4">course on</p>
          <p className="text-2xl font-semibold text-violet-700">{date}</p>
          <p className="text-lg mb-4">with grade</p>
          <p className="text-2xl font-semibold text-violet-700">{grade}</p>
          <p className="text-lg mt-4">
            <b>Learning Tracker Academy</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
