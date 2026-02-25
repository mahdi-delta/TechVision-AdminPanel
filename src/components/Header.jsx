import { usePage } from "../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";

const Header = () => {
     const { activePage } = usePage();

     return (
          <div className="bg-white shadow-sm border-b border-bright-snow-200">
               <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                         {/* بخش راست: عنوان صفحه */}
                         <div>
                              <div className="flex items-center gap-2">
                                   <h1 className="text-2xl font-bold text-ink-black-900">
                                        {activePage}
                                   </h1>
                                   <span className="text-ink-black-400">|</span>
                                   <p className="text-sm text-ink-black-600">
                                        خوش آمدید به پنل مدیریتی
                                   </p>
                              </div>
                         </div>

                         {/* بخش چپ: جستجو و اطلاعات کاربر */}
                         <div className="flex items-center gap-4">
                              {/* Search Bar */}
                              <div className="hidden md:block w-64">
                                   <SearchInput value="" onChange={() => {}} />
                              </div>

                              {/* Notification Bell */}
                              <NotificationDropdown />

                              {/* User Profile */}
                              <ProfileDropdown />
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Header;
                                                                      : ""
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

                              {/* User Profile */}
                              <div className="relative">
                                   <button
                                        onClick={() => setShowProfile(!showProfile)}
                                        className="flex items-center gap-3 pl-4 border-l border-bright-snow-300 hover:opacity-80 transition-opacity"
                                   >
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-sapphire-sky-500 to-sapphire-sky-700 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-md">
                                             م.د
                                        </div>
                                        <div className="text-right hidden sm:block">
                                             <p className="text-sm font-semibold text-ink-black-900">
                                                  مهدی دلتا
                                             </p>
                                             <p className="text-xs text-ink-black-600">
                                                  مدیر سیستم
                                             </p>
                                        </div>
                                   </button>

                                   {/* Dropdown */}
                                   {showProfile && (
                                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-bright-snow-200 z-50 overflow-hidden">
                                             <div className="p-4 border-b border-bright-snow-200 bg-linear-to-r from-sapphire-sky-50 to-purple-50">
                                                  <div className="flex items-center gap-3">
                                                       <div className="w-12 h-12 rounded-full bg-linear-to-br from-sapphire-sky-500 to-sapphire-sky-700 flex items-center justify-center text-white font-bold shadow-md">
                                                            م.د
                                                       </div>
                                                       <div>
                                                            <p className="font-semibold text-ink-black-900">
                                                                 مهدی دلتا
                                                            </p>
                                                            <p className="text-xs text-ink-black-500">
                                                                 mahdi@techvision.com
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="p-2">
                                                  <button className="w-full text-right px-4 py-2.5 hover:bg-bright-snow-50 rounded-xl transition-colors text-sm text-ink-black-700 flex items-center gap-3">
                                                       <svg
                                                            className="w-5 h-5 text-ink-black-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                       >
                                                            <path
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                            />
                                                       </svg>
                                                       <span>پروفایل من</span>
                                                  </button>
                                                  <button className="w-full text-right px-4 py-2.5 hover:bg-bright-snow-50 rounded-xl transition-colors text-sm text-ink-black-700 flex items-center gap-3">
                                                       <svg
                                                            className="w-5 h-5 text-ink-black-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                       >
                                                            <path
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                            />
                                                            <path
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                       </svg>
                                                       <span>تنظیمات حساب</span>
                                                  </button>
                                                  <button className="w-full text-right px-4 py-2.5 hover:bg-bright-snow-50 rounded-xl transition-colors text-sm text-ink-black-700 flex items-center gap-3">
                                                       <svg
                                                            className="w-5 h-5 text-ink-black-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                       >
                                                            <path
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                       </svg>
                                                       <span>راهنما</span>
                                                  </button>
                                             </div>
                                             <div className="p-2 border-t border-bright-snow-200 bg-bright-snow-50">
                                                  <button className="w-full text-right px-4 py-2.5 hover:bg-red-50 rounded-xl transition-colors text-sm text-red-600 font-medium flex items-center gap-3">
                                                       <svg
                                                            className="w-5 h-5 text-red-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                       >
                                                            <path
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                            />
                                                       </svg>
                                                       <span>خروج از حساب</span>
                                                  </button>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Header;
