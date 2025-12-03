import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import bg from "../assets/bg1.jpeg";

const Register = () => {
  const accentColor = "#E9622b";
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setProfileFile(file);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.phoneNumber
      );

      if (result.success) {
        // Redirect to login page on successful registration
        navigate("/login");
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4 pl-[25%]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="w-full max-w-3xl p-8 sm:p-10 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70 flex flex-col md:flex-row items-center md:items-start gap-8"
        style={{
          boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
        }}
      >
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4"
                style={{ borderColor: accentColor }}
              />
            ) : (
              <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-gray-300 text-xl">
                ?
              </div>
            )}
          </div>
          <label className="cursor-pointer px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Right side: Form */}
        <div className="flex-grow w-full">
          <h2
            className="text-3xl font-bold text-center mb-6 md:mb-8"
            style={{ color: "white" }}
          >
            Create a New Account
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
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "white" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium hover:underline ml-1"
              style={{
                color: accentColor,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

