import React, { useState } from "react";
import WeeklySummary from "../components/WeeklySummary";
import ExpenseList from "../components/ExpenseList";
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
    <>
      <WeeklySummary
        expenses={expenses}
        budget={budget}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
      />
      <ExpenseList
        expenses={expenses}
        categories={categories}
        deleteExpense={deleteExpense}
        updateExpense={updateExpense}
        weekOffset={weekOffset}
      />
    </>
  );
};

export default ReportPage;
