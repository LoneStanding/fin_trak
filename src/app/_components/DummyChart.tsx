import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type DataItem = {
  name: string;
  value: number;
};

type DummyPieChartProps = {
  data: DataItem[];
  colors?: string[]; // Optional array of colors for segments
};

const DummyPieChart: React.FC<DummyPieChartProps> = ({ data, colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default DummyPieChart;
