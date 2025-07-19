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
    { name: "Finished", value: completedCount },
    { name: "Unfinished", value: notCompletedCount },
  ];

  return (
    <div className="w-full mx-auto px-6 py-6 rounded-2xl bg-white shadow-2xl animate-fade-in border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-1 text-left tracking-wide">
        Completed Tasks Distribution
      </h2>
      <p className="text-slate-600 text-left mb-6 text-sm">
        View the distribution of completed tasks across all users
      </p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={85}
              fill="#60a5fa"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
              stroke="white"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Finished" ? "#60a5fa" : "#94a3b8"}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderColor: "#e5e7eb",
                color: "#374151",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#374151", fontWeight: "600" }}
              itemStyle={{ color: "#60a5fa" }}
            />
            
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-slate-600 text-sm font-medium">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPieChart;