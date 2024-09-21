import React, { useState, useEffect } from "react";

const EducatorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch educator's courses, certificates, and enrolled students from API
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

  const fetchCertificates = async () => {
    // Replace with actual API call
    const certificatesData = [
      { id: 1, name: "Blockchain Developer Certification", date: "2023-09-01" },
      { id: 2, name: "Smart Contracts Expert", date: "2023-08-15" },
    ];
    setCertificates(certificatesData);
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

      {/* Manage Certificates Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4"> Certificates Providing</h2>
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Certificate Name</th>
              <th className="px-4 py-2">Date Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate) => (
              <tr key={certificate.id}>
                <td className="border px-4 py-2">{certificate.name}</td>
                <td className="border px-4 py-2">{certificate.date}</td>
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

export default EducatorDashboard;
