import { useState } from "react";

const NotificationDropdown = () => {
     const [showNotifications, setShowNotifications] = useState(false);

     const notifications = [
          { id: 1, text: "سفارش جدید ثبت شد", time: "۵ دقیقه پیش", unread: true },
          { id: 2, text: "موجودی محصول کاهش یافت", time: "۱ ساعت پیش", unread: true },
          { id: 3, text: "کاربر جدید ثبت‌نام کرد", time: "۲ ساعت پیش", unread: false },
     ];

     return (
          <div className="relative">
               <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-bright-snow-100 transition-colors group"
               >
                    <svg
                         className="w-6 h-6 text-ink-black-600 group-hover:text-sapphire-sky-600 transition-colors"
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
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-bright-snow-200 z-50 overflow-hidden">
                         <div className="p-4 bg-linear-to-r from-sapphire-sky-500 to-sapphire-sky-600">
                              <h3 className="text-base font-bold text-white">اعلان‌ها</h3>
                              <p className="text-xs text-white/80 mt-1">
                                   {notifications.filter((n) => n.unread).length} اعلان خوانده نشده
                              </p>
                         </div>
                         <div className="max-h-96 overflow-y-auto">
                              {notifications.map((notif) => (
                                   <div
                                        key={notif.id}
                                        className={`p-4 border-b border-bright-snow-100 hover:bg-bright-snow-50 cursor-pointer transition-colors ${
                                             notif.unread ? "bg-sapphire-sky-50/50" : ""
                                        }`}
                                   >
                                        <div className="flex items-start gap-3">
                                             {notif.unread && (
                                                  <div className="w-2 h-2 rounded-full bg-sapphire-sky-500 mt-1.5"></div>
                                             )}
                                             <div className="flex-1">
                                                  <p className="text-sm text-ink-black-900 mb-1 font-medium">
                                                       {notif.text}
                                                  </p>
                                                  <p className="text-xs text-ink-black-500">
                                                       {notif.time}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="p-3 text-center border-t border-bright-snow-200 bg-bright-snow-50">
                              <button className="text-sm text-sapphire-sky-600 hover:text-sapphire-sky-700 font-medium">
                                   مشاهده همه اعلان‌ها
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default NotificationDropdown;
