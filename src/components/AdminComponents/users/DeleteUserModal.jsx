import { AlertCircle } from "lucide-react";
import { useUserStore } from "../../../store/adminStore/useUserStore";

const DeleteUserModal = ({ show, onClose, user }) => {
     const deleteUser = useUserStore((state) => state.deleteUser);

     if (!show || !user) return null;

     const handleConfirm = () => {
          deleteUser(user.id);
          onClose();
          alert("کاربر با موفقیت حذف شد");
     };

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-xl shadow-md max-w-md w-full p-6 border border-gray-200">
                    <div className="flex flex-col items-center text-center">
                         {/* Icon */}
                         <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                              <AlertCircle className="w-8 h-8 text-red-600" />
                         </div>

                         {/* Title */}
                         <h3 className="text-xl font-bold text-gray-900 mb-2">حذف کاربر</h3>

                         {/* Message */}
                         <p className="text-gray-600 mb-6">
                              آیا از حذف کاربر{" "}
                              <span className="font-semibold text-gray-900">{user.name}</span>{" "}
                              اطمینان دارید؟ این عملیات قابل بازگشت نیست.
                         </p>

                         {/* Buttons */}
                         <div className="flex gap-3 w-full">
                              <button
                                   onClick={onClose}
                                   className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                              >
                                   انصراف
                              </button>
                              <button
                                   onClick={handleConfirm}
                                   className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm"
                              >
                                   بله، حذف شود
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default DeleteUserModal;
