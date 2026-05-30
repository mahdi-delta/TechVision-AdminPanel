import { usePage } from "../../context/PageContext";
import SearchInput from "./common/SearchInput";
import NotificationDropdown from "./header/NotificationDropdown";
import ProfileDropdown from "./header/ProfileDropdown";

const Header = () => {
     const { activePage } = usePage();

     return (
          <div className="bg-white shadow-sm border-b border-tech-muted">
               <div className="px-8 py-5">
                    <div className="flex items-center justify-between">
                         <div>
                              <h1 className="text-3xl font-bold text-tech-text mb-1">
                                   {activePage}
                              </h1>
                              <p className="text-sm text-tech-test">
                                   خوش آمدید به پنل مدیریتی تک‌ویژن
                              </p>
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
