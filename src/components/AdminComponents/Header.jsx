import { usePage } from "../../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";
import { Menu } from "lucide-react";

const Header = ({ onSidebarToggle }) => {
     const { activePage } = usePage();

     return (
          <div className="bg-white/95 border-b border-gray-300 backdrop-blur-sm">
               <div className="px-4 md:px-8 py-5">
                    <div className="flex items-center justify-between gap-6">
                         <div className="flex items-center gap-4 min-w-0 flex-1">
                              <button
                                   onClick={onSidebarToggle}
                                   className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                              >
                                   <Menu className="w-5 h-5 text-gray-600" />
                              </button>
                              <h1 className="text-2xl font-semibold text-gray-900 truncate">
                                   {activePage}
                              </h1>
                         </div>

                         <div className="flex items-center gap-4 shrink-0">
                              <div className="hidden md:block">
                                   <SearchInput value="" onChange={() => {}} />
                              </div>
                              <NotificationDropdown />
                              <ProfileDropdown />
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Header;
