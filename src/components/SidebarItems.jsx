import { usePage } from "../context/PageContext";

const SidebarItems = ({ item }) => {
     const Icon = item.icon;
     const { activePage, setActivePage } = usePage();
     const isActive = activePage === item.title;

     return (
          <div className="w-full mb-2">
               <button
                    onClick={() => setActivePage(item.title)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out text-white group hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border ${
                         isActive
                              ? "bg-ink-black-800 border-sapphire-sky-600 shadow-lg"
                              : "bg-transparent border-transparent hover:bg-ink-black-800 hover:border-sapphire-sky-800"
                    }`}
               >
                    <span
                         className={`text-right flex-1 font-medium text-sm transition-colors duration-300 ${
                              isActive
                                   ? "text-sapphire-sky-100"
                                   : "group-hover:text-sapphire-sky-100"
                         }`}
                    >
                         {item.title}
                    </span>
                    <span
                         className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                              isActive
                                   ? "text-sapphire-sky-300 scale-110"
                                   : "text-sapphire-sky-400 group-hover:text-sapphire-sky-300 group-hover:scale-110 group-hover:rotate-3"
                         }`}
                    >
                         <Icon className="w-full h-full" />
                    </span>
               </button>
          </div>
     );
};

export default SidebarItems;
