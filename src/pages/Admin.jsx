import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";
import { PageProvider } from "../context/PageContext";

const Admin = () => {
     return (
          <PageProvider>
               <section className="w-full h-screen flex overflow-hidden bg-white">
                    <div className="max-w-72 h-full bg-linear-to-b from-tech-text to-tech-navy shadow-2xl">
                         <Sidebar />
                    </div>
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-tech-bg to-tech-bg">
                         <Header />
                         <Main />
                    </div>
               </section>
          </PageProvider>
     );
};

export default Admin;
