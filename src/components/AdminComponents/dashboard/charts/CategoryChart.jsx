import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useProductStore } from "../../../../store/adminStore/useProductStore";

const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

const CustomTooltip = ({ active, payload }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 text-xs font-semibold">
                    <p className="text-gray-900 mb-1">{payload[0].name}</p>
                    <p style={{ color: payload[0].payload.color }}>{payload[0].value} نوع محصول</p>
               </div>
          );
     }
     return null;
};

const CategoryChart = () => {
     const products = useProductStore((state) => state.products);

     const getCategoryData = () => {
          const counts = {};
          products.forEach((p) => {
               counts[p.category] = (counts[p.category] || 0) + 1;
          });

          return Object.keys(counts).map((category, index) => ({
               name: category,
               value: counts[category],
               color: colors[index % colors.length],
          }));
     };

     const chartData = getCategoryData();

     return (
          <div className="w-full h-65">
               <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                         <Pie
                              data={chartData}
                              cx="50%"
                              cy="45%"
                              innerRadius={55}
                              outerRadius={75}
                              paddingAngle={4}
                              dataKey="value"
                         >
                              {chartData.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                         </Pie>
                         <Tooltip content={<CustomTooltip />} />
                         <Legend
                              verticalAlign="bottom"
                              height={36}
                              iconType="circle"
                              iconSize={8}
                              formatter={(value) => (
                                   <span className="text-gray-700 text-xs mr-1">{value}</span>
                              )}
                         />
                    </PieChart>
               </ResponsiveContainer>
          </div>
     );
};

export default CategoryChart;
