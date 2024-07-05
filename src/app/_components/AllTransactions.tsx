"use client";

import React, { useEffect, useState } from 'react';

type Transaction = {
  tNo: number;
  userId: string;
  amount: string;
  vendor: string;
  category: string;
  createdAt: string;
};

export default function AllTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/get-all-transaction');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      try{
        const response = await fetch('/api/get-budget');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: boolean = await response.json();
        if(data){
          alert("Exceeded your budget")
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchTransactions();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
        <div key={transaction.tNo} className="transaction border-b-2 border-black flex justify-between pb-1">
            <div className='ml-1'>
                <p className='text-2xl block'>{transaction.vendor}</p>
                <p className='text-md block'>{new Date(transaction.createdAt).toLocaleString()}</p>
            </div>
            <div className='mr-1 flex items-center'>
                <p className='text-3xl'>Rs.{transaction.amount}</p>
            </div>
        </div>
        ))}
      </ul>
    </div>
  );
}
