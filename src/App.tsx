import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RecordPage from "./pages/RecordPage";
import CalendarPage from "./pages/CalendarPage";
import ReportPage from "./pages/ReportPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import { Expense, Category, Budget } from "./types/index";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "food", name: "食費" },
    { id: "entertainment", name: "自由費" },
    { id: "daily", name: "日用品費" },
    { id: "medical", name: "医療費" },
  ]);
  const [budget, setBudgetState] = useState<Budget>({
    id: Date.now(),
    amount: 10000,
  });

  const setBudget = (amount: number) => {
    setBudgetState((prev) => ({ ...prev, amount }));
  };

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: name.toLowerCase().replace(/\s+/g, "_"),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RecordPage
                addExpense={addExpense}
                addCategory={addCategory}
                categories={categories}
                budget={budget}
                setBudget={setBudget}
              />
            }
          ></Route>
          <Route
            path="/calendar"
            element={
              <CalendarPage expenses={expenses} categories={categories} />
            }
          ></Route>
          <Route
            path="/report"
            element={
              <ReportPage
                expenses={expenses}
                categories={categories}
                budget={budget}
              />
            }
          ></Route>
          <Route
            path="/category"
            element={
              <CategoryManagementPage
                addCategory={addCategory}
                categories={categories}
              />
            }
          ></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
