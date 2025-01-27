import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense, categories, onAddCategory }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category || !date) return;
    if (amount <= 0) return alert("Amount must be positive!");

    onAddExpense({ name, amount: parseFloat(amount), category, date });
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="container mt-4 p-4 rounded" style={{backgroundColor : "#ECEBE5"}}>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="e.g., Coffee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
          <label for="number">Amount</label>
            <input
              id="number"
              type="number"
              className="form-control"
              placeholder="e.g., 4.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
          <label for="category">Category</label>
            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="new">Add New Category</option>
            </select>
          </div>
          <div className="col-md-2">
            <label for="date">Date</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <br></br>
            <button className="btn w-100" style={{ backgroundColor: "#398086", color: "white" }}>Add Expense</button>
          </div>
        </div>
      </form>

      {category === "new" && (
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="btn mt-2"
            style={{ backgroundColor: "#398086", color: "white" }}
            onClick={() => {
              onAddCategory(newCategory);
              setCategory(newCategory);
            }}
          >
            Add Category
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;