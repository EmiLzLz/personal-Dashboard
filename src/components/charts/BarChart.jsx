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
    <div className="w-full mx-auto px-6 py-6 rounded-2xl bg-slate-800 shadow-2xl animate-fade-in border border-slate-700">
      <h2 className="text-lg font-semibold text-white mb-1 text-left tracking-wide">
        Posts by User
      </h2>
      <p className="text-slate-300 text-left mb-6 text-sm">
        Distribution of posts across different users in the system
      </p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid 
              horizontal={true} 
              vertical={false} 
              stroke="#374151" 
              strokeDasharray="3 3"
            />

            <XAxis 
              dataKey="userId" 
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />

            <YAxis 
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                color: "white",
                borderRadius: "8px",
                border: "1px solid #374151",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#f3f4f6", fontWeight: "600" }}
              itemStyle={{ color: "#60a5fa" }}
              cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
            />

            <Bar
              dataKey="postCount"
              fill="#60a5fa"
              radius={[9, 9, 0, 0]}
              maxBarSize={24}
              isAnimationActive={true}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsBarChart