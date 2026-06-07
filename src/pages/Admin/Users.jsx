import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useUserStore } from "../../store/adminStore/useUserStore";
import { useTable } from "../../hooks/useTable"; // 👈 اضافه شد
import TableSkeleton from "../../components/AdminComponents/common/TableSkeleton"; // 👈 اضافه شد
import StatsCard from "../../components/AdminComponents/common/StatsCard";
import SearchInput from "../../components/AdminComponents/common/SearchInput";
import AddUserModal from "../../components/AdminComponents/users/AddUserModal";
import DeleteUserModal from "../../components/AdminComponents/users/DeleteUserModal";
import CustomDropdown from "../../components/AdminComponents/common/CustomDropdown";

const Users = () => {
     const users = useUserStore((state) => state.users);

     const [showModal, setShowModal] = useState(false);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);
     const [isEditing, setIsEditing] = useState(false);

     const {
          processedData: filteredUsers,
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
          data: users,
          searchFields: ["name", "email"],
          filterField: "status",
          defaultPageSize: 6,
     });

     const handleOpenAddModal = () => {
          setSelectedUser(null);
          setIsEditing(false);
          setShowModal(true);
     };

     const handleOpenEditModal = (user) => {
          setSelectedUser(user);
          setIsEditing(true);
          setShowModal(true);
     };

     const handleOpenDeleteModal = (user) => {
          setSelectedUser(user);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowModal(false);
          setSelectedUser(null);
          setIsEditing(false);
     };

     // ایجاد لیست شماره صفحات برای نمایش در بخش pagination
     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

     return (
          <div className="space-y-3 md:space-y-6">
               {/* Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-3 md:px-0">
                    <StatsCard title="کل کاربران" value={users.length} />
                    <StatsCard
                         title="کاربران فعال"
                         value={users.filter((u) => u.status === "فعال").length}
                         valueColor="text-green-600"
                    />
                    <StatsCard
                         title="مدیران"
                         value={users.filter((u) => u.role === "مدیر").length}
                         valueColor="text-blue-600"
                    />
                    <StatsCard title="کاربر جدید امروز" value={2} valueColor="text-purple-600" />
               </div>

               {/* Main Table */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-3 md:p-6 border-b border-gray-200">
                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                              <h2 className="text-xl font-semibold text-gray-900">لیست کاربران</h2>
                              <div className="flex items-center gap-3">
                                   <SearchInput
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                   />
                                   <CustomDropdown
                                        options={["همه", "فعال", "غیرفعال"]}
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        className="min-w-32"
                                   />
                                   <button
                                        onClick={handleOpenAddModal}
                                        className="px-4 py-2 bg-tech-navy-melo text-white rounded-lg hover:bg-tech-navy-melo transition-colors text-sm flex items-center gap-2"
                                   >
                                        <Plus className="w-5 h-5" />
                                        <span>افزودن کاربر</span>
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50 hidden md:table-header-group">
                                   <tr>
                                        {/* با کلیک روی عناوین مشخص شده، لیست بر اساس همان فیلد مرتب می‌شود */}
                                        <th
                                             onClick={() => handleSort("name")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             کاربر{" "}
                                             {sortField === "name" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("email")}
                                             className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             ایمیل{" "}
                                             {sortField === "email" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell">
                                             نقش
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-600 hidden lg:table-cell">
                                             تاریخ عضویت
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
                                        // نمایش لودینگ افکت متحرک در زمان تغییر وضعیت یا لود فرم 👈
                                        <TableSkeleton rowsCount={5} colsCount={6} />
                                   ) : filteredUsers.length === 0 ? (
                                        <tr>
                                             <td
                                                  colSpan={6}
                                                  className="text-center py-8 text-gray-500 text-sm"
                                             >
                                                  کاربری یافت نشد.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredUsers.map((user) => (
                                             <tr
                                                  key={user.id}
                                                  className="hover:bg-gray-100 transition-colors block md:table-row border-b md:border-b pb-4 md:pb-0 mb-4 md:mb-0"
                                             >
                                                  <td className="px-3 md:px-6 py-2 md:py-4 block md:table-cell before:content-attr(data-label) before:block before:font-semibold before:text-gray-900 md:before:hidden md:text-right">
                                                       <div className="flex items-center gap-3">
                                                            {user.avatarImage ? (
                                                                 <img
                                                                      src={user.avatarImage}
                                                                      alt={user.name}
                                                                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                                                                 />
                                                            ) : (
                                                                 <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-navy to-tech-navy-melo flex items-center justify-center text-white font-semibold text-sm">
                                                                      {user.avatar}
                                                                 </div>
                                                            )}
                                                            <div>
                                                                 <p className="text-sm font-medium text-gray-900">
                                                                      {user.name}
                                                                 </p>
                                                                 <p className="text-xs text-tech-navy-melo">
                                                                      {user.orders} سفارش
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-600 hidden lg:table-cell">
                                                       {user.email}
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 hidden lg:table-cell">
                                                       <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium">
                                                            {user.role}
                                                       </span>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-600 hidden lg:table-cell">
                                                       {user.joinDate}
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4">
                                                       <span
                                                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                                 user.status === "فعال"
                                                                      ? "bg-green-50 text-green-700"
                                                                      : "bg-red-50 text-red-700"
                                                            }`}
                                                       >
                                                            {user.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-3 md:px-6 py-2 md:py-4">
                                                       <div className="flex items-center gap-2">
                                                            <button
                                                                 onClick={() =>
                                                                      handleOpenEditModal(user)
                                                                 }
                                                                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                 title="ویرایش کاربر"
                                                            >
                                                                 <Edit2 className="w-4 h-4 text-tech-navy-melo" />
                                                            </button>
                                                            <button
                                                                 onClick={() =>
                                                                      handleOpenDeleteModal(user)
                                                                 }
                                                                 className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                                 title="حذف کاربر"
                                                            >
                                                                 <Trash2 className="w-4 h-4 text-red-600" />
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
                    <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                         <p className="text-sm text-gray-600">
                              نمایش {filteredUsers.length} از {totalItems} کاربر
                         </p>
                         <div className="flex items-center gap-2 flex-wrap">
                              <button
                                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                   className="px-2 md:px-3 py-1 border border-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 text-xs md:text-sm"
                                   disabled={currentPage === 1}
                              >
                                   قبلی
                              </button>

                              {/* تولید دکمه‌های شماره صفحه به صورت پویا 👈 */}
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
                                   className="px-2 md:px-3 py-1 border border-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 text-xs md:text-sm"
                                   disabled={currentPage === totalPages}
                              >
                                   بعدی
                              </button>
                         </div>
                    </div>
               </div>

               {/* Add/Edit User Modal */}
               <AddUserModal
                    show={showModal}
                    onClose={handleCloseModal}
                    user={selectedUser}
                    isEditing={isEditing}
               />

               {/* Delete User Modal */}
               <DeleteUserModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    user={selectedUser}
               />
          </div>
     );
};

export default Users;
