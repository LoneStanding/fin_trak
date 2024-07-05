"use client";

import React, { useState } from 'react';

export default function BudgetForm() {
  const [budgetValue, setBudgetValue] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/set-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: Number(budgetValue)}),
      });

      if (!response.ok) {
        throw new Error('Failed to set budget');
      }

      // Optionally handle success scenario (e.g., update UI)
      alert("Budget updated successfully !")
      console.log('Budget set successfully!');
      setBudgetValue(''); // Clear input after submission
    } catch (error) {
      console.error('Error setting budget:', error);
      // Optionally handle error scenario (e.g., show error message)
    }
  };

  return (
    <div className='h-full bg-transparent flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='h-full flex justify-center items-center flex-col gap-5'>
        <input className='rounded-md block text-2xl p-1'
          type="number"
          placeholder="  Enter budget"
          id="budget"
          name="budget"
          min="0"
          value={budgetValue}
          onChange={(e) => setBudgetValue(e.target.value)}
          required
        />
        <button type="submit" className='mt-10 bg-rose_toupe p-2 rounded-xl text-xl'>Set Budget</button>
      </form>
    </div>
  );
}
