import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";
import { PageProvider } from "../context/PageContext";

const Admin = () => {
     return (
          <PageProvider>
               <section className="w-full h-screen flex overflow-hidden bg-white">
                    <div className="max-w-72 h-full bg-linear-to-b from-ink-black-900 to-ink-black-800 shadow-2xl">
                         <Sidebar />
                    </div>
                    <div className="w-full h-full flex flex-col bg-linear-to-br from-bright-snow-50 to-bright-snow-100">
                         <Header />
                         <Main />
                    </div>
               </section>
          </PageProvider>
     );
};

export default Admin;
