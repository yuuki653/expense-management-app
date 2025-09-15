import React, { useState } from "react";
import DailyExpenseList from "../components/DailyExpenseList";
import {
  formatDate,
  formatShortDate,
  formatDay,
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
      <div className="flex items-center justify-center my-5">
        <hr className="flex-grow border-2 border-gray-400" />
        <p className="mx-3 text-lg font-bold">5week</p>
        <hr className="flex-grow border-2 border-gray-400" />
      </div>
      <div className="flex justify-center gap-5 text-lg font-bold mb-5">
        <button
          onClick={() => {
            setMonthOffset(monthOffset - 1);
          }}
        >
          ◀
        </button>
        <p className="block md:hidden">
          {formatShortDate(monthRange.start)} ～{" "}
          {formatShortDate(monthRange.end)}
        </p>
        <p className="hidden md:block">
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
      <p className="text-center text-lg mb-3">
        Total　¥ {spentInMonth.toLocaleString()}
      </p>
      <div className="flex justify-end items-center mb-5">
        <div className="flex items-center text-sm">
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
            className="h-7 w-30 border-2 rounded-md border-gray-500 px-2"
          />
        </div>
      </div>
      <div className="hidden md:grid grid-cols-7 gap-1 max-w-4xl mx-auto">
        <div className="text-center font-bold p-2">Sat</div>
        <div className="text-center font-bold p-2">Sun</div>
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
                {dailyTotal > 0 ? (
                  `¥${dailyTotal.toLocaleString()}`
                ) : (
                  <p className="text-blue-700 font-bold">NMD</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden w-60 grid grid-cols-1 gap-1 mx-auto">
        {calendarDates.map((date) => {
          const dailyTotal = getDailyTotal(date, expenses);
          const dateObj = new Date(date);
          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date)}
              className="flex items-center border border-gray-300 h-8 p-1 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm w-10 text-center">
                {dateObj.getDate()}
              </div>
              <div className="border-l border-gray-400 h-6"></div>
              <div className="text-sm w-10 text-center">
                {formatDay(dateObj)}
              </div>
              <div className="border-l border-gray-400 h-6"></div>
              <div className="text-xs text-gray-600 text-center flex-grow">
                {dailyTotal > 0 ? (
                  `¥${dailyTotal.toLocaleString()}`
                ) : (
                  <p className="text-blue-700 font-bold">NMD</p>
                )}
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
