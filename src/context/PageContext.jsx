import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
     const [activePage, setActivePage] = useState("داشبورد");

     return (
          <PageContext.Provider value={{ activePage, setActivePage }}>
               {children}
          </PageContext.Provider>
     );
};

export const usePage = () => {
     const context = useContext(PageContext);
     if (!context) {
          throw new Error("usePage must be used within PageProvider");
     }
     return context;
};
