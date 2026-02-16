import { useNavigate, Link } from "react-router-dom";
import {useState} from "react";
import AuthForm from "../features/components/authform";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleLogin = async (formData) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <AuthForm type="login" onSubmit={handleLogin} error={error} />
    </>
  );
}

export default Login;
