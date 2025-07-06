import React from "react";
import StatsLineChart from "../components/charts/LineChart";
import StatsBarChart from "../components/charts/BarChart";
import StatsPieChart from "../components/charts/PieChart";
import CardSlider from "../components/StatsSlider";
import SummaryCard from "../components/SummaryCard";
import { FileText, MessageCircle, Image, Camera, Users } from "lucide-react";

function Dashboard() {
  return (
    <div className="stats">
      <div className="stats-squares grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        <SummaryCard
          title={"POSTS"}
          icon={FileText}
          endpoint={"https://jsonplaceholder.typicode.com/posts"}
        />
        <SummaryCard
          title={"COMMENTS"}
          icon={MessageCircle}
          endpoint={"https://jsonplaceholder.typicode.com/comments"}
        />
        <SummaryCard
          title={"ALBUMS"}
          icon={Image}
          endpoint={"https://jsonplaceholder.typicode.com/albums"}
        />
        <SummaryCard
          title={"PHOTOS"}
          icon={Camera}
          endpoint={"https://jsonplaceholder.typicode.com/photos"}
        />
        <SummaryCard
          title={"USERS"}
          icon={Users}
          endpoint={"https://jsonplaceholder.typicode.com/users"}
        />
      </div>
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
