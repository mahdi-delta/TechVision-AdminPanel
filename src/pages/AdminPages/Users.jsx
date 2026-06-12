import { useState } from "react";
import { useUserStore } from "../../store/adminStore/useUserStore";
import { useTable } from "../../hooks/useTable";
import TableSkeleton from "../../components/AdminComponents/common/TableSkeleton";
import TableControls from "../../components/AdminComponents/common/TableControls";
import TablePagination from "../../components/AdminComponents/common/TablePagination";
import StatsCard from "../../components/AdminComponents/common/StatsCard";
import UserGrowthChart from "../../components/AdminComponents/users/charts/UserGrowthChart"; 
import UserActivityChart from "../../components/AdminComponents/users/charts/UserActivityChart";
import AddUserModal from "../../components/AdminComponents/users/AddUserModal";
import DeleteUserModal from "../../components/AdminComponents/users/DeleteUserModal";
import { Edit2, Trash2 } from "lucide-react";

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
          defaultPageSize: 5,
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

     return (
          <div className="space-y-4 md:space-y-6">
               {/* Stats Grid */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-0">
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

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-3 md:px-0">
                    <UserGrowthChart />
                    <UserActivityChart />
               </div>

               {/* Main Card Container */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mx-3 md:mx-0">
                    {/* Header */}
                    <TableControls
                         title="لیست کاربران"
                         searchQuery={searchQuery}
                         onSearchChange={setSearchQuery}
                         filterValue={statusFilter}
                         onFilterChange={setStatusFilter}
                         filterOptions={["همه", "فعال", "غیرفعال"]}
                         addButtonText="افزودن کاربر"
                         onAddClick={handleOpenAddModal}
                         searchPlaceholder="جستجو در کاربران..."
                    />

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
                                                       <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                       <div className="h-3 bg-gray-150 rounded w-16"></div>
                                                  </div>
                                             </div>
                                             <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                                             <div className="h-4 bg-gray-200 rounded w-20"></div>
                                             <div className="h-4 bg-gray-250 rounded w-12"></div>
                                        </div>
                                   </div>
                              ))
                         ) : filteredUsers.length === 0 ? (
                              <div className="text-center py-8 text-gray-500 text-sm bg-white rounded-xl border border-gray-100">
                                   کاربری یافت نشد.
                              </div>
                         ) : (
                              filteredUsers.map((user) => (
                                   <div
                                        key={user.id}
                                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs space-y-3"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  {user.avatarImage ? (
                                                       <img
                                                            src={user.avatarImage}
                                                            alt={user.name}
                                                            className="w-10 h-10 rounded-full object-cover border"
                                                       />
                                                  ) : (
                                                       <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-navy to-tech-navy-melo flex items-center justify-center text-white font-semibold text-sm">
                                                            {user.avatar}
                                                       </div>
                                                  )}
                                                  <div>
                                                       <h4 className="text-sm font-bold text-gray-900">
                                                            {user.name}
                                                       </h4>
                                                       <span className="text-xs text-gray-500">
                                                            {user.email}
                                                       </span>
                                                  </div>
                                             </div>
                                             <span
                                                  className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${user.status === "فعال" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                                             >
                                                  {user.status}
                                             </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-600">
                                             <div>
                                                  <span className="font-semibold text-gray-900">
                                                       {user.role}
                                                  </span>
                                                  <span className="mx-1.5">•</span>
                                                  <span>{user.joinDate}</span>
                                             </div>
                                             <span className="font-semibold text-blue-600">
                                                  {user.orders} سفارش
                                             </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3 flex justify-end gap-2">
                                             <button
                                                  onClick={() => handleOpenEditModal(user)}
                                                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                             >
                                                  <Edit2 className="w-3.5 h-3.5 text-tech-navy-melo" />
                                                  <span>ویرایش</span>
                                             </button>
                                             <button
                                                  onClick={() => handleOpenDeleteModal(user)}
                                                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                                             >
                                                  <Trash2 className="w-3.5 h-3.5" />
                                                  <span>حذف</span>
                                             </button>
                                        </div>
                                   </div>
                              ))
                         )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-gray-50">
                                   <tr>
                                        <th
                                             onClick={() => handleSort("name")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             کاربر{" "}
                                             {sortField === "name" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th
                                             onClick={() => handleSort("email")}
                                             className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                             ایمیل{" "}
                                             {sortField === "email" &&
                                                  (sortOrder === "asc" ? "▲" : "▼")}
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden lg:table-cell">
                                             نقش
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 hidden xl:table-cell">
                                             تاریخ عضویت
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
                                                  className="hover:bg-gray-50/50 transition-colors"
                                             >
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            {user.avatarImage ? (
                                                                 <img
                                                                      src={user.avatarImage}
                                                                      alt={user.name}
                                                                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                                                 />
                                                            ) : (
                                                                 <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-navy to-tech-navy-melo flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                                                      {user.avatar}
                                                                 </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                 <p className="text-sm font-semibold text-gray-900 truncate">
                                                                      {user.name}
                                                                 </p>
                                                                 <p className="text-xs text-tech-navy-melo mt-0.5">
                                                                      {user.orders} سفارش
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-gray-700 hidden lg:table-cell">
                                                       {user.email}
                                                  </td>
                                                  <td className="px-6 py-4 hidden lg:table-cell">
                                                       <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium border border-gray-100">
                                                            {user.role}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-gray-700 hidden xl:table-cell">
                                                       {user.joinDate}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <span
                                                            className={`px-3 py-1 text-xs rounded-full font-medium inline-block ${user.status === "فعال" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                                                       >
                                                            {user.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4">
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

                    <TablePagination
                         currentPage={currentPage}
                         setCurrentPage={setCurrentPage}
                         totalPages={totalPages}
                         totalItems={totalItems}
                         shownCount={filteredUsers.length}
                         unitName="کاربر"
                    />
               </div>

               {/* Modals */}
               <AddUserModal
                    show={showModal}
                    onClose={handleCloseModal}
                    user={selectedUser}
                    isEditing={isEditing}
               />
               <DeleteUserModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    user={selectedUser}
               />
          </div>
     );
};

export default Users;
