import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RecordPage from "./pages/RecordPage";
import CalendarPage from "./pages/CalendarPage";
import ReportPage from "./pages/ReportPage";
import { Expense } from "./types/index";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<RecordPage addExpense={addExpense} />}
          ></Route>
          <Route
            path="/calendar"
            element={<CalendarPage expenses={expenses} />}
          ></Route>
          <Route
            path="/report"
            element={<ReportPage expenses={expenses} />}
          ></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
