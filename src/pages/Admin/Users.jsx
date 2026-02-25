import { usersTableData } from "../../data/usersData";
import { useState } from "react";
import StatsCard from "../../components/common/StatsCard";
import SearchInput from "../../components/common/SearchInput";
import AddUserModal from "../../components/users/AddUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";

const Users = () => {
     const [users, setUsers] = useState(usersTableData);
     const [searchQuery, setSearchQuery] = useState("");
     const [statusFilter, setStatusFilter] = useState("همه");
     const [showModal, setShowModal] = useState(false);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [userToDelete, setUserToDelete] = useState(null);
     const [editingUser, setEditingUser] = useState(null);
     const [newUser, setNewUser] = useState({
          name: "",
          email: "",
          role: "",
          status: "فعال",
          avatarImage: null,
          orders: 0,
     });

     // Filter users based on search and status
     const filteredUsers = users.filter((user) => {
          const matchesSearch =
               user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               user.email.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = statusFilter === "همه" || user.status === statusFilter;
          return matchesSearch && matchesStatus;
     });

     const handleAddUser = () => {
          const today = new Date();
          const persianDate = `${today.getFullYear() - 621}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

          const userToAdd = {
               id: users.length + 1,
               name: newUser.name,
               email: newUser.email,
               role: newUser.role,
               status: newUser.status,
               avatar: newUser.avatarImage ? null : newUser.name.charAt(0),
               avatarImage: newUser.avatarImage,
               joinDate: persianDate,
               orders: 0,
          };

          setUsers([...users, userToAdd]);
          setShowModal(false);
          setNewUser({
               name: "",
               email: "",
               role: "",
               status: "فعال",
               avatarImage: null,
               orders: 0,
          });
     };

     const handleEditUser = (user) => {
          setEditingUser(user);
          setNewUser({
               name: user.name,
               email: user.email,
               role: user.role,
               status: user.status,
               avatarImage: user.avatarImage || null,
               orders: user.orders,
          });
          setShowModal(true);
     };

     const handleUpdateUser = () => {
          const updatedUsers = users.map((user) => {
               if (user.id === editingUser.id) {
                    return {
                         ...user,
                         name: newUser.name,
                         email: newUser.email,
                         role: newUser.role,
                         status: newUser.status,
                         avatar: newUser.avatarImage ? null : newUser.name.charAt(0),
                         avatarImage: newUser.avatarImage,
                    };
               }
               return user;
          });

          setUsers(updatedUsers);
          setShowModal(false);
          setEditingUser(null);
          setNewUser({
               name: "",
               email: "",
               role: "",
               status: "فعال",
               avatarImage: null,
               orders: 0,
          });
     };

     const handleDeleteClick = (user) => {
          setUserToDelete(user);
          setShowDeleteModal(true);
     };

     const handleConfirmDelete = () => {
          setUsers(users.filter((user) => user.id !== userToDelete.id));
          setShowDeleteModal(false);
          setUserToDelete(null);
     };

     const handleCancelDelete = () => {
          setShowDeleteModal(false);
          setUserToDelete(null);
     };

     const handleCloseModal = () => {
          setShowModal(false);
          setEditingUser(null);
          setNewUser({
               name: "",
               email: "",
               role: "",
               status: "فعال",
               avatarImage: null,
               orders: 0,
          });
     };

     return (
          <div className="space-y-6">
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatsCard title="کل کاربران" value={users.length} />
                    <StatsCard
                         title="کاربران فعال"
                         value={users.filter((u) => u.status === "فعال").length}
                         valueColor="text-green-600"
                    />
                    <StatsCard
                         title="مدیران"
                         value={users.filter((u) => u.role === "مدیر").length}
                         valueColor="text-sapphire-sky-600"
                    />
                    <StatsCard title="کاربر جدید امروز" value={2} valueColor="text-purple-600" />
               </div>

               {/* Main Table */}
               <div className="bg-white rounded-2xl shadow-sm border border-bright-snow-100">
                    <div className="p-6 border-b border-bright-snow-200">
                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <h2 className="text-xl font-semibold text-ink-black-900">
                                   لیست کاربران
                              </h2>
                              <div className="flex items-center gap-3">
                                   <SearchInput
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                   />
                                   <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 border border-bright-snow-300 rounded-lg outline-none focus:border-sapphire-sky-500 focus:ring-2 focus:ring-sapphire-sky-200 text-sm"
                                   >
                                        <option>همه</option>
                                        <option>فعال</option>
                                        <option>غیرفعال</option>
                                   </select>
                                   <button
                                        onClick={() => setShowModal(true)}
                                        className="px-4 py-2 bg-sapphire-sky-600 text-white rounded-lg hover:bg-sapphire-sky-700 transition-colors text-sm flex items-center gap-2"
                                   >
                                        <span>+</span>
                                        <span>افزودن کاربر</span>
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="w-full">
                              <thead className="bg-bright-snow-50">
                                   <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             کاربر
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             ایمیل
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             نقش
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-ink-black-600">
                                             تاریخ عضویت
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
                                   {filteredUsers.map((user) => (
                                        <tr
                                             key={user.id}
                                             className="hover:bg-bright-snow-50 transition-colors"
                                        >
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-3">
                                                       {user.avatarImage ? (
                                                            <img
                                                                 src={user.avatarImage}
                                                                 alt={user.name}
                                                                 className="w-10 h-10 rounded-full object-cover border-2 border-sapphire-sky-300"
                                                            />
                                                       ) : (
                                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-sapphire-sky-500 to-sapphire-sky-700 flex items-center justify-center text-white font-semibold text-sm">
                                                                 {user.avatar}
                                                            </div>
                                                       )}
                                                       <div>
                                                            <p className="text-sm font-medium text-ink-black-900">
                                                                 {user.name}
                                                            </p>
                                                            <p className="text-xs text-ink-black-500">
                                                                 {user.orders} سفارش
                                                            </p>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4 text-sm text-ink-black-600">
                                                  {user.email}
                                             </td>
                                             <td className="px-6 py-4">
                                                  <span className="px-3 py-1 rounded-lg bg-bright-snow-100 text-ink-black-700 text-xs font-medium">
                                                       {user.role}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4 text-sm text-ink-black-600">
                                                  {user.joinDate}
                                             </td>
                                             <td className="px-6 py-4">
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
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-2">
                                                       <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="p-2 hover:bg-bright-snow-100 rounded-lg transition-colors"
                                                            title="ویرایش کاربر"
                                                       >
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
                                                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                 />
                                                            </svg>
                                                       </button>
                                                       <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="حذف کاربر"
                                                       >
                                                            <svg
                                                                 className="w-4 h-4 text-red-600"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                            >
                                                                 <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
                    <div className="px-6 py-4 border-t border-bright-snow-200 flex items-center justify-between">
                         <p className="text-sm text-ink-black-600">
                              نمایش {filteredUsers.length} از {users.length} کاربر
                         </p>
                         <div className="flex items-center gap-2">
                              <button
                                   className="px-3 py-2 border border-bright-snow-300 rounded-lg hover:bg-bright-snow-50 disabled:opacity-50 text-sm"
                                   disabled
                              >
                                   قبلی
                              </button>
                              <button className="px-3 py-2 bg-sapphire-sky-600 text-white rounded-lg text-sm">
                                   1
                              </button>
                              <button className="px-3 py-2 border border-bright-snow-300 rounded-lg hover:bg-bright-snow-50 text-sm">
                                   2
                              </button>
                              <button className="px-3 py-2 border border-bright-snow-300 rounded-lg hover:bg-bright-snow-50 text-sm">
                                   بعدی
                              </button>
                         </div>
                    </div>
               </div>

               {/* Add/Edit User Modal */}
               <AddUserModal
                    show={showModal}
                    onClose={handleCloseModal}
                    onSave={editingUser ? handleUpdateUser : handleAddUser}
                    user={newUser}
                    setUser={setNewUser}
                    isEditing={!!editingUser}
               />

               {/* Delete User Modal */}
               <DeleteUserModal
                    show={showDeleteModal}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    userName={userToDelete?.name}
               />
          </div>
     );
};

export default Users;
