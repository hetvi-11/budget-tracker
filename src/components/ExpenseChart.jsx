import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ expenses }) => {
  const data = Object.values(
    expenses.reduce((acc, expense) => {
      acc[expense.category] = acc[expense.category] || { category: expense.category, total: 0 };
      acc[expense.category].total += expense.amount;
      return acc;
    }, {})
  );

  return (
    <div className="container mt-4 p-4 rounded" style={{backgroundColor : "#ECEBE5"}}>
      <h3>Expense Chart</h3>
      <br></br>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#511909" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;