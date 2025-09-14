import React, { useState, useMemo } from "react";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import { Expense, Category } from "../types/index";
import {
  formatDate,
  getSaturday,
  getWeekRange,
  getMonthRange,
  isDateInMonth,
  isDateInWeek,
} from "../utils/dateUtils";
import {
  getCategoryChartDataInWeek,
  getCategoryChartDataInMonth,
} from "../utils/chartUtils";
import { loadData } from "../utils/localStorage";

interface ChartPageProps {
  expenses: Expense[];
  categories: Category[];
}
const ChartPage: React.FC<ChartPageProps> = ({ expenses, categories }) => {
  const [offset, setOffset] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"week" | "month">("month");
  const [startDate, setStartDate] = useState(() => {
    const saved = loadData<string>("calendarStartDate");
    return saved ? new Date(saved) : new Date();
  });
  const { range, data } = useMemo(() => {
    if (viewMode === "week") {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + offset * 7);
      const saturday = getSaturday(targetDate);
      const weekRange = getWeekRange(saturday);

      return {
        range: weekRange,
        data: getCategoryChartDataInWeek(
          expenses,
          categories,
          weekRange.start,
          weekRange.end
        ),
      };
    } else {
      const targetDate = new Date(startDate);
      targetDate.setDate(startDate.getDate() + offset * 35);
      const startSaturday = getSaturday(targetDate);
      const monthRange = getMonthRange(startSaturday);

      return {
        range: monthRange,
        data: getCategoryChartDataInMonth(
          expenses,
          categories,
          monthRange.start,
          monthRange.end
        ),
      };
    }
  }, [viewMode, offset, expenses, categories, startDate]);

  const thisPeriodExpenses = expenses.filter((expense) => {
    if (viewMode === "month") {
      return isDateInMonth(expense.date, range.start, range.end);
    } else {
      return isDateInWeek(expense.date, range.start, range.end);
    }
  });
  const spentInPeriod = thisPeriodExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-center my-5">
        <hr className="flex-grow border-2 border-gray-400" />
        <p className="mx-3 text-lg font-bold">record</p>
        <hr className="flex-grow border-2 border-gray-400" />
      </div>
      <div className="flex justify-center gap-5 text-lg font-bold mb-5">
        <button
          onClick={() => {
            setViewMode("month");
            setOffset(0);
          }}
        >
          5週間
        </button>
        <button
          onClick={() => {
            setViewMode("week");
            setOffset(0);
          }}
        >
          1週間
        </button>
      </div>
      <div className="flex justify-center gap-5 text-lg font-bold mb-5">
        <button
          onClick={() => {
            setOffset(offset - 1);
          }}
        >
          ◀
        </button>
        <p>
          {formatDate(range.start)} ～ {formatDate(range.end)}
        </p>
        <button
          onClick={() => {
            setOffset(offset + 1);
          }}
        >
          ▶
        </button>
      </div>
      <CategoryPieChart data={data} />
      <div>
        <p>¥ {spentInPeriod.toLocaleString()}</p>
        {data.map((d) => {
          return (
            <p key={d.name}>
              ▷ {d.name}：¥ {d.value.toLocaleString()}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ChartPage;
