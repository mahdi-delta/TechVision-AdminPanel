import {
     ResponsiveContainer,
     AreaChart,
     Area,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
} from "recharts";
import { useUserStore } from "../../../../store/adminStore/useUserStore";

const monthNames = {
     "01": "فروردین",
     "02": "اردیبهشت",
     "03": "خرداد",
     "04": "تیر",
     "05": "مرداد",
     "06": "شهریور",
     "07": "مهر",
     "08": "آبان",
     "09": "آذر",
     10: "دی",
     11: "بهمن",
     12: "اسفند",
};

const CustomTooltip = ({ active, payload }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 text-xs font-semibold">
                    <p className="text-gray-900 mb-1">ماه {payload[0].payload.name}</p>
                    <p className="text-indigo-600">{payload[0].value} عضو جدید</p>
               </div>
          );
     }
     return null;
};

const UserGrowthChart = () => {
     const users = useUserStore((state) => state.users);

     const monthlyData = () => {
          const counts = {};

          users.forEach((user) => {
               if (user.joinDate) {
                    const parts = user.joinDate.split("/");
                    const month = parts[1];
                    if (month && monthNames[month]) {
                         counts[month] = (counts[month] || 0) + 1;
                    }
               }
          });

          return Object.keys(counts)
               .sort()
               .map((monthKey) => ({
                    name: monthNames[monthKey],
                    count: counts[monthKey],
               }));
     };

     const chartData = monthlyData();

     return (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 w-full">
               <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4 md:mb-6">
                    نمودار روند عضویت کاربران جدید
               </h3>
               <div className="w-full h-65 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                         <AreaChart
                              data={chartData}
                              margin={{ left: -25, right: 10, top: 5, bottom: 0 }}
                         >
                              <defs>
                                   <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3f4b73" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#3f4b73" stopOpacity={0.0} />
                                   </linearGradient>
                              </defs>
                              <CartesianGrid
                                   strokeDasharray="3 3"
                                   stroke="#F3F4F6"
                                   vertical={false}
                              />
                              <XAxis dataKey="name" stroke="#3f4b73" fontSize={10} />
                              <YAxis stroke="#3f4b73" fontSize={10} dx={-20} />
                              <Tooltip content={<CustomTooltip />} />
                              <Area
                                   type="monotone"
                                   dataKey="count"
                                   stroke="#3f4b73"
                                   strokeWidth={2}
                                   fillOpacity={1}
                                   fill="url(#userGradient)"
                              />
                         </AreaChart>
                    </ResponsiveContainer>
               </div>
          </div>
     );
};

export default UserGrowthChart;
