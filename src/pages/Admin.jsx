import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";
import { PageProvider } from "../context/PageContext";

const Admin = () => {
     return (
          <PageProvider>
               <section className="w-full h-screen flex overflow-hidden bg-white">
                    <div className="max-w-72 h-full shadow-2xl p-1">
                         <Sidebar />
                    </div>
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-tech-bg to-tech-bg m-1 border-2 mr-2 border-tech-navy-melo/30 rounded-xl">
                         <Header />
                         <Main />
                    </div>
               </section>
          </PageProvider>
     );
};

export default Admin;
