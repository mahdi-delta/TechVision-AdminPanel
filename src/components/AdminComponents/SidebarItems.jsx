import { usePage } from "../../context/PageContext";

const SidebarItems = ({ item}) => {
     const Icon = item.icon;
     const { activePage, setActivePage } = usePage();
     const isActive = activePage === item.title;

     return (
          <div className="w-full mb-1">
               <button
                    onClick={() => setActivePage(item.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                         isActive
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
               >
                    <span className="w-5 h-5 shrink-0 flex items-center justify-center">
                         <Icon className={`w-full h-full ${isActive ? "fill-gray-400" : "fill-white group-hover:fill-gray-700"}`} />
                    </span>
                    <span className="text-right flex-1 text-sm">
                         {item.title}
                    </span>
               </button>
          </div>
     );
};

export default SidebarItems;
