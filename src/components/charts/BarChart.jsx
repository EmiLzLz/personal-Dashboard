import useApi from "../../hooks/useAPI";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const StatsBarChart = () => {
  const { data, loading, error } = useApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading)
    return <p className="text-center text-gray-400 mt-8">Cargando datos...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        Error al cargar los datos.
      </p>
    );

  // Agrupar cantidad de posts por usuario
  const groupedData = {};
  data.forEach((post) => {
    groupedData[post.userId] = (groupedData[post.userId] || 0) + 1;
  });

  // Generar datos con valores aleatorios simples
  const chartData = Object.entries(groupedData).map(([userId]) => ({
    userId: Number(userId),
    postCount: Math.floor(Math.random() * 11) + 5, // entre 5 y 15
  }));

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center tracking-wide">
        Publicaciones por Usuario
      </h2>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

          <XAxis dataKey="userId" stroke="#f1f5f9">
            <Label
              value="ID del Usuario"
              position="outsideBottom"
              dy={20}
              style={{ fill: "#ffffff", fontSize: 14 }}
            />
          </XAxis>

          <YAxis stroke="#f1f5f9">
            <Label
              value="Cantidad de Publicaciones"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle", fill: "#ffffff", fontSize: 14 }}
            />
          </YAxis>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#475569",
              color: "white",
            }}
            labelStyle={{ color: "#38bdf8" }}
            itemStyle={{ color: "#f1f5f9" }}
          />

          <Bar
            dataKey="postCount"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsBarChart;
