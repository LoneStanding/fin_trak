"use client";

import { Label, Select, TextInput } from "flowbite-react";
import React, { useState } from 'react';

export default function AddTransactionForm() {
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/add-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendor, category, amount: Number(amount) }),
      });

      if (response.ok) {
        alert('Transaction added successfully!');
        setVendor('');
        setCategory('Food');
        setAmount('');
      } else {
        const errorData: { error: string } = await response.json() ?? "";
        alert('Failed to add transaction: ' + errorData.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('An unexpected error occurred: ' + error.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="categories" value="Select the category" />
      </div>
      <Select id="categories" required value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Groceries</option>
        <option>Travel</option>
        <option>Entertainment</option>
        <option>Miscellaneous</option>
      </Select>
      <div className="mb-2 block">
        <Label htmlFor="amount" value="Amount" />
      </div>
      <TextInput
        id="amount"
        placeholder="Eg: 500"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="mb-2 block">
        <Label htmlFor="vendor" value="Vendor" />
      </div>
      <TextInput
        id="vendor"
        placeholder="Shop 8"
        required
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
