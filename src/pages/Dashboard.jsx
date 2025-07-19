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
        {/* Título principal */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            General Statistics
          </h1>
          <div className="w-36 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

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
        <div className="space-y-6 mb-6 pt-10">
          {/* Fila superior: PieChart y LineChart lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <StatsPieChart />
            </div>
            <div>
              <StatsLineChart />
            </div>
          </div>

          {/* Fila inferior: BarChart ocupando todo el ancho */}
          <div>
            <StatsBarChart />
          </div>
        </div>

        {/* Subtítulo para el slider */}
        <div className="mb-6 text-left pt-28">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 ">
            Recent Clients
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl">
            Explore most recent client profiles and their activity.
          </p>
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
