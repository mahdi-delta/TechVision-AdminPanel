import { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, DollarSign, Edit2, Eye } from "lucide-react";
import { useOrderStore } from "../../store/adminStore/useOrderStore";
import { useTable } from "../../hooks/useTable";
import TableSkeleton from "../../components/AdminComponents/common/TableSkeleton";
import TableControls from "../../components/AdminComponents/common/TableControls";
import TablePagination from "../../components/AdminComponents/common/TablePagination";
import { getStatusColor } from "../../data/ordersData";
import SearchInput from "../../components/AdminComponents/common/SearchInput";
import OrderViewModal from "../../components/AdminComponents/orders/OrderViewModal";
import OrderEditModal from "../../components/AdminComponents/orders/OrderEditModal";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";

const Orders = () => {
     const orders = useOrderStore((state) => state.orders);

     const [showViewModal, setShowViewModal] = useState(false);
     const [showEditModal, setShowEditModal] = useState(false);
     const [selectedOrder, setSelectedOrder] = useState(null);

     const {
          processedData: filteredOrders,
          totalItems,
          totalPages,
          currentPage,
          setCurrentPage,
          searchQuery,
          setSearchQuery,
          filterValue: statusFilter,
          setFilterValue: setStatusFilter,
          sortField,
          sortOrder,
          handleSort,
          isLoading,
     } = useTable({
          data: orders,
          searchFields: ["id", "customer", "product"],
          filterField: "status",
          defaultPageSize: 5,
     });

     const totalOrders = orders.length;
     const pendingOrders = orders.filter((o) => o.status === "در انتظار تایید").length;
     const completedOrders = orders.filter((o) => o.status === "تکمیل شده").length;
     const totalRevenue = orders
          .filter((o) => o.status === "تکمیل شده")
          .reduce((sum, o) => sum + parseInt(o.amount.replace(/,/g, "")), 0)
          .toLocaleString();

     const handleViewOrder = (order) => {
          setSelectedOrder(order);
          setShowViewModal(true);
     };

     const handleEditOrder = (order) => {
          setSelectedOrder(order);
          setShowEditModal(true);
     };

     const getIcon = (title) => {
          switch (title) {
               case "کل سفارشات":
                    return <ShoppingBag className="w-7 h-7 text-blue-600" />;
               case "در انتظار":
                    return <Clock className="w-7 h-7 text-yellow-600" />;
               case "تکمیل شده":
                    return <CheckCircle className="w-7 h-7 text-green-600" />;
               case "درآمد کل":
                    return <DollarSign className="w-7 h-7 text-purple-600" />;
               default:
                    return null;
          }
     };

     return (
          <div className="space-y-4 md:space-y-6">
               {/* Stats Grid */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-0">
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">کل سفارشات</p>
                                   <h3 className="text-2xl font-bold text-gray-900 max-sm:text-xl">
                                        {totalOrders}
                                   </h3>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-xl max-sm:hidden">
                                   {getIcon("کل سفارشات")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">در انتظار</p>
                                   <h3 className="text-2xl font-bold text-yellow-600 max-sm:text-xl">
                                        {pendingOrders}
                                   </h3>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-xl max-sm:hidden">
                                   {getIcon("در انتظار")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">تکمیل شده</p>
                                   <h3 className="text-2xl font-bold text-green-600 max-sm:text-xl">
                                        {completedOrders}
                                   </h3>
                              </div>
                              <div className="bg-green-50 p-3 rounded-xl max-sm:hidden">
                                   {getIcon("تکمیل شده")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">درآمد کل</p>
                                   <h3 className="text-2xl font-bold text-gray-900 max-sm:text-xl">
                                        {totalRevenue}
                                   </h3>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-xl max-sm:hidden">
                                   {getIcon("درآمد کل")}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Main Card Container */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mx-3 md:mx-0">
                    {/* Header */}
                    <TableControls
                         title="سفارشات اخیر"
                         searchQuery={searchQuery}
                         onSearchChange={setSearchQuery}
                         filterValue={statusFilter}
                         onFilterChange={setStatusFilter}
                         filterOptions={[
                              "همه وضعیت‌ها",
                              "تکمیل شده",
                              "در حال پردازش",
                              "در انتظار تایید",
                              "لغو شده",
                         ]}
                         searchPlaceholder="جستجو در سفارشات..."
                    />

                    {/* نمای موبایل (کارت‌های اختصاصی) */}
                    <div className="md:hidden space-y-3 p-3 bg-gray-50/50">
                         {isLoading ? (
                              [1, 2, 3].map((n) => (
                                   <div
                                        key={n}
                                        className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                                  <div className="space-y-1.5">
                                                       <div className="h-4 bg-gray-200 rounded w-16"></div>
                                                       <div className="h-3 bg-gray-150 rounded w-20"></div>
                                                  </div>
                                             </div>
                                             <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                                             <div className="space-y-1">
                                                  <div className="h-3 bg-gray-100 rounded w-10"></div>
                                                  <div className="h-4 bg-gray-200 rounded w-18"></div>
                                             </div>
                                             <div className="space-y-1 text-left">
                                                  <div className="h-3 bg-gray-100 rounded w-8"></div>
                                                  <div className="h-4 bg-gray-200 rounded w-14"></div>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : filteredOrders.length === 0 ? (
                              <div className="text-center py-8 text-gray-500 text-sm bg-white rounded-xl border border-gray-100">
                                   سفارشی یافت نشد.
                              </div>
                         ) : (
                              filteredOrders.map((order) => (
                                   <div
                                        key={order.id}
                                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-navy to-tech-navy-melo text-white flex items-center justify-center font-bold shrink-0">
                                                       {order.customerAvatar}
                                                  </div>
                                                  <div>
                                                       <h4 className="text-sm font-bold text-gray-900">
                                                            {order.customer}
                                                       </h4>
                                                       <span className="text-xs text-blue-600 font-semibold">
                                                            سفارش #{order.id}
                                                       </span>
                                                  </div>
                                             </div>
                                             <span
                                                  className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${getStatusColor(order.status)}`}
                                             >
                                                  {order.status}
                                             </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs">
                                             <div className="space-y-1">
                                                  <p className="text-gray-500">محصول</p>
                                                  <p className="font-semibold text-gray-900 truncate max-w-44">
                                                       {order.product}
                                                  </p>
                                             </div>
                                             <div className="space-y-1 text-left">
                                                  <p className="text-gray-500">مبلغ</p>
                                                  <p className="font-bold text-gray-900">
                                                       {order.amount} تومان
                                                  </p>
                                             </div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-600">
                                             <div>
                                                  <span>{order.date}</span>
                                                  <span className="mx-1.5">•</span>
                                                  <span>{order.time}</span>
                                             </div>
                                             <div className="flex gap-2">
                                                  <button
                                                       onClick={() => handleViewOrder(order)}
                                                       className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                                  >
                                                       <Eye className="w-3.5 h-3.5 text-blue-600" />
                                                       <span>جزئیات</span>
                                                  </button>
                                                  <button
                                                       onClick={() => handleEditOrder(order)}
                                                       className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                                  >
                                                       <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                                                       <span>وضعیت</span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         )}
                    </div>

                    {/* نمای دسکتاپ (جدول کلاسیک) */}
                    <div className="hidden md:block overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50">
                                   <tr>
                                        <th
                                             onClick={() => handleSort("id")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             شماره سفارش{" "}
                                             {sortField === "id" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("customer")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             مشتری{" "}
                                             {sortField === "customer" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("product")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             محصول{" "}
                                             {sortField === "product" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("amount")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             مبلغ (تومان){" "}
                                             {sortField === "amount" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell">
                                             روش پرداخت
                                        </th>
                                        <th
                                             onClick={() => handleSort("date")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden xl:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             تاریخ و زمان{" "}
                                             {sortField === "date" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                                             وضعیت
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                   {isLoading ? (
                                        <TableSkeleton rowsCount={5} colsCount={8} />
                                   ) : filteredOrders.length === 0 ? (
                                        <tr>
                                             <td
                                                  colSpan={8}
                                                  className="text-center py-8 text-gray-500 text-sm"
                                             >
                                                  سفارشی یافت نشد.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredOrders.map((order) => (
                                             <tr
                                                  key={order.id}
                                                  className="hover:bg-gray-50/50 transition-colors"
                                             >
                                                  <td className="px-6 py-4">
                                                       <span className="text-sm font-semibold text-gray-900">
                                                            #{order.id}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-linear-45 from-tech-navy to-tech-navy-melo text-white flex items-center justify-center font-semibold shrink-0">
                                                                 {order.customerAvatar}
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-900">
                                                                 {order.customer}
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-gray-700 hidden lg:table-cell">
                                                       {order.product}
                                                  </td>
                                                  <td className="px-6 py-4 text-sm font-bold text-gray-900 hidden lg:table-cell">
                                                       {order.amount}
                                                  </td>
                                                  <td className="px-6 py-4 hidden lg:table-cell">
                                                       <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium border border-gray-100">
                                                            {order.paymentMethod}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4 hidden xl:table-cell">
                                                       <div className="text-sm">
                                                            <p className="text-gray-900 font-medium">
                                                                 {order.date}
                                                            </p>
                                                            <p className="text-blue-600 text-xs mt-0.5">
                                                                 {order.time}
                                                            </p>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <span
                                                            className={`px-3 py-1 text-xs rounded-full font-medium inline-block ${getStatusColor(order.status)}`}
                                                       >
                                                            {order.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-2">
                                                            <button
                                                                 onClick={() =>
                                                                      handleViewOrder(order)
                                                                 }
                                                                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                 title="مشاهده جزئیات"
                                                            >
                                                                 <Eye className="w-4 h-4 text-blue-600" />
                                                            </button>
                                                            <button
                                                                 onClick={() =>
                                                                      handleEditOrder(order)
                                                                 }
                                                                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                 title="تغییر وضعیت"
                                                            >
                                                                 <Edit2 className="w-4 h-4 text-gray-600" />
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination */}
                    <TablePagination
                         currentPage={currentPage}
                         setCurrentPage={setCurrentPage}
                         totalPages={totalPages}
                         totalItems={totalItems}
                         shownCount={filteredOrders.length}
                         unitName="کاربر"
                    />
               </div>

               {/* Modals */}
               <OrderViewModal
                    key={`view-${selectedOrder?.id}`}
                    show={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    order={selectedOrder}
               />
               <OrderEditModal
                    key={`edit-${selectedOrder?.id}`}
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    order={selectedOrder}
               />
          </div>
     );
};

export default Orders;
