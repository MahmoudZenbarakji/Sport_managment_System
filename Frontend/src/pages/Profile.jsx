import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logoutUser } from "../utils/api";
import { API_BASE } from "../environment/config";
import bg from "../assets/bg1.jpeg";

const Profile = () => {
  const accentColor = "#E9622b";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getMe();
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.error || "Failed to load user data");
        // If unauthorized, redirect to login
        if (result.error.includes("Unauthorized") || result.error.includes("token")) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Still redirect even if logout fails
      navigate("/login");
    }
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${API_BASE}${imagePath}`;
  };

  if (loading) {
    return (
      <div
        className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div
        className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70"
          style={{
            boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
          }}
        >
          <div
            className="p-4 rounded-md text-sm mb-4"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.5)",
            }}
          >
            {error}
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 font-semibold rounded-md text-black transition duration-300"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 4px 15px -3px ${accentColor}`,
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-4xl mx-auto pt-20">
        <div
          className="w-full p-8 sm:p-10 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70"
          style={{
            boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture Section */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                {user?.profilePicture ? (
                  <img
                    src={getImageUrl(user.profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-4"
                    style={{ borderColor: accentColor }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-gray-300 text-4xl ${
                    user?.profilePicture ? "hidden" : ""
                  }`}
                >
                  {user?.name?.[0]?.toUpperCase() || "?"}
                </div>
              </div>
              <div className="text-center">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "white" }}
                >
                  {user?.name || "User"}
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "User"}
                </span>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="flex-grow w-full">
              <h2
                className="text-3xl font-bold text-center mb-6 md:mb-8"
                style={{ color: "white" }}
              >
                Profile Information
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

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#999" }}
                  >
                    Email
                  </label>
                  <div
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    {user?.email || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#999" }}
                  >
                    Phone Number
                  </label>
                  <div
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    {user?.phoneNumber || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#999" }}
                  >
                    Bio
                  </label>
                  <div
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white min-h-[60px]"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    {user?.bio || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#999" }}
                  >
                    Address
                  </label>
                  <div
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    {user?.address || "Not provided"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#999" }}
                    >
                      City
                    </label>
                    <div
                      className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                      style={{
                        border: "1px solid #333",
                        borderBottom: `2px solid ${accentColor}`,
                      }}
                    >
                      {user?.city || "Not provided"}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#999" }}
                    >
                      State
                    </label>
                    <div
                      className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                      style={{
                        border: "1px solid #333",
                        borderBottom: `2px solid ${accentColor}`,
                      }}
                    >
                      {user?.state || "Not provided"}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#999" }}
                  >
                    Member Since
                  </label>
                  <div
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not available"}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={fetchUserData}
                  className="flex-1 py-3 font-semibold rounded-md text-white transition duration-300 border-2"
                  style={{
                    borderColor: accentColor,
                    backgroundColor: "transparent",
                  }}
                >
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 font-semibold rounded-md text-black transition duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 4px 15px -3px ${accentColor}`,
                  }}
                >
                  Logout
                </button>
              </div>

              <p className="mt-6 text-center text-sm" style={{ color: "#999" }}>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="font-medium hover:underline ml-1"
                  style={{
                    color: accentColor,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  ← Back to Home
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

