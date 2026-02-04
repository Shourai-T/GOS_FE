import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useDistribution } from "../hooks/useStudentData";

const CHART_COLORS = {
  EXCELLENT: "#10B981", // Green
  GOOD: "#3B82F6", // Blue
  AVERAGE: "#F59E0B", // Yellow
  WEAK: "#EF4444", // Red
};

const DistributionChart: React.FC = () => {
  const { data, loading, error } = useDistribution();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px] flex justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px] flex flex-col justify-center items-center text-red-500">
        <p className="font-medium">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">
        Phổ Điểm Theo Môn Học
      </h3>
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "#F3F4F6" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar
              dataKey="Giỏi"
              stackId="a"
              fill={CHART_COLORS.EXCELLENT}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Khá"
              stackId="a"
              fill={CHART_COLORS.GOOD}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="TB"
              stackId="a"
              fill={CHART_COLORS.AVERAGE}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Yếu"
              stackId="a"
              fill={CHART_COLORS.WEAK}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionChart;
