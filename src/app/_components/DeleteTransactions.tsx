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

export default function DeleteTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/get-all-transaction');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = (await response.json()) as Transaction[];
        setTransactions(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    void fetchTransactions();
  }, []);

  const handleSelect = (tNo: number) => {
    setSelectedTransactions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(tNo)) {
        newSelected.delete(tNo);
      } else {
        newSelected.add(tNo);
      }
      return newSelected;
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/delete-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tNos: Array.from(selectedTransactions) }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete transactions');
      }

      // Update transactions state by filtering out deleted transactions
      setTransactions((prev) => prev.filter(transaction => !selectedTransactions.has(transaction.tNo)));
      setSelectedTransactions(new Set());
    } catch (error) {
      console.error('Error deleting transactions:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border-t-4 border-black bg-platinum flex-grow w-percent95 rounded-2xl mt-3">
      <div className="flex border-b-4 border-black justify-between pb-2 items-center">
        <div className="">
          <h2 className="text-6xl ml-1 mt-1 align-middle">All Transactions</h2>
        </div>
        <button className="mr-8 rounded-lg bg-rose_toupe h-fit p-2" onClick={handleDelete}>
          DELETE SELECTED
        </button>
      </div>
      <div className="h-3/4 border-b-2 border-black">
        <div>
          <ul>
            {transactions.map((transaction) => (
              <div key={transaction.tNo} className="transaction border-b-2 flex justify-between border-black pb-1">
                <div className='ml-1'>
                  <p className='text-2xl block'>{transaction.vendor}</p>
                  <p className='text-md block'>{new Date(transaction.createdAt).toLocaleString()}</p>
                </div>
                <div className='flex'>
                  <input className='w-4 ml-5 bg-platinum'
                    type="checkbox"
                    checked={selectedTransactions.has(transaction.tNo)}
                    onChange={() => handleSelect(transaction.tNo)}
                  />
                  <div className='mr-1 flex items-center'>
                    <p className='text-3xl'>Rs.{transaction.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
