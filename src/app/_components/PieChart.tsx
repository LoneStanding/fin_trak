// components/PieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';

type Transaction = {
  tNo: number;
  userId: string;
  amount: string;
  vendor: string;
  category: string;
  createdAt: string;
};

type Props = {
  transactions: Transaction[];
};

const PieChart: React.FC<Props> = ({ transactions }) => {
  // Calculate total amounts per category
  const categoryTotals: Record<string, number> = {};
  transactions.forEach((transaction) => {
    categoryTotals[transaction.category] = (categoryTotals[transaction.category] ?? 0) + Number(transaction.amount);
  });

  // Prepare data for Chart.js pie chart
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Categories Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
