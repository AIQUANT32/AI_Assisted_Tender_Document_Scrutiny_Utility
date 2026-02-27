import { useState } from "react";
import { Link } from "react-router-dom";

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
    localStorage.setItem("user", JSON.stringify({
      username: form.username
    }));
    onSubmit(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <h2 className="text-2xl font-semibold text-gray-800">
          {type === "login" ? "Login" : "Signup"}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {type === "login" ? "Welcome back" : "Create your account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 transition"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 
                       text-white text-sm font-medium 
                       py-2.5 rounded-lg transition"
          >
            {type === "login" ? "Login" : "Create account"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 
                          border border-red-100 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthForm;