import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
     Cell,
} from "recharts";
import { useProductStore } from "../../../../store/adminStore/useProductStore";

const CustomTooltip = ({ active, payload }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 text-xs font-semibold">
                    <p className="text-gray-900 mb-1">{payload[0].payload.name}</p>
                    <p className="text-blue-600">{payload[0].value.toLocaleString()} عدد فروش</p>
               </div>
          );
     }
     return null;
};

const TopProductsChart = () => {
     const products = useProductStore((state) => state.products);

     const topProductsData = [...products]
          .sort((a, b) => (b.sales || 0) - (a.sales || 0))
          .slice(0, 5)
          .map((p) => ({
               name: p.name.length > 20 ? p.name.substring(0, 17) + "..." : p.name,
               sales: p.sales || 0,
          }));

     return (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 w-full">
               <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4 md:mb-6">
                    ۵ محصول پرفروش سیستم
               </h3>
               <div className="w-full h-65 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart
                              data={topProductsData}
                              layout="vertical"
                              margin={{ left: -10, right: 10, top: 0, bottom: 0 }}
                         >
                              <CartesianGrid
                                   strokeDasharray="3 3"
                                   stroke="#7d848f"
                                   horizontal={false}
                              />
                              <XAxis type="number" stroke="#3b3e43" fontSize={10} />
                              <YAxis
                                   dataKey="name"
                                   type="category"
                                   stroke="#3b3e43"
                                   fontSize={10}
                                   width={85}
                                   dx={-67}
                              />
                              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
                              <Bar dataKey="sales" radius={[0, 8, 8, 0]} barSize={22}>
                                   {topProductsData.map((_, index) => (
                                        <Cell
                                             key={`cell-${index}`}
                                             fill={index % 2 === 0 ? "#3f4b73" : "#606d97"}
                                        />
                                   ))}
                              </Bar>
                         </BarChart>
                    </ResponsiveContainer>
               </div>
          </div>
     );
};

export default TopProductsChart;
