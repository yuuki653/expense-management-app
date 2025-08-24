import React from "react";
import WeeklySummary from "../components/WeeklySummary";
import ExpenseList from "../components/ExpenseList";
import { Expense, Category, Budget } from "../types/index";

interface ReportPageProps {
  expenses: Expense[];
  categories: Category[];
  budget: Budget;
}
const ReportPage: React.FC<ReportPageProps> = ({
  expenses,
  categories,
  budget,
}) => {
  return (
    <>
      <WeeklySummary expenses={expenses} budget={budget} />
      <ExpenseList expenses={expenses} categories={categories} />
    </>
  );
};

export default ReportPage;
