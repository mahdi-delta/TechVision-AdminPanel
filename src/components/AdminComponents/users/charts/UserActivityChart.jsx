import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useUserStore } from "../../../../store/adminStore/useUserStore";

const CustomTooltip = ({ active, payload }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 text-xs font-semibold">
                    <p className="text-gray-900 mb-1">{payload[0].name}</p>
                    <p style={{ color: payload[0].payload.color }}>{payload[0].value} نفر</p>
               </div>
          );
     }
     return null;
};

const UserActivityChart = () => {
     const users = useUserStore((state) => state.users);

     const activeCount = users.filter((u) => u.status === "فعال").length;
     const inactiveCount = users.filter((u) => u.status === "غیرفعال").length;

     const activityData = [
          { name: "کاربران فعال", value: activeCount, color: "#0c9467" },
          { name: "کاربران غیرفعال", value: inactiveCount, color: "#e23d3d" },
     ];

     return (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 w-full">
               <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4 md:mb-6">
                    تحلیل وضعیت فعالیت کاربران
               </h3>
               <div className="w-full h-65 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                              <Pie
                                   data={activityData}
                                   cx="50%"
                                   cy="45%"
                                   innerRadius={55}
                                   outerRadius={75}
                                   paddingAngle={4}
                                   dataKey="value"
                              >
                                   {activityData.map((entry, index) => (
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

export default UserActivityChart;
