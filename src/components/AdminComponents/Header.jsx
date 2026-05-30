import { usePage } from "../../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";

const Header = () => {
     const { activePage } = usePage();

     return (
          <div className="bg-white shadow-sm border-b border-tech-muted rounded-2xl overflow-hidden">
               <div className="px-8 py-6">
                    <div className="flex items-center justify-between gap-6">
                         <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                   <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-tech-accent to-tech-test"></div>
                                   <h1 className="text-4xl font-bold text-tech-text">
                                        {activePage}
                                   </h1>
                              </div>
                              <p className="text-sm text-tech-muted font-medium">خوش آمدید به پنل مدیریتی تک‌ویژن</p>
                         </div>

                         <div className="flex items-center gap-6">
                              <div className="hidden md:block w-80">
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
