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
  Area,
  AreaChart,
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
    <div className="w-full mx-auto px-6 py-6 rounded-2xl bg-white shadow-2xl animate-fade-in border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-1 text-left tracking-wide">
        Completed Tasks by User
      </h2>
      <p className="text-slate-600 text-left mb-6 text-sm">
        Track the number of tasks completed by each user in the system
      </p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid 
              horizontal={true} 
              vertical={false} 
              stroke="#e5e7eb" 
              strokeDasharray="2 4"
            />

            <XAxis 
              dataKey="userId" 
              stroke="#6b7280"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />

            <YAxis 
              stroke="#6b7280"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />

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
              cursor={{ stroke: "rgba(148, 163, 184, 0.3)", strokeWidth: 1 }}
            />

            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2}/>
                <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="completedCount"
              stroke="#60a5fa"
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={{ r: 4, stroke: "#60a5fa", strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 6, fill: "#60a5fa", stroke: "white", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsLineChart;