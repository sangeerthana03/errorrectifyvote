import { Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  console.log("✅ App is rendering..."); // Debugging Log

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;



