
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Ensure redirection works correctly
  useEffect(() => {
    if (!user) {
      console.log("🔴 No user found, redirecting to login...");
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering if user is null

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-3">
          Welcome, {user.email}!
        </h1>
        <p className="text-gray-600">Role: <strong>{user.role}</strong></p>

        <button 
          onClick={() => {
            console.log("🔹 Logging out...");
            logout();
            navigate("/");
          }} 
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
