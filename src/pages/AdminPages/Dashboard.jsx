import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, ShoppingBag, AlertCircle, Users } from "lucide-react";
import { useOrderStore } from "../../store/adminStore/useOrderStore";
import { useProductStore } from "../../store/adminStore/useProductStore";
import { useUserStore } from "../../store/adminStore/useUserStore";
import { getStatusColor } from "../../data/ordersData";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";
import SalesChart from "../../components/AdminComponents/dashboard/charts/SalesChart";
import CategoryChart from "../../components/AdminComponents/dashboard/charts/CategoryChart";
import OrderViewModal from "../../components/AdminComponents/orders/OrderViewModal";

const Dashboard = () => {
     const navigate = useNavigate();

     const orders = useOrderStore((state) => state.orders);
     const products = useProductStore((state) => state.products);
     const users = useUserStore((state) => state.users);

     const [chartPeriod, setChartPeriod] = useState("۱ سال گذشته");

     const [showViewModal, setShowViewModal] = useState(false);
     const [selectedOrder, setSelectedOrder] = useState(null);

     const totalRevenueValue = orders
          .filter((o) => o.status === "تکمیل شده")
          .reduce((sum, o) => sum + parseInt(o.amount.replace(/,/g, "")), 0);

     const totalRevenueFormatted = `${totalRevenueValue.toLocaleString()}`;

     const pendingOrdersCount = orders.filter(
          (o) => o.status === "در انتظار تایید" || o.status === "در حال پردازش",
     ).length;

     const outOfStockCount = products.filter((p) => p.stock === 0).length;
     const activeUsersCount = users.filter((u) => u.status === "فعال").length;

     const stats = [
          {
               title: "فروش کل",
               value: totalRevenueFormatted,
               unit: "تراکنش‌های تکمیل شده",
               change: "+۱۲.۵٪",
               isPositive: true,
               changeLabel: "نسبت به ماه قبل",
               bgColor: "bg-blue-50",
          },
          {
               title: "سفارشات جدید",
               value: `${pendingOrdersCount} سفارش`,
               unit: "در انتظار تایید یا پردازش",
               change: "+۸.۲٪",
               isPositive: true,
               changeLabel: "نسبت به هفته قبل",
               bgColor: "bg-purple-50",
          },
          {
               title: "محصولات ناموجود",
               value: `${outOfStockCount} محصول`,
               unit: "نیاز به شارژ انبار کالاها",
               change: outOfStockCount > 3 ? "افزایش ناموجودی" : "وضعیت انبار پایدار",
               isPositive: outOfStockCount <= 3,
               changeLabel: "",
               bgColor: "bg-orange-50",
          },
          {
               title: "کاربران فعال",
               value: `${activeUsersCount} کاربر`,
               unit: "تعداد اعضای فعال سیستم",
               change: "+۴.۳٪",
               isPositive: true,
               changeLabel: "در این ماه",
               bgColor: "bg-green-50",
          },
     ];

     // مرتب‌سازی سفارشات بر اساس شماره سفارش به صورت نزولی و انتخاب ۶ سفارش آخر 👈
     const recentOrdersList = [...orders].sort((a, b) => b.id - a.id).slice(0, 6);

     const handleOpenViewModal = (order) => {
          setSelectedOrder(order);
          setShowViewModal(true);
     };

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
          <div className="w-full min-h-screen bg-gray-50">
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
                                             <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
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
                                             className={`${stat.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl shrink-0`}
                                        >
                                             {getIcon(stat.title)}
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                         {/* Sales Chart */}
                         <div className="w-full">
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
                                   <h3 className="text-base md:text-lg font-semibold text-gray-900">
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
                              <button
                                   onClick={() => navigate("/admin/orders")}
                                   className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors whitespace-nowrap"
                              >
                                   مشاهده همه
                              </button>
                         </div>

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
                                        {recentOrdersList.map((order) => (
                                             <tr
                                                  key={order.id}
                                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                             >
                                                  <td className="py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">
                                                       #{order.id}
                                                  </td>
                                                  <td className="py-3 px-4 text-xs md:text-sm text-gray-600">
                                                       <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-linear-45 from-tech-navy to-tech-navy-melo text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                                 {order.customerAvatar}
                                                            </div>
                                                            <span className="truncate max-w-30">
                                                                 {order.customer}
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="py-3 px-4 text-xs md:text-sm font-bold text-gray-900">
                                                       {order.amount} تومان
                                                  </td>
                                                  <td className="py-3 px-4">
                                                       <span
                                                            className={`text-xs px-2.5 py-0.5 rounded-full font-medium inline-block ${getStatusColor(
                                                                 order.status,
                                                            )}`}
                                                       >
                                                            {order.status}
                                                       </span>
                                                  </td>
                                                  <td className="py-3 px-4 text-center">
                                                       <button
                                                            onClick={() =>
                                                                 handleOpenViewModal(order)
                                                            }
                                                            className="text-blue-600 hover:text-blue-700 text-xs font-semibold transition-colors"
                                                       >
                                                            مشاهده
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>

                         <div className="md:hidden space-y-3">
                              {recentOrdersList.map((order) => (
                                   <div
                                        key={order.id}
                                        className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded-full bg-linear-45 from-tech-navy to-tech-navy-melo text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                       {order.customerAvatar}
                                                  </div>
                                                  <div>
                                                       <span className="text-xs font-semibold text-gray-900">
                                                            #{order.id}
                                                       </span>
                                                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                                            {order.customer}
                                                       </p>
                                                  </div>
                                             </div>
                                             <span
                                                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(
                                                       order.status,
                                                  )}`}
                                             >
                                                  {order.status}
                                             </span>
                                        </div>
                                        <div className="border-t border-gray-200/60 pt-3 flex items-center justify-between text-xs">
                                             <span className="text-gray-700 font-bold">
                                                  {order.amount} تومان
                                             </span>
                                             <button
                                                  onClick={() => handleOpenViewModal(order)}
                                                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                             >
                                                  مشاهده جزئیات
                                             </button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               <OrderViewModal
                    key={`view-${selectedOrder?.id}`}
                    show={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    order={selectedOrder}
               />
          </div>
     );
};

export default Dashboard;
