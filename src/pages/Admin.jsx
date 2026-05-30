import Header from "../components/AdminComponents/header";
import Main from "../components/AdminComponents/Main";
import Sidebar from "../components/AdminComponents/Sidebar";
import { PageProvider } from "../context/PageContext";

const Admin = () => {
     return (
          <PageProvider>
               <section className="w-full h-screen flex overflow-hidden bg-bright-snow-50">
                    <div className="max-w-70 h-full bg-ink-black-900 shadow-2xl">
                         <Sidebar />
                    </div>
                    <div className="w-full h-full flex flex-col">
                         <Header />
                         <Main />
                    </div>
               </section>
          </PageProvider>
     );
};

export default Admin;
