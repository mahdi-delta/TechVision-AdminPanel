import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { categoryChartData } from "../../../../data/chartsData";

const CategoryChart = () => {
     const RADIAN = Math.PI / 180;

     return (
          <div className="w-full h-full flex">
               {/* Legend Grid */}
               <div className="w-30 grid grid-cols-1">
                    {categoryChartData.map((item, index) => (
                         <div key={index} className="flex items-center gap-2 p-2 bg-gray-0 rounded">
                              <div
                                   className="w-2.5 h-2.5 rounded-full shrink-0"
                                   style={{ backgroundColor: item.fill }}
                              />
                              <div className="flex-1 flex justify-between min-w-10 gap-7">
                                   <p className="text-xs text-gray-700 font-medium">{item.name}</p>
                                   <p className="text-xs font-bold text-gray-900">{item.value}%</p>
                              </div>
                         </div>
                    ))}
               </div>
               <div className="flex-1 min-h-0 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                         <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <Pie
                                   data={categoryChartData}
                                   cx="50%"
                                   cy="50%"
                                   outerRadius={80}
                                   innerRadius={45}
                                   fill="#8884d8"
                                   dataKey="value"
                                   paddingAngle={2}
                              >
                                   {categoryChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                   ))}
                              </Pie>
                         </PieChart>
                    </ResponsiveContainer>
               </div>
          </div>
     );
};

export default CategoryChart;
