import { NavLink } from "react-router-dom";

const getRoutePath = (title) => {
     switch (title) {
          case "داشبورد":
               return "/admin";
          case "محصولات":
               return "/admin/products";
          case "کاربران":
               return "/admin/users";
          case "سفارشات":
               return "/admin/orders";
          case "تنظیمات":
               return "/admin/settings";
          default:
               return "/admin";
     }
};

const SidebarItems = ({ item }) => {
     const Icon = item.icon;
     const routePath = getRoutePath(item.title);

     return (
          <div className="w-full mb-1">
               <NavLink
                    to={routePath}
                    end={routePath === "/admin"}
                    className={({ isActive }) =>
                         `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group border${
                              isActive
                                   ? " border-gray-400/30 bg-gray-200/50 text-gray-900 font-medium"
                                   : " border-gray-400/0 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                         }`
                    }
               >
                    {({ isActive }) => (
                         <>
                              <span className="w-5 h-5 shrink-0 flex items-center justify-center">
                                   <Icon
                                        className={`w-full h-full ${
                                             isActive
                                                  ? "fill-gray-400"
                                                  : "fill-white group-hover:fill-gray-600"
                                        }`}
                                   />
                              </span>
                              <span className="text-right flex-1 text-sm">{item.title}</span>
                         </>
                    )}
               </NavLink>
          </div>
     );
};

export default SidebarItems;
