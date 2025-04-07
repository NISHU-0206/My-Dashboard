import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    topic: "",
    sector: "",
    country: "",
    end_year: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}?${queryParams}`);
    setData(response.data);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const intensityData = {
    labels: data.map((d) => d.topic || "Unknown"),
    datasets: [
      {
        label: "Intensity",
        data: data.map((d) => d.intensity),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Dashboard</h2> {/* Filters */}
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Topic"
            name="topic"
            onChange={handleFilterChange}
          />
        </div>
      </div> {/* Charts */}
      <div className="row">
        <div className="col-md-6">
          <h5>Intensity</h5>
          <Bar data={intensityData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
