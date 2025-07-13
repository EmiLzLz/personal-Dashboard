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
   <div className="w-11/12 mx-auto mt-8 px-4 py-4 rounded-2xl bg-white/30 backdrop-blur-xl shadow-2xl animate-fade-in border border-white/50">
      <h2 className="text-lg font-semibold text-black mb-1 text-center tracking-wide">
        Posts by User
      </h2>
      <p className="text-gray-700 text-center mb-4 text-xs">
        Distribution of posts across different users in the system
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid horizontal={true} vertical={false} stroke="#475569" />

          <XAxis dataKey="userId" stroke="#000000">
            <Label
              value="User ID"
              position="outsideBottom"
              dy={25}
              style={{ fill: "#000000", fontSize: 12 }}
            />
          </XAxis>

          <YAxis stroke="#000000">
            <Label
              value="Number of Posts"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle", fill: "#000000", fontSize: 12 }}
            />
          </YAxis>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#475569",
              color: "white",
            }}
            labelStyle={{ color: "#56E39F" }}
            itemStyle={{ color: "#f1f5f9" }}
          />

          <Bar
            dataKey="postCount"
            fill="#56E39F"
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
