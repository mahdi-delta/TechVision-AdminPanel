import { useState } from "react";
import Arrow from "../../assets/icons/Arrow";
import SidebarItems from "./SidebarItems";
import { mainMenuItems, settingsItem } from "../../constants";
import Logo from "../../assets/icons/logo/Logo";
import { X } from "lucide-react";

const Sidebar = ({ onToggle }) => {
     const [SiderbarStatus, setSiderbarStatus] = useState("open");

     const handleSidebarStatus = () => {
          setSiderbarStatus((prev) => (prev === "open" ? "closed" : "open"));
     };

     const handleClose = () => {
          onToggle?.();
     };

     return (
          <section
               className={
                    "h-full relative transition-all duration-300 bg-linear-to-b bg-tech-navy  border-l border-tech-navy rounded-xl " +
                    (SiderbarStatus === "closed" ? "w-0 p-0" : "min-w-72 p-4")
               }
          >
               {SiderbarStatus === "open" && (
                    <main className="w-full h-full flex flex-col">
                         <div className="mb-6 pt-3 w-full flex justify-between items-center">
                              <div className="flex items-center justify-center flex-1">
                                   <Logo className="w-7 h-7 fill-white" />
                                   <span className="h-7 pr-2 hidden sm:inline text-white bg-clip-text text-2xl">
                                        تک ویژن
                                   </span>
                              </div>
                              <button
                                   onClick={handleClose}
                                   className="md:hidden p-2 hover:bg-tech-navy-melo rounded-lg transition-colors text-white"
                              >
                                   <X className="w-5 h-5" />
                              </button>
                         </div>

                         <div className="flex-1 overflow-y-auto px-1 space-y-2">
                              {mainMenuItems.map((item, index) => (
                                   <SidebarItems key={index} item={item} />
                              ))}
                         </div>

                         <div className="px-1 pb-4 pt-2">
                              <div className="border-t border-tech-navy my-3 opacity-50"></div>
                              <SidebarItems item={settingsItem} isSettings={true} />
                         </div>
                    </main>
               )}

               <button
                    className={
                         "absolute flex justify-center items-center -left-5 top-1/3 border-3 border-tech-bg bg-tech-navy shadow-xl aspect-square w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-tech-navy-light text-tech-bg hidden md:flex " +
                         (SiderbarStatus === "closed" ? "transform -translate-x-6 rotate-180" : "")
                    }
                    onClick={handleSidebarStatus}
               >
                    <Arrow className="w-5 h-5 rotate-90  fill-white" />
               </button>
          </section>
     );
};

export default Sidebar;
