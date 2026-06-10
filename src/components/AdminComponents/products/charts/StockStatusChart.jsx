import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useProductStore } from "../../../../store/adminStore/useProductStore";

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

const StockStatusChart = () => {
     const products = useProductStore((state) => state.products);
     const goodStock = products.filter((p) => p.stock > 20).length;
     const lowStock = products.filter((p) => p.stock <= 20 && p.stock > 0).length;
     const outOfStock = products.filter((p) => p.stock === 0).length;

     const stockData = [
          { name: "موجودی کافی (بالای ۲۰ عدد)", value: goodStock, color: "#10B981" },
          { name: "رو به اتمام (زیر ۲۰ عدد)", value: lowStock, color: "#F59E0B" },
          { name: "ناموجود", value: outOfStock, color: "#EF4444" },
     ];

     return (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 w-full">
               <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4 md:mb-6">
                    تحلیل موجودی انبار کالاها
               </h3>
               <div className="w-full h-65 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                              <Pie
                                   data={stockData}
                                   cx="50%"
                                   cy="45%"
                                   innerRadius={55}
                                   outerRadius={75}
                                   paddingAngle={4}
                                   dataKey="value"
                              >
                                   {stockData.map((entry, index) => (
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
          </div>
     );
};

export default StockStatusChart;
