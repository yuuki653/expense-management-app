import React, { useState, useMemo } from "react";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import { Expense, Category } from "../types/index";
import {
  formatDate,
  formatShortDate,
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
        <p className="mx-3 text-lg font-bold">chart</p>
        <hr className="flex-grow border-2 border-gray-400" />
      </div>
      <div className="flex justify-center gap-5 text-lg font-bold mb-5">
        <button
          onClick={() => {
            setViewMode("month");
            setOffset(0);
          }}
          className="h-9 text-orange-400 underline decoration-2 underline-offset-4 px-3 hover:bg-orange-400 hover:text-gray-100 rounded-md transition-colors"
        >
          5週間
        </button>
        <button
          onClick={() => {
            setViewMode("week");
            setOffset(0);
          }}
          className="h-9 text-yellow-500 underline decoration-2 underline-offset-4 px-3 hover:bg-yellow-500 hover:text-gray-100 rounded-md transition-colors"
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
        <p className="block md:hidden">
          {formatShortDate(range.start)} ～ {formatShortDate(range.end)}
        </p>
        <p className="hidden md:block">
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
      <div className="w-60 mx-auto">
        <CategoryPieChart data={data} />
      </div>
      <div className="w-60 mx-auto my-5">
        <p className="flex items-center ">¥ {spentInPeriod.toLocaleString()}</p>
        {data.map((d) => {
          return (
            <div key={d.name}>
              <div className="flex items-center bg-green-100 px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H12.5A1.5 1.5 0 0 1 14 5.5v1.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8h-9A1.5 1.5 0 0 0 2 9.5Z" />
                </svg>
                <p className="ml-4">{d.name}</p>
              </div>
              <div className="flex items-center ml-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM5.6 3.55a.75.75 0 1 0-1.2.9L7.063 8H4.75a.75.75 0 0 0 0 1.5h2.5v1h-2.5a.75.75 0 0 0 0 1.5h2.5v.5a.75.75 0 0 0 1.5 0V12h2.5a.75.75 0 0 0 0-1.5h-2.5v-1h2.5a.75.75 0 0 0 0-1.5H8.938L11.6 4.45a.75.75 0 1 0-1.2-.9L8 6.75l-2.4-3.2Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="ml-4">{d.value.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartPage;
