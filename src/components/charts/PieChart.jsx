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

  const COLORS = ["#38bdf8", "#64748b"]; // azul y gris oscuro

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center tracking-wide">
        Distribución de Tareas Completadas
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#475569",
              color: "white",
            }}
            labelStyle={{ color: "#38bdf8" }}
            itemStyle={{ color: "#f1f5f9" }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-slate-200 text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsPieChart;
