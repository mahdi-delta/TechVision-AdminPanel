import { useState, useRef } from "react";
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
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-tech-bg transition-colors group"
               >
                    <svg
                         className="w-6 h-6 text-tech-navy-melo group-hover:text-tech-test transition-colors"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                         />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>

               {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-tech-muted z-50 overflow-hidden">
                         <div className="p-4 bg-linear-to-r from-tech-accent to-tech-test">
                              <h3 className="text-base font-bold text-white">اعلان‌ها</h3>
                              <p className="text-xs text-white/80 mt-1">
                                   {notifications.filter((n) => n.unread).length} اعلان خوانده نشده
                              </p>
                         </div>
                         <div className="max-h-96 overflow-y-auto">
                              {notifications.map((notif) => (
                                   <div
                                        key={notif.id}
                                        className={`p-4 border-b border-tech-bg hover:bg-tech-bg cursor-pointer transition-colors ${
                                             notif.unread ? "bg-tech-bg/50" : ""
                                        }`}
                                   >
                                        <div className="flex items-start gap-3">
                                             {notif.unread && (
                                                  <div className="w-2 h-2 rounded-full bg-tech-accent mt-1.5"></div>
                                             )}
                                             <div className="flex-1">
                                                  <p className="text-sm text-tech-text mb-1 font-medium">
                                                       {notif.text}
                                                  </p>
                                                  <p className="text-xs text-tech-test">
                                                       {notif.time}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="p-3 text-center border-t border-tech-muted bg-tech-bg">
                              <button className="text-sm text-tech-test hover:text-tech-test font-medium">
                                   مشاهده همه اعلان‌ها
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default NotificationDropdown;
