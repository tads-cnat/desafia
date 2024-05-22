import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Dashboard } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
