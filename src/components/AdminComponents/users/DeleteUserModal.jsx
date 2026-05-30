const DeleteUserModal = ({ show, onClose, onConfirm, userName }) => {
     if (!show) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <div className="flex flex-col items-center text-center">
                         {/* Icon */}
                         <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                              <svg
                                   className="w-8 h-8 text-red-600"
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
                         </div>

                         {/* Title */}
                         <h3 className="text-xl font-bold text-tech-text mb-2">حذف کاربر</h3>

                         {/* Message */}
                         <p className="text-tech-navy-melo mb-6">
                              آیا از حذف کاربر{" "}
                              <span className="font-semibold text-tech-text">{userName}</span>{" "}
                              اطمینان دارید؟ این عملیات قابل بازگشت نیست.
                         </p>

                         {/* Buttons */}
                         <div className="flex gap-3 w-full">
                              <button
                                   onClick={onClose}
                                   className="flex-1 px-4 py-2.5 border border-tech-navy-light text-tech-navy rounded-xl hover:bg-tech-bg transition-colors font-medium text-sm"
                              >
                                   انصراف
                              </button>
                              <button
                                   onClick={onConfirm}
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
