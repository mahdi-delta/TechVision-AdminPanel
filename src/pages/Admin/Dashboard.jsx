import { statsData, salesChartData, categoryData, recentOrders } from "../../data/dashboardData";
import { useState } from "react";
import CustomDropdown from "../../components/common/CustomDropdown";

const Dashboard = () => {
     const stats = statsData;
     const salesData = salesChartData;
     const categories = categoryData;
     const [chartPeriod, setChartPeriod] = useState("۶ ماه گذشته");
     const [categoryPeriod, setCategoryPeriod] = useState("۶ ماه گذشته");

     const getIcon = (title) => {
          switch (title) {
               case "فروش کل":
                    return (
                         <svg
                              className="w-7 h-7 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth={2}
                                   d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                         </svg>
                    );
               case "سفارشات جدید":
                    return (
                         <svg
                              className="w-7 h-7 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth={2}
                                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                         </svg>
                    );
               case "محصولات ناموجود":
                    return (
                         <svg
                              className="w-7 h-7 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth={2}
                                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                         </svg>
                    );
               case "کاربران فعال":
                    return (
                         <svg
                              className="w-7 h-7 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth={2}
                                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                         </svg>
                    );
               default:
                    return null;
          }
     };

     return (
          <div className="space-y-6">
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                         <div
                              key={index}
                              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-bright-snow-100"
                         >
                              <div className="flex items-start justify-between">
                                   <div className="flex-1">
                                        <p className="text-sm text-ink-black-600 mb-2">
                                             {stat.title}
                                        </p>
                                        <h3 className="text-2xl font-bold text-ink-black-900 mb-1">
                                             {stat.value}
                                             <span className="text-sm font-normal text-ink-black-500 mr-1">
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
                                                  <span className="text-xs text-ink-black-500">
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

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-ink-black-900">
                                   نمودار درآمد و فروش
                              </h3>
                              <CustomDropdown
                                   options={["۶ ماه گذشته", "۱ سال گذشته", "همه"]}
                                   value={chartPeriod}
                                   onChange={setChartPeriod}
                                   className="w-40"
                              />
                         </div>
                         <div className="h-64 flex items-end justify-between gap-3">
                              {salesData.map((data, index) => (
                                   <div
                                        key={index}
                                        className="flex-1 flex flex-col items-center gap-2"
                                   >
                                        <div className="w-full relative flex items-end gap-1">
                                             <div
                                                  className="flex-1 bg-linear-to-t from-sapphire-sky-500 to-sapphire-sky-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                                                  style={{ height: `${data.sales * 3}px` }}
                                             ></div>
                                             <div
                                                  className="flex-1 bg-linear-to-t from-ink-black-400 to-ink-black-300 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                                                  style={{ height: `${data.orders * 3}px` }}
                                             ></div>
                                        </div>
                                        <span className="text-xs text-ink-black-600">
                                             {data.month}
                                        </span>
                                   </div>
                              ))}
                         </div>
                         <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-bright-snow-200">
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 rounded-full bg-sapphire-sky-500"></div>
                                   <span className="text-sm text-ink-black-600">
                                        فروش (میلیون تومان)
                                   </span>
                              </div>
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 rounded-full bg-ink-black-400"></div>
                                   <span className="text-sm text-ink-black-600">هزینه</span>
                              </div>
                         </div>
                    </div>

                    {/* Category Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-ink-black-900">
                                   دسته‌بندی فروش
                              </h3>
                              <CustomDropdown
                                   options={["۶ ماه گذشته"]}
                                   value={categoryPeriod}
                                   onChange={setCategoryPeriod}
                                   className="w-40"
                              />
                         </div>
                         <div className="flex items-center justify-center mb-6">
                              <div className="relative w-48 h-48">
                                   <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                             cx="50"
                                             cy="50"
                                             r="40"
                                             fill="none"
                                             stroke="#3B82F6"
                                             strokeWidth="20"
                                             strokeDasharray="115.6 251.2"
                                             transform="rotate(-90 50 50)"
                                        />
                                        <circle
                                             cx="50"
                                             cy="50"
                                             r="40"
                                             fill="none"
                                             stroke="#10B981"
                                             strokeWidth="20"
                                             strokeDasharray="87.92 251.2"
                                             strokeDashoffset="-115.6"
                                             transform="rotate(-90 50 50)"
                                        />
                                        <circle
                                             cx="50"
                                             cy="50"
                                             r="40"
                                             fill="none"
                                             stroke="#A855F7"
                                             strokeWidth="20"
                                             strokeDasharray="50.24 251.2"
                                             strokeDashoffset="-203.52"
                                             transform="rotate(-90 50 50)"
                                        />
                                   </svg>
                                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-sm text-ink-black-600">کل فروش</span>
                                        <span className="text-2xl font-bold text-ink-black-900">
                                             ۱۰۰%
                                        </span>
                                   </div>
                              </div>
                         </div>
                         <div className="space-y-3">
                              {categories.map((cat, index) => (
                                   <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <div
                                                  className={`w-3 h-3 rounded-full ${cat.color}`}
                                             ></div>
                                             <span className="text-sm text-ink-black-700">
                                                  {cat.name}
                                             </span>
                                        </div>
                                        <span className="text-sm font-medium text-ink-black-900">
                                             {cat.value}%
                                        </span>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               {/* Recent Orders Table */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-bright-snow-100">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-lg font-semibold text-ink-black-900">آخرین سفارشات</h3>
                         <button className="text-sm text-sapphire-sky-600 hover:text-sapphire-sky-700 font-medium">
                              مشاهده همه
                         </button>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead>
                                   <tr className="border-b border-bright-snow-200">
                                        <th className="text-right py-3 px-4 text-xs font-medium text-ink-black-600">
                                             شماره سفارش
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-ink-black-600">
                                             مشتری
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-ink-black-600">
                                             مبلغ
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-ink-black-600">
                                             وضعیت
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {recentOrders.map((order, index) => (
                                        <tr
                                             key={index}
                                             className="border-b border-bright-snow-100 hover:bg-bright-snow-50 transition-colors"
                                        >
                                             <td className="py-3 px-4 text-sm text-ink-black-900">
                                                  {order.id}
                                             </td>
                                             <td className="py-3 px-4 text-sm text-ink-black-700">
                                                  {order.customer}
                                             </td>
                                             <td className="py-3 px-4 text-sm font-medium text-ink-black-900">
                                                  {order.amount} تومان
                                             </td>
                                             <td className="py-3 px-4">
                                                  <span
                                                       className={`text-xs px-3 py-1 rounded-full ${
                                                            order.status === "تکمیل"
                                                                 ? "bg-green-50 text-green-700"
                                                                 : order.status === "در حال پردازش"
                                                                   ? "bg-blue-50 text-blue-700"
                                                                   : "bg-yellow-50 text-yellow-700"
                                                       }`}
                                                  >
                                                       {order.status}
                                                  </span>
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
