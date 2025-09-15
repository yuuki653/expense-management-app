import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { saveData, loadData } from "./utils/localStorage";
import Layout from "./components/Layout";
import RecordPage from "./pages/RecordPage";
import CalendarPage from "./pages/CalendarPage";
import ReportPage from "./pages/ReportPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import ChartPage from "./pages/ChartPage";
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

  // 初期読み込み
  useEffect(() => {
    const saved = loadData<Expense[]>("expenses");
    if (saved) {
      setExpenses(saved);
    }
  }, []);

  useEffect(() => {
    const saved = loadData<Category[]>("categories");
    if (saved) {
      setCategories(saved);
    }
  }, []);

  useEffect(() => {
    const saved = loadData<Budget>("budget");
    if (saved) {
      setBudgetState(saved);
    }
  }, []);

  // 自動保存
  useEffect(() => {
    saveData("expenses", expenses);
  }, [expenses]);

  useEffect(() => {
    saveData("categories", categories);
  }, [categories]);

  useEffect(() => {
    saveData("budget", budget);
  }, [budget]);

  const setBudget = (amount: number) => {
    setBudgetState((prev) => ({ ...prev, amount }));
  };

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: string, updateExpense: Expense) => {
    setExpenses(
      expenses.map((expense) => (expense.id === id ? updateExpense : expense))
    );
  };
  console.log(categories);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RecordPage
                addExpense={addExpense}
                categories={categories}
                budget={budget}
                setBudget={setBudget}
              />
            }
          ></Route>
          <Route
            path="/calendar"
            element={
              <CalendarPage
                expenses={expenses}
                categories={categories}
                deleteExpense={deleteExpense}
                updateExpense={updateExpense}
              />
            }
          ></Route>
          <Route
            path="/report"
            element={
              <ReportPage
                expenses={expenses}
                categories={categories}
                budget={budget}
                deleteExpense={deleteExpense}
                updateExpense={updateExpense}
              />
            }
          ></Route>
          <Route
            path="/category"
            element={
              <CategoryManagementPage
                setCategories={setCategories}
                categories={categories}
                expenses={expenses}
              />
            }
          ></Route>
          <Route
            path="/chart"
            element={<ChartPage expenses={expenses} categories={categories} />}
          ></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
