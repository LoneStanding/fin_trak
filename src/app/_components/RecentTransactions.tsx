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

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/get-recent-transaction');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // eslint-disable-next-line no-use-before-define
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    void fetchTransactions();
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
              <p className='text-xl block'>{transaction.vendor}</p>
              <p className='text-sm block'>{new Date(transaction.createdAt).toLocaleString()}</p>
            </div>
            <div className='mr-1 flex items-center'>
              <p className='text-2xl'>Rs.{transaction.amount}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
