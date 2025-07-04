import React from "react";
import StatsLineChart from "../components/charts/LineChart";
import StatsBarChart from "../components/charts/BarChart";
import StatsPieChart from "../components/charts/PieChart";
import CardSlider from "../components/StatsSlider";

function Dashboard() {
  return (
    <div className="stats">
      <div className="stats-squares"></div>
      <div className="stats-graphs">
        <StatsLineChart />
        <StatsBarChart />
        <StatsPieChart />
      </div>
      <div className="stats-slider">
        <CardSlider />
      </div>
    </div>
  );
}

export default Dashboard;
