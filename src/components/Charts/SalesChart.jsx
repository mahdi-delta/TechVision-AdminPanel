import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { monthlySalesData } from '../../data/chartsData';

const SalesChart = () => {
  const COLORS = ['#3b82f6', '#8b5cf6'];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-tech-navy text-right">فروش ماهانه</h2>
        <p className="text-sm text-gray-500 text-right mt-1">نمودار فروش و درآمد در طول 12 ماه</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={monthlySalesData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              direction: 'rtl',
            }}
            formatter={(value) => value.toLocaleString('fa-IR')}
            labelFormatter={(label) => `ماه: ${label}`}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', direction: 'rtl' }}
            iconType="rect"
          />
          <Bar dataKey="sales" fill="#3b82f6" name="فروش" radius={[8, 8, 0, 0]} />
          <Bar dataKey="revenue" fill="#8b5cf6" name="درآمد" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
