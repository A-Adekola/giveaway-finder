// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
