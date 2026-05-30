import { getStatusColor } from "../../../data/ordersData";

const OrderViewModal = ({ show, onClose, order }) => {
     if (!show || !order) return null;

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-tech-muted">
                         <div>
                              <h3 className="text-xl font-bold text-tech-text">
                                   جزئیات سفارش #{order.id}
                              </h3>
                              <p className="text-sm text-tech-test mt-1">
                                   {order.date} - {order.time}
                              </p>
                         </div>
                         <button
                              onClick={onClose}
                              className="text-tech-navy-light hover:text-tech-navy-melo transition-colors"
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
                    <div className="space-y-6">
                         {/* Customer Info */}
                         <div className="bg-tech-bg rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-tech-navy mb-3">
                                   اطلاعات مشتری
                              </h4>
                              <div className="flex items-center gap-3">
                                   <div className="w-12 h-12 rounded-full bg-tech-bg text-tech-test flex items-center justify-center font-bold text-lg">
                                        {order.customerAvatar}
                                   </div>
                                   <div>
                                        <p className="text-sm font-medium text-tech-text">
                                             {order.customer}
                                        </p>
                                        <p className="text-xs text-tech-test">مشتری</p>
                                   </div>
                              </div>
                         </div>

                         {/* Order Details */}
                         <div>
                              <h4 className="text-sm font-semibold text-tech-navy mb-3">
                                   جزئیات سفارش
                              </h4>
                              <div className="space-y-3">
                                   <div className="flex justify-between items-center py-2 border-b border-tech-muted">
                                        <span className="text-sm text-tech-navy-melo">محصول:</span>
                                        <span className="text-sm font-medium text-tech-text">
                                             {order.product}
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2 border-b border-tech-muted">
                                        <span className="text-sm text-tech-navy-melo">مبلغ:</span>
                                        <span className="text-sm font-bold text-tech-text">
                                             {order.amount} تومان
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2 border-b border-tech-muted">
                                        <span className="text-sm text-tech-navy-melo">
                                             روش پرداخت:
                                        </span>
                                        <span className="px-3 py-1 rounded-lg bg-tech-bg text-tech-navy text-xs font-medium">
                                             {order.paymentMethod}
                                        </span>
                                   </div>
                                   <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-tech-navy-melo">وضعیت:</span>
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
                         <div className="bg-tech-bg rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-tech-navy mb-3">
                                   جزئیات بیشتر
                              </h4>
                              <div className="space-y-2 text-sm">
                                   <p className="text-tech-navy-melo">
                                        <span className="font-medium">تاریخ ثبت:</span> {order.date}{" "}
                                        {order.time}
                                   </p>
                                   <p className="text-tech-navy-melo">
                                        <span className="font-medium">شماره سفارش:</span> #
                                        {order.id}
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-tech-muted flex justify-end gap-3">
                         <button
                              onClick={onClose}
                              className="px-4 py-2.5 border border-tech-navy-light text-tech-navy rounded-xl hover:bg-tech-bg transition-colors font-medium text-sm"
                         >
                              بستن
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default OrderViewModal;
