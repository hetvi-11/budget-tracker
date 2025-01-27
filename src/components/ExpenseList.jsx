import React, { useState } from "react";
import deleteIcon from "../assets/trash.png";

const ExpenseList = ({ expenses, categoryFilter, setCategoryFilter, onDeleteExpense }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (!categoryFilter || expense.category === categoryFilter) &&
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end)
    );
  });

  return (
    <div className="container mt-4 p-4 rounded" style={{ backgroundColor: "#ECEBE5" }}>
      <h3>View Expenses</h3>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Category:</label>
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {Array.from(new Set(expenses.map((e) => e.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="ps-3">Name</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td className="ps-3">{expense.name}</td>
                <td className="ps-3">${expense.amount.toFixed(2)}</td>
                <td className="ps-3">{expense.category}</td>
                <td className="ps-3">{expense.date}</td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    onClick={() => onDeleteExpense(expense)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;