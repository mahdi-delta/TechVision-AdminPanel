import { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, DollarSign, Edit2, Eye } from "lucide-react";
import { useOrderStore } from "../../store/adminStore/useOrderStore";
import { useTable } from "../../hooks/useTable";
import TableSkeleton from "../../components/AdminComponents/common/TableSkeleton";
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

     // اتصال صفحه سفارشات به هوک مشترک جدول 👈
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

     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

     return (
          <div className="space-y-3 md:space-y-6">
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 px-3 md:px-0">
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">کل سفارشات</p>
                                   <h3 className="text-2xl font-bold text-gray-900">
                                        {totalOrders}
                                   </h3>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-xl">
                                   {getIcon("کل سفارشات")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">در انتظار</p>
                                   <h3 className="text-2xl font-bold text-yellow-600">
                                        {pendingOrders}
                                   </h3>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-xl">
                                   {getIcon("در انتظار")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">تکمیل شده</p>
                                   <h3 className="text-2xl font-bold text-green-600">
                                        {completedOrders}
                                   </h3>
                              </div>
                              <div className="bg-green-50 p-3 rounded-xl">
                                   {getIcon("تکمیل شده")}
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                         <div className="flex items-start justify-between">
                              <div className="flex-1">
                                   <p className="text-sm text-gray-600 mb-2">درآمد کل</p>
                                   <h3 className="text-2xl font-bold text-gray-900">
                                        {totalRevenue}
                                   </h3>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-xl">
                                   {getIcon("درآمد کل")}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Orders Table */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-3 md:p-6 border-b border-gray-200">
                         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 md:gap-4">
                              <h2 className="text-xl font-semibold text-gray-900">سفارشات اخیر</h2>
                              <div className="sm:flex flex-col gap-3 w-full lg:w-auto">
                                   <SearchInput
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="جستجو در سفارشات..."
                                        className="flex-1 lg:w-64"
                                   />
                                   <CustomDropdown
                                        options={[
                                             "همه وضعیت‌ها",
                                             "تکمیل شده",
                                             "در حال پردازش",
                                             "در انتظار تایید",
                                             "لغو شده",
                                        ]}
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        className="min-w-48"
                                   />
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50 hidden md:table-header-group">
                                   <tr>
                                        {/* کلیک بر روی هدر ستون‌ها جهت تغییر نحوهٔ مرتب‌سازی صعودی یا نزولی */}
                                        <th
                                             onClick={() => handleSort("id")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             شماره سفارش{" "}
                                             {sortField === "id" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("customer")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             مشتری{" "}
                                             {sortField === "customer" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("product")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             محصول{" "}
                                             {sortField === "product" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("amount")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             مبلغ (تومان){" "}
                                             {sortField === "amount" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell">
                                             روش پرداخت
                                        </th>
                                        <th
                                             onClick={() => handleSort("date")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden xl:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             تاریخ و زمان{" "}
                                             {sortField === "date" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             وضعیت
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600">
                                             عملیات
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                   {isLoading ? (
                                        // لودینگ متحرک اسکلتون هنگام پردازش فیلترها و مرتب‌سازی
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
                                                  className="hover:bg-gray-100 transition-colors block md:table-row border-b md:border-b pb-4 md:pb-0 mb-4 md:mb-0"
                                             >
                                                  <td className="px-3 md:px-6 py-2 md:py-4 block md:table-cell before:content-attr(data-label) before:block before:font-semibold before:text-gray-900 md:before:hidden">
                                                       <span className="text-sm font-medium text-gray-900">
                                                            #{order.id}
                                                       </span>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 block md:table-cell before:content-attr(data-label) before:block before:font-semibold before:text-gray-900 md:before:hidden">
                                                       <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-linear-45 from-tech-navy to-tech-navy-melo text-white flex items-center justify-center font-medium">
                                                                 {order.customerAvatar}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                 {order.customer}
                                                            </span>
                                                       </div>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-600 hidden lg:table-cell">
                                                       {order.product}
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm font-medium text-gray-900 hidden lg:table-cell">
                                                       {order.amount}
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 hidden lg:table-cell">
                                                       <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium">
                                                            {order.paymentMethod}
                                                       </span>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 hidden xl:table-cell">
                                                       <div className="text-sm">
                                                            <p className="text-gray-900 font-medium">
                                                                 {order.date}
                                                            </p>
                                                            <p className="text-blue-600 text-xs">
                                                                 {order.time}
                                                            </p>
                                                       </div>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4">
                                                       <span
                                                            className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                                                 order.status,
                                                            )}`}
                                                       >
                                                            {order.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4">
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
                    <div className="p-3 md:p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                         <p className="text-sm text-gray-600">
                              نمایش {filteredOrders.length} از {totalItems} سفارش
                         </p>
                         <div className="flex gap-2">
                              <button
                                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                   className="px-2 md:px-3 py-1 border border-gray-700 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                                   disabled={currentPage === 1}
                              >
                                   قبلی
                              </button>

                              {pageNumbers.map((num) => (
                                   <button
                                        key={num}
                                        onClick={() => setCurrentPage(num)}
                                        className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm transition-all ${
                                             currentPage === num
                                                  ? "bg-tech-navy-melo text-white"
                                                  : "border border-gray-700 hover:bg-gray-100"
                                        }`}
                                   >
                                        {num}
                                   </button>
                              ))}

                              <button
                                   onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                   }
                                   className="px-2 md:px-3 py-1 border border-gray-700 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                                   disabled={currentPage === totalPages}
                              >
                                   بعدی
                              </button>
                         </div>
                    </div>
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
