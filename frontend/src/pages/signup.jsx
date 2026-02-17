import { useNavigate, Link } from "react-router-dom";
import {useState} from "react";
import AuthForm from "../features/components/authform";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleSignup = async (formData) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <AuthForm type="signup" onSubmit={handleSignup} error={error} />
    </>
  );
}

export default Signup;
