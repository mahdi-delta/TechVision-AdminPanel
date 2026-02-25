import { useState } from "react";
import { getStatusColor } from "../../data/ordersData";

const OrderEditModal = ({ show, onClose, order, onSave }) => {
     const [status, setStatus] = useState(order?.status || "");

     if (!show || !order) return null;

     const handleSave = () => {
          onSave(status);
     };

     const statuses = ["تکمیل شده", "در حال پردازش", "در انتظار تایید", "لغو شده"];

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-ink-black-900">
                              ویرایش سفارش #{order.id}
                         </h3>
                         <button
                              onClick={onClose}
                              className="text-ink-black-400 hover:text-ink-black-600"
                         >
                              <svg
                                   className="w-6 h-6"
                                   fill="none"
                                   stroke="currentColor"
                                   viewBox="0 0 24 24"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                   />
                              </svg>
                         </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                         {/* Order Info */}
                         <div className="bg-bright-snow-50 rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-3">
                                   <div className="w-10 h-10 rounded-full bg-sapphire-sky-100 text-sapphire-sky-700 flex items-center justify-center font-bold">
                                        {order.customerAvatar}
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-ink-black-900">
                                             {order.customer}
                                        </p>
                                        <p className="text-xs text-ink-black-500">
                                             {order.product}
                                        </p>
                                   </div>
                              </div>
                              <div className="flex justify-between items-center">
                                   <span className="text-sm text-ink-black-600">مبلغ:</span>
                                   <span className="text-sm font-bold text-ink-black-900">
                                        {order.amount} تومان
                                   </span>
                              </div>
                         </div>

                         {/* Status Selection */}
                         <div>
                              <label className="block text-sm font-medium text-ink-black-700 mb-2">
                                   تغییر وضعیت سفارش
                              </label>
                              <div className="space-y-2">
                                   {statuses.map((statusOption) => (
                                        <label
                                             key={statusOption}
                                             className="flex items-center gap-3 p-3 border border-bright-snow-300 rounded-xl hover:bg-bright-snow-50 cursor-pointer transition-colors"
                                        >
                                             <input
                                                  type="radcurrentSo"
                                                  name="status"
                                                  value={statusOption}
                                                  checked={status === statusOption}
                                                  onChange={(e) => setStatus(e.target.value)}
                                                  className="w-4 h-4 text-sapphire-sky-600 focus:ring-2 focus:ring-sapphire-sky-200"
                                             />
                                             <span
                                                  className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                                       statusOption,
                                                  )}`}
                                             >
                                                  {statusOption}
                                             </span>
                                        </label>
                                   ))}
                              </div>
                         </div>

                         {/* Current Status Info */}
                         <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                              <p className="text-xs text-blue-800">
                                   <span className="font-semibold">وضعیت فعلی:</span>{" "}
                                   <span
                                        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                             order.status,
                                        )}`}
                                   >
                                        {order.status}
                                   </span>
                              </p>
                         </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 mt-6">
                         <button
                              onClick={onClose}
                              className="flex-1 px-4 py-2.5 border border-bright-snow-300 text-ink-black-700 rounded-xl hover:bg-bright-snow-50 transition-colors font-medium text-sm"
                         >
                              انصراف
                         </button>
                         <button
                              onClick={handleSave}
                              className="flex-1 px-4 py-2.5 bg-sapphire-sky-600 text-white rounded-xl hover:bg-sapphire-sky-700 transition-colors font-medium text-sm"
                         >
                              ذخیره تغییرات
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default OrderEditModal;
