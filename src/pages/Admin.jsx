import { useState } from "react";
import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";
import { PageProvider } from "../context/PageContext";

const Admin = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);

     return (
          <PageProvider>
               <section className="w-full h-screen flex overflow-hidden bg-white">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:block h-full shadow-2xl p-1 transition-all duration-300">
                         <Sidebar onToggle={() => setSidebarOpen(!sidebarOpen)} />
                    </div>

                    {/* Mobile Sidebar Overlay */}
                    {sidebarOpen && (
                         <div 
                              className="fixed inset-0 bg-black/50 z-40 md:hidden"
                              onClick={() => setSidebarOpen(false)}
                         />
                    )}

                    {/* Mobile Sidebar Drawer */}
                    <div className={`fixed md:hidden left-0 top-0 h-screen w-72 bg-white shadow-2xl p-1 z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                         <Sidebar onToggle={() => setSidebarOpen(false)} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 h-full flex flex-col bg-linear-to-br from-tech-bg to-tech-bg m-0 md:m-2 border-0 md:border-2 border-tech-navy-melo/30 rounded-none md:rounded-xl overflow-hidden">
                         <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
                         <Main />
                    </div>
               </section>
          </PageProvider>
     );
};

export default Admin;
