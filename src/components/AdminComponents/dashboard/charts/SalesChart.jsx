import {
     ResponsiveContainer,
     AreaChart,
     Area,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
} from "recharts";
import { useOrderStore } from "../../../../store/adminStore/useOrderStore";

const months = [
     "فروردین",
     "اردیبهشت",
     "خرداد",
     "تیر",
     "مرداد",
     "شهریور",
     "مهر",
     "آبان",
     "آذر",
     "دی",
     "بهمن",
     "اسفند",
];

const CustomTooltip = ({ active, payload }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 text-xs font-semibold">
                    <p className="text-gray-900 mb-1">ماه {payload[0].payload.name}</p>
                    <p className="text-blue-600 mb-1">
                         فروش: {payload[0].value.toLocaleString()} تومان
                    </p>
                    <p className="text-purple-600">سفارشات: {payload[1].value} عدد</p>
               </div>
          );
     }
     return null;
};

const SalesChart = () => {
     const orders = useOrderStore((state) => state.orders);

     const generateChartData = () => {
          const salesData = months.map((m) => ({ name: m, sales: 0, orders: 0 }));

          orders.forEach((order) => {
               if (order.date) {
                    const monthIndex = parseInt(order.date.split("/")[1]) - 1;
                    if (monthIndex >= 0 && monthIndex < 12) {
                         salesData[monthIndex].orders += 1;
                         if (order.status === "تکمیل شده") {
                              const amountNum = parseInt(order.amount.replace(/,/g, "")) || 0;
                              salesData[monthIndex].sales += amountNum;
                         }
                    }
               }
          });

          return salesData;
     };

     const chartData = generateChartData();

     return (
          <div className="w-full h-65">
               <ResponsiveContainer width="100%" height={260}>
                    <AreaChart
                         data={chartData}
                         margin={{ left: -20, right: 30, top: 5, bottom: 0 }}
                    >
                         <defs>
                              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                   <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                              </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                         <XAxis dataKey="name" stroke="#3f4b73" fontSize={10} />
                         <YAxis
                              stroke="#3f4b73"
                              fontSize={10}
                              tickFormatter={(tick) => (tick / 1000000).toLocaleString() + "M"}
                              dx={-30}
                         />
                         <Tooltip content={<CustomTooltip />} />
                         <Area
                              type="monotone"
                              dataKey="sales"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#salesGradient)"
                         />
                         <Area
                              type="monotone"
                              dataKey="orders"
                              stroke="#A78BFA"
                              strokeWidth={1}
                              fill="none"
                         />
                    </AreaChart>
               </ResponsiveContainer>
          </div>
     );
};

export default SalesChart;
