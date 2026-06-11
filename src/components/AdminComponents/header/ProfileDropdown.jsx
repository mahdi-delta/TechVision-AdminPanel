import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAuthStore } from "../../../store/adminStore/useAuthStore";
import profile from "../../../assets/images/profileImage.png";

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
                    className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:opacity-80 transition-opacity rounded-lg pr-2 hover:bg-gray-50"
               >
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-accent to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-sm overflow-hidden">
                         {profile ? (
                              <img
                                   src={profile}
                                   className="rounded-full w-full h-full object-cover"
                              />
                         ) : (
                              currentUser.initials
                         )}
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
                                   <User className="w-5 h-5 text-tech-navy-melo group-hover:fill-gray-400" />
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
