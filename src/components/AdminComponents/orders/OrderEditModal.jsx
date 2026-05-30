import { useState } from "react";
import { X } from "lucide-react";
import { getStatusColor } from "../../../data/ordersData";

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
                         <h3 className="text-xl font-bold text-tech-text">
                              ویرایش سفارش #{order.id}
                         </h3>
                         <button
                              onClick={onClose}
                              className="text-tech-navy-light hover:text-tech-navy-melo"
                         >
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                         {/* Order Info */}
                         <div className="bg-tech-bg rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-3">
                                   <div className="w-10 h-10 rounded-full bg-tech-bg text-tech-test flex items-center justify-center font-bold">
                                        {order.customerAvatar}
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             {order.customer}
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             {order.product}
                                        </p>
                                   </div>
                              </div>
                              <div className="flex justify-between items-center">
                                   <span className="text-sm text-tech-navy-melo">مبلغ:</span>
                                   <span className="text-sm font-bold text-tech-text">
                                        {order.amount} تومان
                                   </span>
                              </div>
                         </div>

                         {/* Status Selection */}
                         <div>
                              <label className="block text-sm font-medium text-tech-navy mb-2">
                                   تغییر وضعیت سفارش
                              </label>
                              <div className="space-y-2">
                                   {statuses.map((statusOption) => (
                                        <label
                                             key={statusOption}
                                             className="flex items-center gap-3 p-3 border border-tech-navy-light rounded-xl hover:bg-tech-bg cursor-pointer transition-colors"
                                        >
                                             <input
                                                  type="radcurrentSo"
                                                  name="status"
                                                  value={statusOption}
                                                  checked={status === statusOption}
                                                  onChange={(e) => setStatus(e.target.value)}
                                                  className="w-4 h-4 text-tech-test focus:ring-2 focus:ring-tech-muted"
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
                              className="flex-1 px-4 py-2.5 border border-tech-navy-light text-tech-navy rounded-xl hover:bg-tech-bg transition-colors font-medium text-sm"
                         >
                              انصراف
                         </button>
                         <button
                              onClick={handleSave}
                              className="flex-1 px-4 py-2.5 bg-tech-test text-white rounded-xl hover:bg-tech-test transition-colors font-medium text-sm"
                         >
                              ذخیره تغییرات
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default OrderEditModal;
