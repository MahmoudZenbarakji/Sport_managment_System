import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog, getCurrentUser } from "../utils/api";
import bg from "../assets/bg1.jpeg";

const CreatePost = () => {
  const accentColor = "#E9622b";
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const result = await createBlog(
        formData.title,
        formData.content,
        user._id,
        formData.image || undefined
      );

      if (result.success) {
        // Redirect to blog page - the blog list will refresh automatically
        navigate("/blog", { replace: true });
      } else {
        setError(result.error || "Failed to create post");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Create post error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-3xl p-8 sm:p-10 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70 mt-20"
        style={{
          boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "white" }}
        >
          Create New Post
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
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-300"
              style={{
                border: "1px solid #333",
                borderBottom: `2px solid ${accentColor}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "white" }}
            >
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows="10"
              className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-300 resize-y"
              style={{
                border: "1px solid #333",
                borderBottom: `2px solid ${accentColor}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "white" }}
            >
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-300"
              style={{
                border: "1px solid #333",
                borderBottom: `2px solid ${accentColor}`,
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="flex-1 py-3 font-semibold rounded-md text-white transition duration-300 border-2"
              style={{
                borderColor: accentColor,
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 font-semibold rounded-md text-black transition duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 4px 15px -3px ${accentColor}`,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

