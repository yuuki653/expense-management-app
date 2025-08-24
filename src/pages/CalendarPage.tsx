import React from "react";
import { Expense, Category } from "../types/index";

interface CalendarPageProps {
  expenses: Expense[];
  categories: Category[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({
  expenses,
  categories,
}) => {
  return (
    <>
      <div>カレンダーページ</div>
      <p>登録件数{expenses.length}</p>
    </>
  );
};

export default CalendarPage;
