import { usePage } from "../../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";
import { Menu } from "lucide-react";

const Header = ({ onSidebarToggle }) => {
     const { activePage } = usePage();

     return (
          <div className="bg-linear-to-r from-tech-bg via-white to-tech-bg shadow-md border-b border-tech-navy-light/20 rounded-2xl backdrop-blur-sm">
               <div className="px-3 md:px-6 py-3">
                    <div className="flex items-center justify-between gap-4">
                         <div className="flex items-center gap-2 md:gap-4 min-w-0">
                              <button
                                   onClick={onSidebarToggle}
                                   className="md:hidden p-2 hover:bg-tech-bg rounded-lg transition-colors flex-shrink-0"
                              >
                                   <Menu className="w-6 h-6 text-tech-navy" />
                              </button>
                              <div className="space-y-2 min-w-0">
                                   <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-2 w-2 rounded-full bg-linear-to-r from-tech-accent to-tech-test flex-shrink-0"></div>
                                        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-tech-text to-tech-navy-light bg-clip-text text-transparent truncate">
                                             {activePage}
                                        </h1>
                                   </div>
                              </div>
                         </div>

                         <div className="flex items-center gap-3 md:gap-6">
                              <div className="hidden md:block w-72">
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
