import { useState } from "react";
import Arrow from "../../assets/icons/Arrow";
import SidebarItems from "./SidebarItems";
import { mainMenuItems, settingsItem } from "../../constants";
import logo from "../../assets/icons/logo/Logo.png";

const Sidebar = () => {
     const [SiderbarStatus, setSiderbarStatus] = useState("open");

     const handleSidebarStatus = () => {
          setSiderbarStatus((prev) => (prev === "open" ? "closed" : "open"));
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
                         <div className="mb-6 pt-3 w-full flex justify-center">
                              <img
                                   src={logo}
                                   alt="TechVision Logo"
                                   width={160}
                                   className="drop-shadow-lg"
                              />
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
                         "absolute flex justify-center items-center -left-5 top-1/3 border-3 border-tech-bg bg-tech-navy shadow-xl aspect-square w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-tech-navy-light text-tech-bg " +
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
