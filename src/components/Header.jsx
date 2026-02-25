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

                         <div className="flex items-center gap-4">
                              <div className="hidden md:block w-64">
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
