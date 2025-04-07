import React from "react";
import "./styles.css"; // Import CSS

const Dashboard = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>Home</li>
        <li>Reports</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Dashboard;
