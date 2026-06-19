import { useState, useRef } from "react";
import { Bell, ShoppingBag, AlertCircle, UserPlus, CheckCircle } from "lucide-react";
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
          {
               id: 1,
               type: "order",
               text: "سفارش جدید #1050 ثبت شد",
               time: "۵ دقیقه پیش",
               unread: true,
          },
          {
               id: 2,
               type: "alert",
               text: "موجودی لپ‌تاپ Dell کاهش یافت",
               time: "۱ ساعت پیش",
               unread: true,
          },
          {
               id: 3,
               type: "user",
               text: "کاربر جدید (سینا) ثبت‌نام کرد",
               time: "۲ ساعت پیش",
               unread: false,
          },
     ];

     const unreadCount = notifications.filter((n) => n.unread).length;

     const getIcon = (type) => {
          switch (type) {
               case "order":
                    return <ShoppingBag className="w-5 h-5 text-tech-navy-melo" />;
               case "alert":
                    return <AlertCircle className="w-5 h-5 text-tech-navy-melo" />;
               case "user":
                    return <UserPlus className="w-5 h-5 text-tech-navy-melo" />;
               default:
                    return <Bell className="w-5 h-5 text-tech-navy-melo" />;
          }
     };

     return (
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors outline-none"
               >
                    <Bell className="w-5 h-5 text-tech-navy-melo" />
                    {unreadCount > 0 && (
                         <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                    )}
               </button>

               {showNotifications && (
                    <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-md border border-gray-200 z-50 overflow-hidden">
                         <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-900">اعلان‌ها</span>
                              {unreadCount > 0 && (
                                   <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                        {unreadCount} جدید
                                   </span>
                              )}
                         </div>

                         <div className="max-h-80 overflow-y-auto">
                              {notifications.map((notif) => (
                                   <button
                                        key={notif.id}
                                        className="w-full text-right flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                                   >
                                        <div className="shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                             {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                             <p
                                                  className={`text-sm mb-1 truncate ${notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}
                                             >
                                                  {notif.text}
                                             </p>
                                             <p className="text-xs text-gray-400">{notif.time}</p>
                                        </div>
                                        {notif.unread && (
                                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                        )}
                                   </button>
                              ))}
                         </div>

                         <div className="border-t border-gray-200 p-2">
                              <button className="w-full py-2 text-sm font-medium text-gray-700 hover:text-tech-navy-melo hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                                   <CheckCircle className="w-4 h-4" />
                                   خواندن همه
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default NotificationDropdown;
