import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    collegeId: "",
    email: "",
    className: "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isRegister) {
      // Login request
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate("/dashboard");
      } else {
        setError(res.message);
      }
    } else {
      // Registration logic
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setIsRegister(false);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="collegeId"
                placeholder="College ID"
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="text"
                name="className"
                placeholder="Class Name"
                value={formData.className}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              >
                <option value="Admin">Admin</option>
                <option value="Sub-Admin">Sub-Admin</option>
                <option value="Student">Student</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 ml-1"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
