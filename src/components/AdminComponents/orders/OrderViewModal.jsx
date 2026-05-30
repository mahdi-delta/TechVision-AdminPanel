import { getStatusColor } from "../../../data/ordersData";
import { X } from "lucide-react";

const OrderViewModal = ({ show, onClose, order }) => {
     if (!show || !order) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-xl shadow-md max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                         <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                   جزئیات سفارش #{order.id}
                              </h3>
                              <p className="text-sm text-blue-600 mt-1">
                                   {order.date} - {order.time}
                              </p>
                         </div>
                         <button
                              onClick={onClose}
                              className="text-gray-700 hover:text-gray-600 transition-colors"
                         >
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                         {/* Customer Info */}
                         <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                   اطلاعات مشتری
                              </h4>
                              <div className="flex items-center gap-3">
                                   <div className="w-12 h-12 rounded-full bg-gray-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-gray-200">
                                        {order.customerAvatar}
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-gray-900">
                                             {order.customer}
                                        </p>
                                        <p className="text-xs text-blue-600">مشتری</p>
                                   </div>
                              </div>
                         </div>

                         {/* Order Details */}
                         <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                   جزئیات سفارش
                              </h4>
                              <div className="space-y-3">
                                   <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">محصول:</span>
                                        <span className="text-sm font-medium text-gray-900">
                                             {order.product}
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">مبلغ:</span>
                                        <span className="text-sm font-bold text-gray-900">
                                             {order.amount} تومان
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">
                                             روش پرداخت:
                                        </span>
                                        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-900 text-xs font-medium border border-gray-100">
                                             {order.paymentMethod}
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-600">وضعیت:</span>
                                        <span
                                             className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                                  order.status,
                                             )}`}
                                        >
                                             {order.status}
                                        </span>
                                   </div>
                              </div>
                         </div>

                         {/* Timeline (optional) */}
                         <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                   جزئیات بیشتر
                              </h4>
                              <div className="space-y-2 text-sm">
                                   <p className="text-gray-600">
                                        <span className="font-medium">تاریخ ثبت:</span> {order.date}{" "}
                                        {order.time}
                                   </p>
                                   <p className="text-gray-600">
                                        <span className="font-medium">شماره سفارش:</span> #
                                        {order.id}
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
                         <button
                              onClick={onClose}
                              className="px-4 py-2.5 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
                         >
                              بستن
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default OrderViewModal;
