import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Expense, Category } from "../../types/index";
import {
  formatShortDate,
  getSaturday,
  getWeekRange,
  isDateInWeek,
} from "../../utils/dateUtils";
import { getCategoryChartDataInWeek } from "../../utils/chartUtils";

interface CategoryPieChartProps {
  expenses: Expense[];
  categories: Category[];
  weekOffset: number;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  expenses,
  categories,
  weekOffset,
}) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weekOffset * 7);
  const saturday = getSaturday(targetDate);
  const weekRange = getWeekRange(saturday);

  const data = getCategoryChartDataInWeek(
    expenses,
    categories,
    weekRange.start,
    weekRange.end
  );
  console.log(data);

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={400} height={400}>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default CategoryPieChart;
