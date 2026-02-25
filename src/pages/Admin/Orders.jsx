import { ordersData, getStatusColor } from "../../data/ordersData";
import { useState } from "react";

const Orders = () => {
     const orders = ordersData;
     const [searchQuery, setSearchQuery] = useState("");
     const [statusFilter, setStatusFilter] = useState("همه وضعیت‌ها");

     // Filter orders based on search and status
     const filteredOrders = orders.filter((order) => {
          const matchesSearch =
               order.id.toString().includes(searchQuery) ||
               order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
               order.product.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = statusFilter === "همه وضعیت‌ها" || order.status === statusFilter;
          return matchesSearch && matchesStatus;
     });

     // Calculate stats
     const totalOrders = orders.length;
     const pendingOrders = orders.filter((o) => o.status === "در انتظار تایید").length;
     const completedOrders = orders.filter((o) => o.status === "تکمیل شده").length;
     const totalRevenue = orders
          .filter((o) => o.status === "تکمیل شده")
          .reduce((sum, o) => sum + parseInt(o.amount.replace(/,/g, "")), 0)
          .toLocaleString();

     return (
          <div className="space-y-6">
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between">
                              <div>
                                   <p className="text-sm text-ink-black-600">کل سفارشات</p>
                                   <p className="text-3xl font-bold text-ink-black-900 mt-2">
                                        {totalOrders}
                                   </p>
                              </div>
                              <div className="w-14 h-14 rounded-xl bg-sapphire-sky-100 flex items-center justify-center text-2xl">
                                   📦
                              </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between">
                              <div>
                                   <p className="text-sm text-ink-black-600">در انتظار</p>
                                   <p className="text-3xl font-bold text-yellow-600 mt-2">
                                        {pendingOrders}
                                   </p>
                              </div>
                              <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                                   ⏳
                              </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between">
                              <div>
                                   <p className="text-sm text-ink-black-600">تکمیل شده</p>
                                   <p className="text-3xl font-bold text-green-600 mt-2">
                                        {completedOrders}
                                   </p>
                              </div>
                              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                                   ✅
                              </div>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-bright-snow-100">
                         <div className="flex items-center justify-between">
                              <div>
                                   <p className="text-sm text-ink-black-600">درآمد کل</p>
                                   <p className="text-2xl font-bold text-ink-black-900 mt-2">
                                        {totalRevenue}
                                   </p>
                                   <p className="text-xs text-ink-black-500 mt-1">تومان</p>
                              </div>
                              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                                   💰
                              </div>
                         </div>
                    </div>
               </div>

               {/* Orders Table */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100">
                    <div className="p-6 border-b border-bright-snow-200">
                         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                              <h2 className="text-xl font-semibold text-ink-black-900">
                                   سفارشات اخیر
                              </h2>
                              <div className="flex gap-3 w-full lg:w-auto">
                                   <input
                                        type="text"
                                        placeholder="جستجو در سفارشات..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 lg:w-64 px-4 py-2 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                                   />
                                   <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 border border-bright-snow-300 rounded-xl focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 outline-none text-sm"
                                   >
                                        <option>همه وضعیت‌ها</option>
                                        <option>تکمیل شده</option>
                                        <option>در حال پردازش</option>
                                        <option>در انتظار تایید</option>
                                        <option>لغو شده</option>
                                   </select>
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-bright-snow-50">
                                   <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             شماره سفارش
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             مشتری
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             محصول
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             مبلغ (تومان)
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             روش پرداخت
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             تاریخ و زمان
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             وضعیت
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-bright-snow-200">
                                   {filteredOrders.map((order) => (
                                        <tr
                                             key={order.id}
                                             className="hover:bg-bright-snow-50 transition-colors"
                                        >
                                             <td className="px-6 py-4">
                                                  <span className="text-sm font-medium text-ink-black-900">
                                                       #{order.id}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-3">
                                                       <div className="w-10 h-10 rounded-full bg-sapphire-sky-100 text-sapphire-sky-700 flex items-center justify-center font-medium">
                                                            {order.customerAvatar}
                                                       </div>
                                                       <span className="text-sm font-medium text-ink-black-900">
                                                            {order.customer}
                                                       </span>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4 text-sm text-ink-black-600">
                                                  {order.product}
                                             </td>
                                             <td className="px-6 py-4 text-sm font-medium text-ink-black-900">
                                                  {order.amount}
                                             </td>
                                             <td className="px-6 py-4">
                                                  <span className="px-3 py-1 rounded-lg bg-bright-snow-100 text-ink-black-700 text-xs font-medium">
                                                       {order.paymentMethod}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4">
                                                  <div className="text-sm">
                                                       <p className="text-ink-black-900 font-medium">
                                                            {order.date}
                                                       </p>
                                                       <p className="text-ink-black-500 text-xs">
                                                            {order.time}
                                                       </p>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4">
                                                  <span
                                                       className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                                            order.status,
                                                       )}`}
                                                  >
                                                       {order.status}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-2">
                                                       <button className="p-2 hover:bg-bright-snow-100 rounded-lg transition-colors">
                                                            <svg
                                                                 className="w-4 h-4 text-sapphire-sky-600"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                 />
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                 />
                                                            </svg>
                                                       </button>
                                                       <button className="p-2 hover:bg-bright-snow-100 rounded-lg transition-colors">
                                                            <svg
                                                                 className="w-4 h-4 text-ink-black-600"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                 />
                                                            </svg>
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-bright-snow-200 flex items-center justify-between">
                         <p className="text-sm text-ink-black-600">نمایش 1 تا 8 از 8 سفارش</p>
                         <div className="flex gap-2">
                              <button className="px-3 py-1 border border-bright-snow-300 rounded-lg text-sm text-ink-black-600 hover:bg-bright-snow-50 transition-colors">
                                   قبلی
                              </button>
                              <button className="px-3 py-1 bg-sapphire-sky-600 text-white rounded-lg text-sm">
                                   1
                              </button>
                              <button className="px-3 py-1 border border-bright-snow-300 rounded-lg text-sm text-ink-black-600 hover:bg-bright-snow-50 transition-colors">
                                   بعدی
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Orders;
