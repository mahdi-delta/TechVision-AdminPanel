import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/adminStore/useAuthStore";

const ProtectedRoute = ({ children }) => {
     const currentUser = useAuthStore((state) => state.currentUser);

     if (!currentUser) {
          return <Navigate to="/login" replace />;
     }

     return children;
};

export default ProtectedRoute;
