import { statsData, salesChartData, categoryData, recentOrders } from "../../data/dashboardData";
import { useState } from "react";
import { DollarSign, ShoppingBag, AlertCircle, Users } from "lucide-react";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";

const Dashboard = () => {
     const stats = statsData;
     const salesData = salesChartData;
     const categories = categoryData;
     const [chartPeriod, setChartPeriod] = useState("۶ ماه گذشته");
     const [categoryPeriod, setCategoryPeriod] = useState("۶ ماه گذشته");

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
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                         <div
                              key={index}
                              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                         >
                              <div className="flex items-start justify-between">
                                   <div className="flex-1">
                                        <p className="text-sm text-tech-test mb-2 font-medium">
                                             {stat.title}
                                        </p>
                                        <h3 className="text-3xl font-bold text-tech-text mb-1">
                                             {stat.value}
                                             <span className="text-sm font-normal text-tech-test mr-1">
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
                                                  <span className="text-xs text-tech-test">
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
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-tech-text">
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
                                                  className="flex-1 bg-linear-to-t from-tech-accent to-tech-navy-light rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                                                  style={{ height: `${data.sales * 3}px` }}
                                             ></div>
                                             <div
                                                  className="flex-1 bg-linear-to-t from-tech-navy-light to-tech-navy-light rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                                                  style={{ height: `${data.orders * 3}px` }}
                                             ></div>
                                        </div>
                                        <span className="text-xs text-tech-navy-melo">
                                             {data.month}
                                        </span>
                                   </div>
                              ))}
                         </div>
                         <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-tech-muted">
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 rounded-full bg-tech-accent"></div>
                                   <span className="text-sm text-tech-navy-melo">
                                        فروش (میلیون تومان)
                                   </span>
                              </div>
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 rounded-full bg-tech-navy-light"></div>
                                   <span className="text-sm text-tech-navy-melo">هزینه</span>
                              </div>
                         </div>
                    </div>

                    {/* Category Chart */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-tech-text">
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
                                        <span className="text-sm text-tech-navy-melo">کل فروش</span>
                                        <span className="text-2xl font-bold text-tech-text">
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
                                             <span className="text-sm text-tech-navy">
                                                  {cat.name}
                                             </span>
                                        </div>
                                        <span className="text-sm font-medium text-tech-text">
                                             {cat.value}%
                                        </span>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               {/* Recent Orders Table */}
               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-lg font-semibold text-tech-text">آخرین سفارشات</h3>
                         <button className="text-sm text-tech-test hover:text-tech-test font-medium">
                              مشاهده همه
                         </button>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead>
                                   <tr className="border-b border-tech-muted">
                                        <th className="text-right py-3 px-4 text-xs font-medium text-tech-navy-melo">
                                             شماره سفارش
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-tech-navy-melo">
                                             مشتری
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-tech-navy-melo">
                                             مبلغ
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-tech-navy-melo">
                                             وضعیت
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {recentOrders.map((order, index) => (
                                        <tr
                                             key={index}
                                             className="border-b border-tech-bg hover:bg-tech-bg transition-colors"
                                        >
                                             <td className="py-3 px-4 text-sm text-tech-text">
                                                  {order.id}
                                             </td>
                                             <td className="py-3 px-4 text-sm text-tech-navy">
                                                  {order.customer}
                                             </td>
                                             <td className="py-3 px-4 text-sm font-medium text-tech-text">
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
