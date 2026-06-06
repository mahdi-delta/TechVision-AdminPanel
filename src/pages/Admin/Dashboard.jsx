import { useState } from "react";
import { DollarSign, ShoppingBag, AlertCircle, Users } from "lucide-react";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";
import SalesChart from "../../components/Charts/SalesChart";
import CategoryChart from "../../components/Charts/CategoryChart";
import { statsData, recentOrders } from "../../data/dashboardData";

const Dashboard = () => {
     const stats = statsData;
     const [chartPeriod, setChartPeriod] = useState("۱ سال گذشته");

     const getIcon = (title) => {
          switch (title) {
               case "فروش کل":
                    return <DollarSign className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />;
               case "سفارشات جدید":
                    return <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-purple-600" />;
               case "محصولات ناموجود":
                    return <AlertCircle className="w-5 h-5 md:w-7 md:h-7 text-orange-600" />;
               case "کاربران فعال":
                    return <Users className="w-5 h-5 md:w-7 md:h-7 text-green-600" />;
               default:
                    return null;
          }
     };

     return (
          <div className="w-full min-h-screen bg-gray-50 ">
               <div className="w-full max-w-7xl mx-auto space-y-6">
                    {/* Stats Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                         {stats.map((stat, index) => (
                              <div
                                   key={index}
                                   className="w-full bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                              >
                                   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                             <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 font-medium truncate">
                                                  {stat.title}
                                             </p>
                                             <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
                                                  {stat.value}
                                             </h3>
                                             <p className="text-xs md:text-sm text-gray-500 mb-2">
                                                  {stat.unit}
                                             </p>
                                             <div className="flex items-center gap-2 flex-wrap">
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
                                        <div
                                             className={`${stat.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0`}
                                        >
                                             {getIcon(stat.title)}
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                         {/* Sales Chart - Full width on mobile, 2 cols on large */}
                         <div className=" w-full">
                              <div className="w-full bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                             نمودار فروش و درآمد
                                        </h3>
                                        <div className="w-full sm:w-auto">
                                             <CustomDropdown
                                                  options={[
                                                       "۱ سال گذشته",
                                                       "۶ ماه گذشته",
                                                       "این ماه",
                                                       "امروز",
                                                  ]}
                                                  value={chartPeriod}
                                                  onChange={setChartPeriod}
                                                  className="w-full sm:w-40"
                                             />
                                        </div>
                                   </div>
                                   <div className="w-full h-max md:-mx-6">
                                        <SalesChart chartPeriod={chartPeriod} />
                                   </div>
                              </div>
                         </div>

                         {/* Category Chart */}
                         <div className="w-full">
                              <div className="w-full bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 h-full">
                                   <h3 className="text-base md:text-lg font-semibold text-gray-900 ">
                                        دسته‌بندی محصولات
                                   </h3>
                                   <div className="w-full h-max">
                                        <CategoryChart />
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="w-full bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                   آخرین سفارشات
                              </h3>
                              <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors whitespace-nowrap">
                                   مشاهده همه
                              </button>
                         </div>

                         {/* Desktop Table */}
                         <div className="hidden md:block overflow-x-auto">
                              <table className="w-full">
                                   <thead>
                                        <tr className="border-b border-gray-200">
                                             <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 bg-gray-50">
                                                  شماره
                                             </th>
                                             <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 bg-gray-50">
                                                  مشتری
                                             </th>
                                             <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 bg-gray-50">
                                                  مبلغ
                                             </th>
                                             <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 bg-gray-50">
                                                  وضعیت
                                             </th>
                                             <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 bg-gray-50">
                                                  عملیات
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {recentOrders.slice(0, 6).map((order, index) => (
                                             <tr
                                                  key={index}
                                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                             >
                                                  <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900">
                                                       {order.id}
                                                  </td>
                                                  <td className="py-3 px-4 text-xs md:text-sm text-gray-600">
                                                       {order.customer}
                                                  </td>
                                                  <td className="py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">
                                                       {order.amount}
                                                  </td>
                                                  <td className="py-3 px-4">
                                                       <span
                                                            className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium ${
                                                                 order.status === "تکمیل"
                                                                      ? "bg-green-100 text-green-700"
                                                                      : order.status ===
                                                                          "در حال پردازش"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                       >
                                                            {order.status}
                                                       </span>
                                                  </td>
                                                  <td className="py-3 px-4 text-center">
                                                       <button className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">
                                                            مشاهده
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>

                         {/* Mobile Card View */}
                         <div className="md:hidden space-y-3">
                              {recentOrders.slice(0, 6).map((order, index) => (
                                   <div
                                        key={index}
                                        className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                   >
                                        <div className="flex items-center justify-between mb-3">
                                             <span className="text-xs font-semibold text-gray-900">
                                                  {order.id}
                                             </span>
                                             <span
                                                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                       order.status === "تکمیل"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status === "در حال پردازش"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-yellow-100 text-yellow-700"
                                                  }`}
                                             >
                                                  {order.status}
                                             </span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-1">
                                             {order.customer}
                                        </p>
                                        <div className="flex items-center justify-between">
                                             <span className="text-xs text-gray-600">
                                                  {order.amount}
                                             </span>
                                             <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                                                  مشاهده
                                             </button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Dashboard;
