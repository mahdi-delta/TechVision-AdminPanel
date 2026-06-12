import { useState } from "react";
import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";

const Admin = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);

     return (
          <section className="w-full h-screen flex overflow-hidden bg-gray-50">
               <div className="hidden md:block h-full shadow-sm border-r border-gray-200 p-1 transition-all duration-300">
                    <Sidebar onToggle={() => setSidebarOpen(!sidebarOpen)} />
               </div>

               {sidebarOpen && (
                    <div
                         className="fixed inset-0 bg-black/30 z-40 md:hidden"
                         onClick={() => setSidebarOpen(false)}
                    />
               )}

               <div
                    className={`fixed md:hidden left-0 top-0 h-screen w-72 bg-white shadow-lg border-r border-gray-200 p-1 z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
               >
                    <Sidebar onToggle={() => setSidebarOpen(false)} />
               </div>

               <div className="flex-1 h-full flex flex-col bg-white overflow-hidden">
                    <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
                    <Main />
               </div>
          </section>
     );
};

export default Admin;
