import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ topic: '', sector: '', country: '', end_year: '' });

  const barRef = useRef();
  const pieRef = useRef();
  const lineRef = useRef();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    axios.get(`${API_URL}/?${query}`).then(res => setData(res.data)).catch(err => console.error(err));
  }, [filters]);

  useEffect(() => {
    drawBarChart();
    drawPieChart();
    drawLineChart();
  }, [data]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const drawBarChart = () => {
    const svg = d3.select(barRef.current);
    svg.selectAll('*').remove();

    const width = 350, height = 250, margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const chartData = data.filter(d => d.intensity > 0).slice(0, 8);

    const x = d3.scaleBand().domain(chartData.map(d => d.topic || 'Unknown')).range([margin.left, width - margin.right]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(chartData, d => d.intensity)]).nice().range([height - margin.bottom, margin.top]);

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x)).selectAll('text')
      .attr('transform', 'rotate(-35)').style('text-anchor', 'end');

    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.selectAll('rect').data(chartData).enter().append('rect')
      .attr('x', d => x(d.topic || 'Unknown'))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.intensity))
      .attr('fill', (d, i) => d3.schemeTableau10[i % 10])
      .append('title').text(d => `${d.topic}: ${d.intensity}`);
  };

  const drawPieChart = () => {
    const svg = d3.select(pieRef.current);
    svg.selectAll('*').remove();

    const width = 250, height = 250, radius = 100;
    const counts = d3.rollup(data, v => v.length, d => d.country || 'Unknown');
    const pieData = Array.from(counts, ([key, value]) => ({ key, value })).slice(0, 6);

    const pie = d3.pie().value(d => d.value)(pieData);
    const arc = d3.arc().innerRadius(50).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeSet3);

    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .append('g').attr('transform', `translate(${width / 2},${height / 2})`)
      .selectAll('path').data(pie).enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.key))
      .append('title').text(d => `${d.data.key}: ${d.data.value}`);
  };

  const drawLineChart = () => {
    const svg = d3.select(lineRef.current);
    svg.selectAll('*').remove();

    const width = 400, height = 250, margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const grouped = d3.rollups(data.filter(d => d.end_year && d.relevance),
      v => d3.mean(v, d => d.relevance), d => +d.end_year)
      .map(([year, val]) => ({ year, value: val })).sort((a, b) => a.year - b.year);

    const x = d3.scaleLinear().domain(d3.extent(grouped, d => d.year)).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, d3.max(grouped, d => d.value)]).nice().range([height - margin.bottom, margin.top]);

    const line = d3.line().x(d => x(d.year)).y(d => y(d.value));
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickFormat(d3.format('d')));
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append('path').datum(grouped).attr('fill', 'none').attr('stroke', '#20c997')
      .attr('stroke-width', 2.5).attr('d', line);

    svg.selectAll('circle').data(grouped).enter().append('circle')
      .attr('cx', d => x(d.year)).attr('cy', d => y(d.value)).attr('r', 4)
      .attr('fill', (d, i) => d3.schemeSet2[i % 8]);
  };

  // Metrics for KPI Cards
  const totalRecords = data.length;
  const avgIntensity = d3.mean(data, d => d.intensity || 0)?.toFixed(1);
  const totalCountries = new Set(data.map(d => d.country)).size;
  const maxYear = d3.max(data, d => +d.end_year);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li>Overview</li>
          <li>Analytics</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="kpis">
          <div className="card">📊 Total Records: {totalRecords}</div>
          <div className="card">⚡ Avg Intensity: {avgIntensity}</div>
          <div className="card">🌍 Countries: {totalCountries}</div>
          <div className="card">📅 Latest Year: {maxYear}</div>
        </div>

        <div className="filters">
          <input name="topic" placeholder="Topic" onChange={handleChange} />
          <input name="sector" placeholder="Sector" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />
          <input name="end_year" placeholder="End Year" onChange={handleChange} />
        </div>

        <div className="charts">
          <div className="chart-box">
            <h3>Intensity by Topic</h3>
            <svg ref={barRef}></svg>
          </div>
          <div className="chart-box">
            <h3>Country Distribution</h3>
            <svg ref={pieRef}></svg>
          </div>
          <div className="chart-box">
            <h3>Relevance over Years</h3>
            <svg ref={lineRef}></svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;