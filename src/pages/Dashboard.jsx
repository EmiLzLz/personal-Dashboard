import React from "react";
import StatsLineChart from "../components/charts/LineChart";
import StatsBarChart from "../components/charts/BarChart";
import StatsPieChart from "../components/charts/PieChart";
import CardSlider from "../components/StatsSlider";
import SummaryCard from "../components/SummaryCard";
import { FileText, MessageCircle, Camera, Users } from "lucide-react";

function Dashboard() {
  return (
    <section className="stats min-h-screen pt-2 md:pt-40 px-2 md:px-8">
      <div className=" mx-auto">
        {/* Primera fila: Summary Cards con espacio central */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {/* Dos summary cards a la izquierda */}
          <div className="col-span-1">
            <SummaryCard
              title={"POSTS"}
              icon={FileText}
              endpoint={"https://jsonplaceholder.typicode.com/posts"}
            />
          </div>

          <div className="col-span-1">
            <SummaryCard
              title={"COMMENTS"}
              icon={MessageCircle}
              endpoint={"https://jsonplaceholder.typicode.com/comments"}
            />
          </div>

          {/* Espacio central vacío para objeto 3D - oculto en móvil */}
          <div className="hidden lg:block col-span-1">
            {/* Espacio vacío para el objeto 3D */}
          </div>

          {/* Dos summary cards a la derecha */}
          <div className="col-span-1">
            <SummaryCard
              title={"PHOTOS"}
              icon={Camera}
              endpoint={"https://jsonplaceholder.typicode.com/photos"}
            />
          </div>

          <div className="col-span-1">
            <SummaryCard
              title={"USERS"}
              icon={Users}
              endpoint={"https://jsonplaceholder.typicode.com/users"}
            />
          </div>
        </div>

        {/* Segunda fila: Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Columna izquierda: dos gráficas una debajo de otra */}
          <div className="col-span-1 space-y-6">
            <div>
              <StatsLineChart />
            </div>
            <div>
              <StatsPieChart />
            </div>
          </div>

          {/* Columna derecha: una gráfica ocupando todo el espacio */}
          <div className="col-span-1 lg:col-span-2">
            <StatsBarChart />
          </div>
        </div>

        {/* Tercera fila: Slider ocupando 100% del ancho */}
        <div>
          <CardSlider />
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
