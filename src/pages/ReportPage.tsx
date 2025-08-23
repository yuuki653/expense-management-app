import React from "react";
import WeeklySummary from "../components/WeeklySummary";
import ExpenseList from "../components/ExpenseList";
import { Expense } from "../types/index";

interface ReportPageProps {
  expenses: Expense[];
}
const ReportPage: React.FC<ReportPageProps> = ({ expenses }) => {
  return (
    <>
      <WeeklySummary expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </>
  );
};

export default ReportPage;
