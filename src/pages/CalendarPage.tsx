import React from "react";
import { Expense } from "../types/index";

interface CalendarPageProps {
  expenses: Expense[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ expenses }) => {
  return (
    <>
      <div>カレンダーページ</div>
      <p>登録件数{expenses.length}</p>
    </>
  );
};

export default CalendarPage;
