import { useState, useRef } from "react";
import { Bell, Clock } from "lucide-react";
import useClickOutside from "../../../hooks/useClickOutside";

const NotificationDropdown = () => {
     const [showNotifications, setShowNotifications] = useState(false);
     const dropdownRef = useRef(null);

     useClickOutside(dropdownRef, () => {
          if (showNotifications) {
               setShowNotifications(false);
          }
     });

     const notifications = [
          { id: 1, text: "سفارش جدید ثبت شد", time: "۵ دقیقه پیش", unread: true },
          { id: 2, text: "موجودی محصول کاهش یافت", time: "۱ ساعت پیش", unread: true },
          { id: 3, text: "کاربر جدید ثبت‌نام کرد", time: "۲ ساعت پیش", unread: false },
     ];

     return (
          <div className="relative " ref={dropdownRef}>
               <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors group"
               >
                    <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>

               {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-md border border-gray-200 z-999 overflow-hidden">
                         <div className="p-4 bg-linear-to-r from-tech-accent to-blue-600">
                              <h3 className="text-base font-bold text-white">اعلان‌ها</h3>
                              <p className="text-xs text-white/80 mt-1">
                                   {notifications.filter((n) => n.unread).length} اعلان خوانده نشده
                              </p>
                         </div>
                         <div className="max-h-96 overflow-y-auto">
                              {notifications.map((notif) => (
                                   <div
                                        key={notif.id}
                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                                             notif.unread ? "bg-gray-50" : ""
                                        }`}
                                   >
                                        <div className="flex items-start gap-3">
                                             {notif.unread && (
                                                  <div className="w-2 h-2 rounded-full bg-tech-accent mt-1.5"></div>
                                             )}
                                             <div className="flex-1">
                                                  <p className="text-sm text-gray-900 mb-1 font-medium">
                                                       {notif.text}
                                                  </p>
                                                  <p className="text-xs text-blue-600">
                                                       {notif.time}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="p-3 text-center border-t border-gray-200 bg-gray-50">
                              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                   مشاهده همه اعلان‌ها
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default NotificationDropdown;
