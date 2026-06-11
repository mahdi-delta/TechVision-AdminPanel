import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Dashboard from "./pages/AdminPages/Dashboard"; 
import Products from "./pages/AdminPages/Products";
import Users from "./pages/AdminPages/Users";
import Orders from "./pages/AdminPages/Orders";
import Setting from "./pages/AdminPages/Settings";

const App = () => {
     return (
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />

               <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />

                    <Route path="products" element={<Products />} />
                    <Route path="users" element={<Users />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="settings" element={<Setting />} />
               </Route>
          </Routes>
     );
};

export default App;