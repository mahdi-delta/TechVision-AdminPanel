import { usePage } from "../../context/PageContext";
import Dashboard from "../../pages/Admin/Dashboard";
import Products from "../../pages/Admin/Products";
import Users from "../../pages/Admin/Users";
import Orders from "../../pages/Admin/Orders";
import Settings from "../../pages/Admin/Settings";

const Main = () => {
     const { activePage } = usePage();

     const renderPageContent = () => {
          switch (activePage) {
               case "داشبورد":
                    return <Dashboard />;
               case "محصولات":
                    return <Products />;
               case "کاربران":
                    return <Users />;
               case "سفارشات":
                    return <Orders />;
               case "تنظیمات":
                    return <Settings />;
               default:
                    return (
                         <div className="bg-white rounded-lg shadow p-6">
                              <p className="text-ink-black-600">صفحه مورد نظر یافت نشد</p>
                         </div>
                    );
          }
     };

     return (
          <div className="p-6 flex-1 overflow-auto bg-linear-to-br from-bright-snow-50 to-bright-snow-100">
               <div className="max-w-7xl mx-auto">{renderPageContent()}</div>
          </div>
     );
};

export default Main;
