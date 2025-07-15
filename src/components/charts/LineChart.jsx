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
    <div className="w-11/12 mx-auto mt-8 px-4 py-4 rounded-2xl bg-white/30 backdrop-blur-xl shadow-2xl animate-fade-in border border-white/50">
      <h2 className="text-lg font-semibold text-text-dark dark:text-text-light mb-1 text-center tracking-wide">
        Completed Tasks by User
      </h2>
      <p className="text-text-dark dark:text-text-light text-center mb-4 text-xs">
        Track the number of tasks completed by each user in the system
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
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
              value="Completed Tasks"
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

          <Line
            type="monotone"
            dataKey="completedCount"
            stroke="#56E39F"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#56E39F", strokeWidth: 2, fill: "#0f172a" }}
            activeDot={{ r: 8, fill: "#56E39F" }}
            isAnimationActive={true}
            animationDuration={800}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsLineChart;
