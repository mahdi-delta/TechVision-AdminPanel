import { useState, useRef } from "react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import useClickOutside from "../../../hooks/useClickOutside";
import { currentUser } from "../../../data/userData";

const ProfileDropdown = () => {
     const [showProfile, setShowProfile] = useState(false);
     const dropdownRef = useRef(null);

     useClickOutside(dropdownRef, () => {
          if (showProfile) {
               setShowProfile(false);
          }
     });

     return (
          <div className="relative" ref={dropdownRef}>
               <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-3 pl-4 border-l border-tech-navy-light hover:opacity-80 transition-opacity"
               >
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-tech-accent to-tech-test flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-md">
                         {currentUser.initials}
                    </div>
                    <div className="text-right hidden sm:block">
                         <p className="text-sm font-semibold text-tech-text">{currentUser.name}</p>
                         <p className="text-xs text-tech-navy-melo">{currentUser.role}</p>
                    </div>
               </button>

               {showProfile && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-tech-muted z-999 overflow-hidden">
                         <div className="p-4 border-b border-tech-muted bg-linear-to-r from-tech-bg to-purple-50">
                              <div className="flex items-center gap-3">
                                   <div className="w-12 h-12 rounded-full bg-linear-to-br from-tech-accent to-tech-test flex items-center justify-center text-white font-bold shadow-md">
                                        {currentUser.initials}
                                   </div>
                                   <div>
                                        <p className="font-semibold text-tech-text">
                                             {currentUser.name}
                                        </p>
                                        <p className="text-xs text-tech-test">
                                             {currentUser.email}
                                        </p>
                                   </div>
                              </div>
                         </div>
                         <div className="p-2">
                              <button className="w-full text-right px-4 py-2.5 hover:bg-tech-bg rounded-xl transition-colors text-sm text-tech-navy flex items-center gap-3">
                                   <User className="w-5 h-5 text-tech-test" />
                                   <span>پروفایل من</span>
                              </button>
                              <button className="w-full text-right px-4 py-2.5 hover:bg-tech-bg rounded-xl transition-colors text-sm text-tech-navy flex items-center gap-3">
                                   <Settings className="w-5 h-5 text-tech-test" />
                                   <span>تنظیمات حساب</span>
                              </button>
                              <button className="w-full text-right px-4 py-2.5 hover:bg-tech-bg rounded-xl transition-colors text-sm text-tech-navy flex items-center gap-3">
                                   <HelpCircle className="w-5 h-5 text-tech-test" />
                                   <span>راهنما</span>
                              </button>
                         </div>
                         <div className="p-2 border-t border-tech-muted bg-tech-bg">
                              <button className="w-full text-right px-4 py-2.5 hover:bg-red-50 rounded-xl transition-colors text-sm text-red-600 font-medium flex items-center gap-3">
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
