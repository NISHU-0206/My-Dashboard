import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Dashboard from "./Dashboard.js";
import "chart.js/auto";
import "./styles.css";

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [filters, setFilters] = useState({
    topic: "",
    sector: "",
    country: "",
    region: "",
    end_year: "",
    pestle: "",
    source: "",
    swot: "",
    city: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://127.0.0.1:5000/?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const data = {
    labels: chartData.map((item) => item.topic || "Unknown"),
    datasets: [
      {
        label: "Intensity",
        data: chartData.map((item) => item.intensity || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Likelihood",
        data: chartData.map((item) => item.likelihood || 0),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Relevance",
        data: chartData.map((item) => item.relevance || 0),
        backgroundColor: "rgba(4, 255, 255, 0.93)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Dashboard />

      <div className="main-content">
        <h2>Blackcoffer Data Dashboard</h2>

        {/* Filters */}
        <div className="filters">
          <input type="text" name="topic" placeholder="Topic" onChange={handleChange} />
          <input type="text" name="sector" placeholder="Sector" onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} />
          <input type="text" name="region" placeholder="Region" onChange={handleChange} />
          <input type="text" name="end_year" placeholder="End Year" onChange={handleChange} />
          <input type="text" name="pestle" placeholder="PEST" onChange={handleChange} />
          <input type="text" name="source" placeholder="Source" onChange={handleChange} />
          <input type="text" name="swot" placeholder="SWOT" onChange={handleChange} />
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
        </div>

        {/* Data Cards */}
        <div className="data-cards">
          {chartData.slice(0, 6).map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              <p><strong>Sector:</strong> {item.sector}</p>
              <p><strong>Country:</strong> {item.country}</p>
              <p><strong>Relevance:</strong> {item.relevance}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="chart-container">
          <h3>Data Visualization</h3>
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
