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
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2.5 rounded-full hover:bg-tech-bg transition-all duration-200 group"
               >
                    <Bell className="w-6 h-6 text-tech-navy-melo group-hover:text-tech-accent transition-colors" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm"></span>
               </button>

               {showNotifications && (
                    <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-tech-muted/30 z-50 overflow-hidden">
                         <div className="p-5 bg-gradient-to-r from-tech-accent to-tech-test">
                              <h3 className="text-lg font-bold text-white">اعلان‌ها</h3>
                              <p className="text-sm text-white/90 mt-1 font-medium">
                                   {notifications.filter((n) => n.unread).length} اعلان خوانده نشده
                              </p>
                         </div>
                         <div className="max-h-96 overflow-y-auto">
                              {notifications.map((notif) => (
                                   <div
                                        key={notif.id}
                                        className={`p-4 border-b border-tech-muted/20 hover:bg-tech-bg/50 cursor-pointer transition-colors duration-150 ${
                                             notif.unread ? "bg-tech-accent/5" : ""
                                        }`}
                                   >
                                        <div className="flex items-start gap-3">
                                             {notif.unread && (
                                                  <div className="w-2 h-2 rounded-full bg-tech-accent mt-2 flex-shrink-0"></div>
                                             )}
                                             <div className="flex-1 min-w-0">
                                                  <p className="text-sm text-tech-text font-semibold truncate">
                                                       {notif.text}
                                                  </p>
                                                  <p className="text-xs text-tech-muted mt-1 flex items-center gap-1">
                                                       <Clock className="w-3.5 h-3.5" />
                                                       {notif.time}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="p-4 text-center border-t border-tech-muted/20 bg-tech-bg/50">
                              <button className="text-sm text-tech-accent hover:text-tech-test font-semibold transition-colors">
                                   مشاهده همه اعلان‌ها →
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default NotificationDropdown;
