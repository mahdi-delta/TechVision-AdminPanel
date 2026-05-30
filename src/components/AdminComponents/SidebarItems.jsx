import { usePage } from "../../context/PageContext";

const SidebarItems = ({ item, isSettings = false }) => {
     const Icon = item.icon;
     const { activePage, setActivePage } = usePage();
     const isActive = activePage === item.title;

     return (
          <div className="w-full mb-2">
               <button
                    onClick={() => setActivePage(item.title)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out text-white group hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border ${
                         isActive
                              ? isSettings
                                   ? "bg-linear-to-r from-tech-test to-tech-test border-tech-accent shadow-xl"
                                   : "bg-tech-navy border-tech-test shadow-lg"
                              : isSettings
                                ? "bg-transparent border-tech-navy-melo/30 hover:bg-linear-to-r hover:from-tech-test hover:to-tech-test hover:border-tech-accent"
                                : "bg-transparent border-transparent hover:bg-tech-navy hover:border-tech-navy-melo"
                    }`}
               >
                    <span
                         className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                              isActive
                                   ? "text-white scale-110"
                                   : isSettings
                                     ? "text-tech-navy-light group-hover:text-white group-hover:scale-110 group-hover:rotate-12"
                                     : "text-tech-navy-light group-hover:text-tech-navy-light group-hover:scale-110 group-hover:rotate-3"
                         }`}
                    >
                         <Icon className="w-full h-full fill-white" />
                    </span>
                    <span
                         className={`text-right flex-1 font-medium text-sm transition-colors duration-300 ${
                              isActive
                                   ? "text-white"
                                   : isSettings
                                     ? "text-tech-muted group-hover:text-white"
                                     : "group-hover:text-tech-bg"
                         }`}
                    >
                         {item.title}
                    </span>
               </button>
          </div>
     );
};

export default SidebarItems;
