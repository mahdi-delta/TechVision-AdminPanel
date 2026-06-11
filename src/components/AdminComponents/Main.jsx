import { Outlet } from "react-router-dom";

const Main = () => {
     return (
          <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-4 md:p-6">
               <Outlet />
          </main>
     );
};

export default Main;
