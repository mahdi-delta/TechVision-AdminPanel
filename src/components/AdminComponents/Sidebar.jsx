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
                    "h-screen relative transition-all duration-300 bg-white border-l border-gray-300 rounded-xl " +
                    (SiderbarStatus === "closed" ? "w-0 p-0" : "min-w-72 p-5")
               }
          >
               {SiderbarStatus === "open" && (
                    <main className="w-full h-full flex flex-col">
                         <div className="mb-6 pb-4 w-full flex justify-between items-center border-b border-gray-200">
                              <div className="flex items-center justify-center flex-1 gap-2">
                                   <Logo className="w-6 h-6 fill-gray-900" />
                                   <span className="h-6 hidden sm:inline text-gray-900 text-lg font-semibold">
                                        تک ویژن
                                   </span>
                              </div>
                              <button
                                   onClick={handleClose}
                                   className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                              >
                                   <X className="w-5 h-5" />
                              </button>
                         </div>

                         <div className="flex-1 overflow-y-auto px-1 space-y-2">
                              {mainMenuItems.map((item, index) => (
                                   <SidebarItems key={index} item={item} />
                              ))}
                         </div>

                         <div className="px-1 pb-4 pt-4">
                              <div className="border-t border-gray-200 my-3"></div>
                              <SidebarItems item={settingsItem} isSettings={true} />
                         </div>
                         <div className="px-1 pt-4 text-center border-t border-gray-100">
                              <p className="text-[10px] text-gray-400 font-semibold tracking-wider">
                                   © 2026 TechVision . All rights reserved.
                              </p>
                              <p className="text-[9px] text-tech-navy-melo font-medium mt-0.5">
                                   Version 1.0.0
                              </p>
                         </div>
                    </main>
               )}

               <button
                    className={
                         "absolute sm:flex justify-center items-center -left-5 top-1/3 border-2 border-gray-200 bg-white shadow-sm aspect-square w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gray-50 text-gray-600 md:flex hidden " +
                         (SiderbarStatus === "closed" ? "transform -translate-x-6 rotate-180" : "")
                    }
                    onClick={handleSidebarStatus}
               >
                    <Arrow className="w-4 h-4 rotate-90 fill-gray-600" />
               </button>
          </section>
     );
};

export default Sidebar;
