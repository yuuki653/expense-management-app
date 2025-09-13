import React, { useState, useMemo } from "react";
import WeeklySummary from "../components/WeeklySummary";
import ExpenseList from "../components/ExpenseList";
import { Expense, Category, Budget } from "../types/index";
import { getSaturday, getWeekRange, isDateInWeek } from "../utils/dateUtils";

interface ReportPageProps {
  expenses: Expense[];
  categories: Category[];
  budget: Budget;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updateExpense: Expense) => void;
}
const ReportPage: React.FC<ReportPageProps> = ({
  expenses,
  categories,
  budget,
  deleteExpense,
  updateExpense,
}) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const { weekRange, thisWeekExpenses } = useMemo(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + weekOffset * 7);
    const saturday = getSaturday(targetDate);
    const weekRange = getWeekRange(saturday);
    const thisWeekExpenses = expenses.filter((expense) =>
      isDateInWeek(expense.date, weekRange.start, weekRange.end)
    );

    return { weekRange, thisWeekExpenses };
  }, [weekOffset, expenses]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WeeklySummary
        budget={budget}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        weekRange={weekRange}
        thisWeekExpenses={thisWeekExpenses}
      />
      <ExpenseList
        categories={categories}
        deleteExpense={deleteExpense}
        updateExpense={updateExpense}
        thisWeekExpenses={thisWeekExpenses}
      />
    </div>
  );
};

export default ReportPage;
