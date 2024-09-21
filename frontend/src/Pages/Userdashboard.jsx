
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the charts to avoid 'Canvas is already in use' issues
Chart.register(...registerables);

const Userdashboard = () => {
  const [userData] = useState({
    username: 'John Doe',
    metamaskAddress: '0x1234...abcd',
    coursesCompleted: 5,
    certificatesEarned: 3,
    tokens: 500,
    learningStreak: 10,
    badges: ['React Master', '10 Courses Completed'],
    recentlyLoggedCourses: [
      { cname: 'React Development', status: 'Pending Verification', date: '2023-08-12' },
      { cname: 'JavaScript Basics', status: 'Verified', date: '2023-06-23' },
    ],
    nftCertificates: ['ReactNFT', 'JavaScriptNFT'],
  });

  // Chart data
  const progressData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Courses Completed',
        data: [0, 1, 2, 3, 4, 5],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const categoryData = {
    labels: ['Development', 'Design', 'Marketing'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

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

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* User Info */}
      <div className="col-span-1 text-center space-y-4">
        <Avatar name={userData.username} size="80" className="mx-auto" round={true} />
        <h2 className="text-xl md:text-2xl font-bold">{userData.username}</h2>
        <p className="text-sm text-gray-500">MetaMask Address: {userData.metamaskAddress}</p>
      </div>

      {/* Stats */}
      <div className="col-span-1 lg:col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Stats</h3>
        <div className="space-y-2">
          <p>Courses Completed: <strong>{userData.coursesCompleted}</strong></p>
          <p>Certificates Earned: <strong>{userData.certificatesEarned}</strong></p>
          <p>Tokens: <strong>{userData.tokens}</strong></p>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Learning Progress</h3>
        <div className="bg-white shadow-md p-3 md:p-4 rounded-lg mb-4">
          <Line data={progressData} />
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Milestones</h4>
          <p className="text-gray-600 text-sm md:text-base">5 courses completed. Next milestone: 10 courses!</p>
        </div>
      </div>

      {/* Activity Log */}
      <div className="col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Activity Log</h3>
        <div className="space-y-2">
          {userData.recentlyLoggedCourses.map((course, index) => (
            <div key={index} className="bg-white shadow-md p-3 rounded-md">
              <p>{course.cname} - <span className={`font-bold ${course.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'}`}>{course.status}</span> on {course.date}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 item-center"
         > Upload Certificate
          </button>



      {/* Certificates Section */}
      <div className="col-span-2 md:col-span-2 lg:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Certificates Earned (NFTs)</h3>
        <div className="grid grid-cols-2 gap-4">
          {userData.nftCertificates.map((nft, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg text-center">
              <img src={`https://example.com/nfts/${nft}.png`} alt={nft} className="w-full h-24 md:h-32 object-cover mb-2" />
              <p className="text-sm md:text-base">{nft}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tokens and Rewards */}
      <div className="col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Tokens & Rewards</h3>
        <div className="bg-white shadow-md p-4 rounded-lg space-y-2">
          <p>Balance: <strong>{userData.tokens}</strong> tokens</p>
          <p>Redeem tokens for discounts or new courses!</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="col-span-2 md:col-span-2 lg:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Achievements</h3>
        <div className="bg-white shadow-md p-4 rounded-lg space-y-2">
          <p>Digital Badges: <strong>{userData.badges.join(', ')}</strong></p>
          <p>Learning Streak: <strong>{userData.learningStreak}</strong> days</p>
        </div>
      </div>

      {/* Learning Analytics */}
      <div className="col-span-2 md:col-span-2 lg:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Learning Analytics</h3>
        <div className="bg-white shadow-md p-3 md:p-4 rounded-lg" style={{ width: '200px', height: '200px', margin: '0 auto' }}>
          <Pie data={categoryData} />
        </div>
      </div>

      {/* Notifications */}
      <div className="col-span-1">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Notifications</h3>
        <div className="space-y-2">
          <p>New NFT earned for React Development Course!</p>
          <p>React Certification Verified!</p>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;



