import useApi from "../../hooks/useAPI";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatsPieChart = () => {
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

  // Contar tareas completadas e incompletas
  const completedCount = data.filter((todo) => todo.completed).length;
  const notCompletedCount = data.length - completedCount;

  const chartData = [
    { name: "Completadas", value: completedCount },
    { name: "Incompletas", value: notCompletedCount },
  ];

  return (
    <div className="w-11/12 mx-auto mt-8 px-4 py-4 rounded-2xl bg-white/30 backdrop-blur-xl shadow-2xl animate-fade-in border border-white/50">
      <h2 className="text-lg font-semibold text-black mb-1 text-center tracking-wide">
        Completed Tasks Distribution
      </h2>
      <p className="text-gray-700 text-center mb-4 text-xs">
        View the distribution of completed tasks across all users
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            outerRadius={80}
            fill="#56E39F"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === "Completadas" ? "#56E39F" : "#64748b"}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#475569",
              color: "white",
            }}
            labelStyle={{ color: "#56E39F" }}
            itemStyle={{ color: "#f1f5f9" }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => (
              <span className="text-black text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsPieChart;
