import useApi from "../../hooks/useAPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const StatsLineChart = () => {
  const { data, loading, error } = useApi(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (loading)
    return <p className="text-center text-gray-400 mt-8">Cargando datos...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        Error al cargar los datos.
      </p>
    );

  // Agrupar tareas completadas por userId
  const groupedData = {};
  data.forEach((todo) => {
    if (todo.completed) {
      groupedData[todo.userId] = (groupedData[todo.userId] || 0) + 1;
    }
  });

  const chartData = Object.entries(groupedData).map(([userId, count]) => ({
    userId: Number(userId),
    completedCount: count,
  }));

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center tracking-wide">
        Tareas Completadas por Usuario
      </h2>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

          <XAxis dataKey="userId" stroke="#f1f5f9">
            <Label
              value="ID del Usuario"
              position="outsideBottom"
              dy={40}
              style={{ fill: "#ffffff", fontSize: 14 }}
            />
          </XAxis>

          <YAxis stroke="#f1f5f9">
            <Label
              value="Tareas Completadas"
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

          <Line
            type="monotone"
            dataKey="completedCount"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#38bdf8", strokeWidth: 2, fill: "#0f172a" }}
            activeDot={{ r: 8, fill: "#38bdf8" }}
            isAnimationActive={true} // ✅ Animación al trazar
            animationDuration={800}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsLineChart;
