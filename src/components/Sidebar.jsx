import { useState } from "react";
import Arrow from "../assets/icons/Arrow";
import Logo from "../assets/icons/logo/Logo";
import SidebarItems from "./SidebarItems";
import { sidebarItems } from "../constants";

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
               <main className="w-full h-full flex flex-col">
                    <div className="mb-8 pt-2">
                         <Logo className="mx-auto" width="120" height="40" />
                    </div>
                    <div className="flex-1 overflow-y-auto px-2">
                         {sidebarItems.map((item, index) => (
                              <SidebarItems key={index} item={item} />
                         ))}
                    </div>
               </main>

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
