import { useState } from "react";
import Arrow from "../assets/icons/Arrow";
import SidebarItems from "./SidebarItems";
import { mainMenuItems, settingsItem } from "../constants";
import logo from "../assets/icons/logo/logo.png";

const Sidebar = () => {
     const [SiderbarStatus, setSiderbarStatus] = useState("open");

     const handleSidebarStatus = () => {
          setSiderbarStatus((prev) => (prev === "open" ? "closed" : "open"));
     };
     return (
          <section
               className={
                    "h-full relative transition-all duration-300 " +
                    (SiderbarStatus === "closed" ? "w-0 p-0" : "min-w-65 p-2")
               }
          >
               {SiderbarStatus === "open" && (
                    <main className="w-full h-full flex flex-col">
                         <div className="mb-8 pt-2 w-full flex justify-center">
                              <img src={logo} alt="TechVision Logo" width={150} />
                         </div>

                         <div className="flex-1 overflow-y-auto px-2">
                              {mainMenuItems.map((item, index) => (
                                   <SidebarItems key={index} item={item} />
                              ))}
                         </div>

                         <div className="px-2 pb-4">
                              <div className="border-t border-ink-black-800 my-2"></div>

                              <SidebarItems item={settingsItem} isSettings={true} />
                         </div>
                    </main>
               )}

               <button
                    className={
                         "absolute flex justify-center items-center -left-4 top-1/3 border-2 border-ink-black-700 bg-white shadow-lg aspect-square w-8 rounded-full transition-all duration-300 hover:scale-110 " +
                         (SiderbarStatus === "closed" ? "transform -translate-x-6 rotate-180" : "")
                    }
                    onClick={handleSidebarStatus}
               >
                    <Arrow className="w-5 h-5 text-ink-black-900 rotate-90" />
               </button>
          </section>
     );
};

export default Sidebar;
