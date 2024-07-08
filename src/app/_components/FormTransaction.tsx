"use client";

import { Label, Select, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTransactionForm() {
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const router = useRouter();

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
        router.refresh();
      } else {
        const errorData: { error: string } = await response.json(); // eslint-disable-line
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
      <div className="mb-1 block ">
        <Label htmlFor="categories" className="text-lg" value="Select the category" />
      </div>
      <Select className="mb-2" id="categories" required value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Groceries</option>
        <option>Travel</option>
        <option>Entertainment</option>
        <option>Miscellaneous</option>
      </Select>
      <div className="mb-1 block">
        <Label htmlFor="amount" className="text-lg" value="Amount" />
      </div>
      <TextInput className="text-6xl mb-2"
        id="amount"
        placeholder="  Eg: 500"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="mb-1 block">
        <Label htmlFor="vendor" className="text-lg" value="Vendor" />
      </div>
      <TextInput className="mb-2"
        id="vendor"
        placeholder="Shop 8"
        required
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
      <button type="submit" className="mt-4 bg-shamock_green text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
