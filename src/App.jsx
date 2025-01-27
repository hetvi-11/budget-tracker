import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : ["Food", "Transport", "Shopping"];
  });

  const [categoryFilter, setCategoryFilter] = useState("");

  // Save expenses to localStorage when updated
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save categories to localStorage when updated
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Function to add a new expense
  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, expense];
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses)); // Immediate update
      return updatedExpenses;
    });
  };

  // Function to add a new category
  const handleAddCategory = (category) => {
    if (!category.trim()) return;
    setCategories((prevCategories) => {
      if (!prevCategories.includes(category)) {
        const updatedCategories = [...prevCategories, category];
        localStorage.setItem("categories", JSON.stringify(updatedCategories)); // Immediate update
        return updatedCategories;
      }
      return prevCategories;
    });
  };

  // Function to delete an expense
  const handleDeleteExpense = (expenseToDelete) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(expense => expense !== expenseToDelete);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses)); // Save updated list
      return updatedExpenses;
    });
  };

  return (
    <div style={{ backgroundColor: "#F9F7ED", minHeight: "100vh" }}>
      <Header />
      <ExpenseForm
        onAddExpense={handleAddExpense}
        categories={categories}
        onAddCategory={handleAddCategory}
      />
      <ExpenseList
        expenses={expenses}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onDeleteExpense={handleDeleteExpense} // Pass delete function to ExpenseList
      />
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default App;