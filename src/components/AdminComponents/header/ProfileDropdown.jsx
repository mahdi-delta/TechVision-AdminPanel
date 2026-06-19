import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User2, Settings, HelpCircle, LogOut } from "lucide-react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAuthStore } from "../../../store/adminStore/useAuthStore";

const ProfileDropdown = () => {
     const [showProfile, setShowProfile] = useState(false);
     const dropdownRef = useRef(null);

     const currentUser = useAuthStore((state) => state.currentUser);
     const logout = useAuthStore((state) => state.logout);

     useClickOutside(dropdownRef, () => {
          if (showProfile) {
               setShowProfile(false);
          }
     });

     return (
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-3 pl-4 py-1 bg-gray-200/40 rounded-xl border border-gray-400/40 hover:border-gray-400 transition-colors group"
               >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-tech-navy/80 font-bold cursor-pointer overflow-hidden">
                         <User2 className="stroke-2 group-hover:fill-gray-400"/>
                    </div>
                    <div className="text-right hidden sm:block">
                         <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                         <p className="text-xs text-gray-600">{currentUser.role}</p>
                    </div>
               </button>

               {showProfile && (
                    <div className="absolute left-0 mt-2 w-45 bg-white rounded-xl shadow-md border border-gray-200 z-999 overflow-hidden">
                         <div className="p-2">
                              <Link
                                   to="/admin/settings"
                                   onClick={() => setShowProfile(false)}
                                   className="w-full text-right px-4 py-2.5 hover:bg-gray-100 rounded-xl transition-colors text-sm text-gray-900 flex items-center gap-3 group"
                              >
                                   <User2 className="w-5 h-5 text-tech-navy-melo group-hover:fill-gray-400" />
                                   <span>پروفایل من</span>
                              </Link>
                              <Link
                                   to="/admin/settings"
                                   onClick={() => setShowProfile(false)}
                                   className="w-full text-right px-4 py-2.5 hover:bg-gray-100 rounded-xl transition-colors text-sm text-gray-900 flex items-center gap-3 group"
                              >
                                   <Settings className="w-5 h-5 text-tech-navy-melo group-hover:fill-gray-400" />
                                   <span>تنظیمات حساب</span>
                              </Link>
                              <button className="w-full text-right px-4 py-2.5 hover:bg-gray-100 rounded-xl transition-colors text-sm text-gray-900 flex items-center gap-3 group">
                                   <HelpCircle className="w-5 h-5 text-tech-navy-melo group-hover:fill-gray-400" />
                                   <span>راهنما</span>
                              </button>
                         </div>
                         <div className="p-2 border-t border-gray-200 bg-gray-50">
                              <button
                                   onClick={logout}
                                   className="w-full text-right px-4 py-2.5 hover:bg-red-50 rounded-xl transition-colors text-sm text-red-600 font-medium flex items-center gap-3"
                              >
                                   <LogOut className="w-5 h-5 text-red-600" />
                                   <span>خروج از حساب</span>
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default ProfileDropdown;
