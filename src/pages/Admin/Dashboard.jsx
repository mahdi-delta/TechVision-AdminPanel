import { useState } from "react";
import { DollarSign, ShoppingBag, AlertCircle, Users } from "lucide-react";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";
import SalesChart from "../../components/Charts/SalesChart";
import CategoryChart from "../../components/Charts/CategoryChart";
import { statsData, recentOrders } from "../../data/dashboardData";

const Dashboard = () => {
     const stats = statsData;
     const [chartPeriod, setChartPeriod] = useState("۶ ماه گذشته");

     const getIcon = (title) => {
          switch (title) {
               case "فروش کل":
                    return <DollarSign className="w-7 h-7 text-blue-600" />;
               case "سفارشات جدید":
                    return <ShoppingBag className="w-7 h-7 text-purple-600" />;
               case "محصولات ناموجود":
                    return <AlertCircle className="w-7 h-7 text-orange-600" />;
               case "کاربران فعال":
                    return <Users className="w-7 h-7 text-green-600" />;
               default:
                    return null;
          }
     };

     return (
          <div className="space-y-8 p-6">
               {/* Stats Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                         <div
                              key={index}
                              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                         >
                              <div className="flex items-start justify-between">
                                   <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-2 font-medium">
                                             {stat.title}
                                        </p>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                             {stat.value}
                                             <span className="text-sm font-normal text-gray-600 mr-1">
                                                  {stat.unit}
                                             </span>
                                        </h3>
                                        <div className="flex items-center gap-2">
                                             <span
                                                  className={`text-xs font-medium ${
                                                       stat.isPositive
                                                            ? "text-green-600"
                                                            : "text-orange-600"
                                                  }`}
                                             >
                                                  {stat.change}
                                             </span>
                                             {stat.changeLabel && (
                                                  <span className="text-xs text-gray-500">
                                                       {stat.changeLabel}
                                                  </span>
                                             )}
                                        </div>
                                   </div>
                                   <div className={`${stat.bgColor} p-3 rounded-xl`}>
                                        {getIcon(stat.title)}
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Charts Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart - Takes 2 columns */}
                    <div className="lg:col-span-2">
                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                              <div className="flex items-center justify-between mb-6">
                                   <h3 className="text-lg font-semibold text-gray-900">
                                        نمودار فروش و درآمد
                                   </h3>
                                   <CustomDropdown
                                        options={["۶ ماه گذشته", "۱ سال گذشته", "همه"]}
                                        value={chartPeriod}
                                        onChange={setChartPeriod}
                                        className="w-40"
                                   />
                              </div>
                              <SalesChart />
                         </div>
                    </div>

                    {/* Category Chart - Takes 1 column */}
                    <div>
                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                              <div className="mb-6">
                                   <h3 className="text-lg font-semibold text-gray-900">
                                        دسته‌بندی محصولات
                                   </h3>
                              </div>
                              <CategoryChart />
                         </div>
                    </div>
               </div>

               {/* Recent Orders Table */}
               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-lg font-semibold text-gray-900">آخرین سفارشات</h3>
                         <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                              مشاهده همه
                         </button>
                    </div>

                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead>
                                   <tr className="border-b border-gray-200">
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-700 bg-gray-50">
                                             شماره سفارش
                                        </th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-700 bg-gray-50">
                                             مشتری
                                        </th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-700 bg-gray-50">
                                             مبلغ
                                        </th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-700 bg-gray-50">
                                             وضعیت
                                        </th>
                                        <th className="text-center py-4 px-6 text-xs font-semibold text-gray-700 bg-gray-50">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {recentOrders.slice(0, 8).map((order, index) => (
                                        <tr
                                             key={index}
                                             className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                             <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                                  {order.id}
                                             </td>
                                             <td className="py-4 px-6 text-sm text-gray-600">
                                                  {order.customer}
                                             </td>
                                             <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                                  {order.amount} تومان
                                             </td>
                                             <td className="py-4 px-6">
                                                  <span
                                                       className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                                                            order.status === "تکمیل"
                                                                 ? "bg-green-100 text-green-700"
                                                                 : order.status === "در حال پردازش"
                                                                   ? "bg-blue-100 text-blue-700"
                                                                   : "bg-yellow-100 text-yellow-700"
                                                       }`}
                                                  >
                                                       {order.status}
                                                  </span>
                                             </td>
                                             <td className="py-4 px-6 text-center">
                                                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">
                                                       مشاهده
                                                  </button>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default Dashboard;
