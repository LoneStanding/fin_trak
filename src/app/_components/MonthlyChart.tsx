"use client"

import { useEffect, useState } from 'react';
import MyResponsiveBar from './BarChart';

interface Transaction {
  id: string;  // The id is a date string
  value: number;
}

interface Day {
  id: string;
  expense: number;
}

interface BarData {
  [id: string]: string | number;
  expense: number;
}

const MonthlyChart = () => {
  const [transformedData, setTransformedData] = useState<BarData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-monthly-data/');
        const transactionData: Transaction[] = await response.json(); /* eslint-disable-line */

        // Parse the id string to Date object
        const parsedTransactionData = transactionData.map(item => ({
          ...item,
          id: new Date(item.id)
        }));

        // Create an array with entries for each day from 1 to 30
        const daysOfMonth = Array.from({ length: 30 }, (_, index) => ({
          id: (index + 1).toString(), // Day of the month as string (1 to 30)
          expense: 0 // Default expense value
        }));

        // Merge daysOfMonth with transactiondata
        const mergedData = [
          ...daysOfMonth,
          ...parsedTransactionData.map((item: { id: Date; value: number }) => ({
            id: item.id.getDate().toString(), // Get day of the month as a string
            expense: Number(item.value)
          }))
        ];

        // Use reduce to merge expenses for entries with the same id
        const aggregatedData = mergedData.reduce((acc, curr) => {
          const existingItem = acc.find(item => item.id === curr.id);
          if (existingItem) {
            existingItem.expense += curr.expense; // Merge expenses for the same id
          } else {
            acc.push({ id: curr.id, expense: curr.expense });
          }
          return acc;
        }, [] as Day[]);

        //console.log(aggregatedData);
        // Transform the aggregated data into BarData format
        const barData: BarData[] = aggregatedData.map(day => ({
          id: day.id,
          expense: day.expense
        }));

        console.log(barData);

        setTransformedData(barData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className='border-t-4 border-black bg-platinum flex-grow w-percent95 rounded-2xl mt-3 flex flex-col justify-center'>
      <div className='h-100 w-full'>
        <MyResponsiveBar data={transformedData}/>
      </div>
    </div>
  );
};

export default MonthlyChart;
