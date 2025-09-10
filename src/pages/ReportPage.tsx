import React, { useState } from "react";
import WeeklySummary from "../components/WeeklySummary";
import ExpenseList from "../components/ExpenseList";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import { Expense, Category, Budget } from "../types/index";

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

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WeeklySummary
        expenses={expenses}
        budget={budget}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
      />
      <CategoryPieChart
        expenses={expenses}
        categories={categories}
        weekOffset={weekOffset}
      />
      <ExpenseList
        expenses={expenses}
        categories={categories}
        deleteExpense={deleteExpense}
        updateExpense={updateExpense}
        weekOffset={weekOffset}
      />
    </div>
  );
};

export default ReportPage;
