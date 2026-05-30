import { usePage } from "../../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";

const Header = () => {
     const { activePage } = usePage();

     return (
          <div className="bg-linear-to-r from-tech-bg via-white to-tech-bg shadow-md border-b border-tech-navy-light/20 rounded-2xl backdrop-blur-sm">
               <div className="px-6 py-3">
                    <div className="flex items-center justify-between">
                         <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                   <div className="h-2 w-2 rounded-full bg-linear-to-r from-tech-accent to-tech-test"></div>
                                   <h1 className="text-3xl font-bold bg-linear-to-r from-tech-text to-tech-navy-light bg-clip-text text-transparent">
                                        {activePage}
                                   </h1>
                              </div>
                         </div>

                         <div className="flex items-center gap-6">
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
