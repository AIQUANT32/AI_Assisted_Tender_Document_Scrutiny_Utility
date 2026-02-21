import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/authform.css";

const AuthForm = ({ type, onSubmit, error }) => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{type === "login" ? "Login" : "Signup"}</h2>
        <p className="subtitle">
          {type === "login" ? "Welcome back" : "Create your account"}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          <input
            className="auth-input"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <button className="auth-btn" type="submit">
            {type === "login" ? "Login" : "Create account"}
          </button>
        </form>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-footer">
          {type === "login" ? (
            <>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
