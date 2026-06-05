import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { categoryChartData } from '../../data/chartsData';

const CategoryChart = () => {
  const RADIAN = Math.PI / 180;
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-tech-navy text-right">دسته‌بندی محصولات</h2>
        <p className="text-sm text-gray-500 text-right mt-1">توزیع فروش براساس دسته‌بندی</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={categoryChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value) => value.toLocaleString('fa-IR')}
          />
          <Legend 
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ direction: 'rtl', paddingRight: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {categoryChartData.map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-2" 
              style={{ backgroundColor: item.fill }}
            ></div>
            <p className="text-xs text-gray-600">{item.name}</p>
            <p className="text-sm font-bold text-tech-navy">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
