import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Admin />} />
    </Routes>
  )
}

export default App;