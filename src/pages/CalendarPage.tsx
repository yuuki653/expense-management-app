import React, { useState } from "react";
import DailyExpenseList from "../components/DailyExpenseList";
import {
  formatDate,
  generateCalendarDates,
  getDailyTotal,
  getSaturday,
  getMonthRange,
  isDateInMonth,
} from "../utils/dateUtils";
import { Expense, Category } from "../types/index";
import { loadData, saveData } from "../utils/localStorage";

interface CalendarPageProps {
  expenses: Expense[];
  categories: Category[];
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updateExpense: Expense) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({
  expenses,
  categories,
  deleteExpense,
  updateExpense,
}) => {
  const [startDate, setStartDate] = useState(() => {
    const saved = loadData<string>("calendarStartDate");
    return saved ? new Date(saved) : new Date();
  });
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [monthOffset, setMonthOffset] = useState(0);

  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + monthOffset * 35);
  const startSaturday = getSaturday(targetDate);
  const monthRange = getMonthRange(startSaturday);
  const calendarDates = generateCalendarDates(startSaturday);

  const thisMonthExpenses = expenses.filter((expense) =>
    isDateInMonth(expense.date, monthRange.start, monthRange.end)
  );
  const spentInMonth = thisMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center">
          <p>開始日を変更：</p>
          <input
            type="date"
            value={getSaturday(startDate).toISOString().split("T")[0]}
            onChange={(e) => {
              const newStartDate = getSaturday(new Date(e.target.value));
              setStartDate(newStartDate);
              saveData("calendarStartDate", newStartDate.toISOString());
              setMonthOffset(0);
            }}
            className="h-8 w-30 border-2 rounded-md border-gray-500 px-2"
          />
        </div>
      </div>
      <div className="flex justify-center gap-5 text-lg font-bold mb-5">
        <button
          onClick={() => {
            setMonthOffset(monthOffset - 1);
          }}
        >
          ◀
        </button>
        <p>
          {formatDate(monthRange.start)} ～ {formatDate(monthRange.end)}
        </p>
        <button
          onClick={() => {
            setMonthOffset(monthOffset + 1);
          }}
        >
          ▶
        </button>
      </div>
      <p className="text-center mb-5">
        Total　¥ {spentInMonth.toLocaleString()}
      </p>
      <div className="grid grid-cols-7 gap-1 max-w-4xl mx-auto">
        <div className="text-center font-bold p-2">Sat</div>
        <div className="text-center font-bold p-2 text-red-600">Sun</div>
        <div className="text-center font-bold p-2">Mon</div>
        <div className="text-center font-bold p-2">Tue</div>
        <div className="text-center font-bold p-2">Wed</div>
        <div className="text-center font-bold p-2">Thu</div>
        <div className="text-center font-bold p-2">Fri</div>

        {calendarDates.map((date) => {
          const dailyTotal = getDailyTotal(date, expenses);
          const dateObj = new Date(date);
          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date)}
              className="border border-gray-300 h-20 p-1 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm">{dateObj.getDate()}</div>
              <div className="text-xs text-gray-600 text-center ">
                {dailyTotal > 0 ? `¥${dailyTotal.toLocaleString()}` : "NMD"}
              </div>
            </div>
          );
        })}
      </div>
      <DailyExpenseList
        expenses={expenses}
        categories={categories}
        selectedDate={selectedDate}
        deleteExpense={deleteExpense}
        updateExpense={updateExpense}
      />
    </div>
  );
};

export default CalendarPage;
