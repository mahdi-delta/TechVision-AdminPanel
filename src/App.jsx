import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Dashboard from "./pages/AdminPages/Dashboard"; 
import Products from "./pages/AdminPages/Products";
import Users from "./pages/AdminPages/Users";
import Orders from "./pages/AdminPages/Orders";
import Setting from "./pages/AdminPages/Settings";
import Login from "./pages/AdminPages/Login";
import ProtectedRoute from "./pages/AdminPages/ProtectedRoute";

const App = () => {
     return (
          <Routes>
               <Route path="/" element={<Navigate to="/login" replace />} />

               <Route path="/login" element={<Login />} />

               <Route 
                    path="/admin" 
                    element={
                         <ProtectedRoute>
                              <Admin />
                         </ProtectedRoute>
                    }
               >
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