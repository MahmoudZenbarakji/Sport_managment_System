import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import bg from "../assets/bg1.jpeg";

const LogIn = () => {
  const accentColor = "#E9622b";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        // Redirect to home page on successful login
        navigate("/");
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4 pl-[20%]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="w-full max-w-md p-8 sm:p-10 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70"
        style={{
          boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "white" }}
        >
          Login to your account
        </h2>

        {error && (
          <div
            className="mb-4 p-3 rounded-md text-sm"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.5)",
            }}
          >
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "white" }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-300"
              style={{
                border: "1px solid #333",
                borderBottom: `2px solid ${accentColor}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-300"
              style={{
                border: "1px solid #333",
                borderBottom: `2px solid ${accentColor}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 font-semibold rounded-md text-black transition duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 4px 15px -3px ${accentColor}`,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "white" }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium hover:underline ml-1"
            style={{
              color: accentColor,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
