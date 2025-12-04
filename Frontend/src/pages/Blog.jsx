import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, getBlogById, likeBlog, getCommentsByBlog, addComment, deleteComment, likeComment, getCurrentUser } from "../utils/api";
import { API_BASE } from "../environment/config";
import bg from "../assets/bg1.jpeg";

const Blog = () => {
  const accentColor = "#E9622b";
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Refresh blogs when returning from create post page
  useEffect(() => {
    const handleFocus = () => {
      fetchBlogs();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  useEffect(() => {
    if (selectedBlog) {
      fetchComments(selectedBlog._id);
    }
  }, [selectedBlog]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getBlogs();
      if (result.success) {
        setBlogs(result.blogs);
      } else {
        setError(result.error || "Failed to load blogs");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Blog error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (blogId) => {
    try {
      const result = await getCommentsByBlog(blogId);
      if (result.success) {
        setComments(result.comments);
      }
    } catch (err) {
      console.error("Comments error:", err);
    }
  };

  const handleBlogClick = async (blogId) => {
    try {
      const result = await getBlogById(blogId);
      if (result.success) {
        setSelectedBlog(result.blog);
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  const handleLikeBlog = async (blogId) => {
    if (!user) {
      alert("Please login to like blogs");
      navigate("/login");
      return;
    }
    try {
      const result = await likeBlog(blogId, user._id);
      if (result.success) {
        // Update the blog in the list
        setBlogs(blogs.map(blog => 
          blog._id === blogId 
            ? { ...blog, likes: result.liked ? [...blog.likes, user._id] : blog.likes.filter(id => id.toString() !== user._id) }
            : blog
        ));
        // Update selected blog if it's the one being liked
        if (selectedBlog && selectedBlog._id === blogId) {
          setSelectedBlog({
            ...selectedBlog,
            likes: result.liked ? [...selectedBlog.likes, user._id] : selectedBlog.likes.filter(id => id.toString() !== user._id)
          });
        }
      }
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add comments");
      navigate("/login");
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const result = await addComment(commentText, user._id, selectedBlog._id);
      if (result.success) {
        setCommentText("");
        fetchComments(selectedBlog._id);
        // Update selected blog comments count
        setSelectedBlog({
          ...selectedBlog,
          comments: [...selectedBlog.comments, result.comment._id]
        });
      } else {
        alert(result.error || "Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const result = await deleteComment(commentId);
      if (result.success) {
        fetchComments(selectedBlog._id);
        // Update selected blog comments
        setSelectedBlog({
          ...selectedBlog,
          comments: selectedBlog.comments.filter(id => id.toString() !== commentId)
        });
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) {
      alert("Please login to like comments");
      navigate("/login");
      return;
    }
    try {
      const result = await likeComment(commentId, user._id);
      if (result.success) {
        // Update comment in the list
        setComments(comments.map(comment => 
          comment._id === commentId 
            ? { ...comment, likes: result.liked ? [...comment.likes, user._id] : comment.likes.filter(id => id.toString() !== user._id) }
            : comment
        ));
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${API_BASE}${imagePath}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  if (selectedBlog) {
    const isLiked = user && selectedBlog.likes.some(id => id.toString() === user._id);
    return (
      <div
        className="w-full min-h-screen bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-4xl mx-auto pt-20">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedBlog(null)}
              className="px-4 py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg transition duration-300"
            >
              ← Back to Blogs
            </button>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-black rounded-lg transition duration-300"
              >
                Home
              </button>
              {user && (
                <button
                  onClick={() => navigate("/create-post")}
                  className="px-4 py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg transition duration-300"
                >
                  + Create Post
                </button>
              )}
            </div>
          </div>
          <div
            className="w-full p-8 sm:p-10 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70"
            style={{
              boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
            }}
          >
            {selectedBlog.image && (
              <img
                src={getImageUrl(selectedBlog.image)}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <h1 className="text-4xl font-bold mb-4" style={{ color: "white" }}>
              {selectedBlog.title}
            </h1>
            <div className="flex items-center gap-4 mb-6 text-gray-300">
              <span>By {selectedBlog.author?.name || "Unknown"}</span>
              <span>•</span>
              <span>{formatDate(selectedBlog.createdAt)}</span>
            </div>
            <div
              className="prose prose-invert max-w-none mb-8"
              style={{ color: "#e5e7eb" }}
              dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, '<br />') }}
            />
            
            {/* Like Button */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => handleLikeBlog(selectedBlog._id)}
                className={`px-6 py-2 rounded-lg transition duration-300 flex items-center gap-2 ${
                  isLiked ? "bg-[#E9622b] text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                <span>❤️</span>
                <span>{selectedBlog.likes?.length || 0} Likes</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: "white" }}>
                Comments ({comments.length})
              </h2>

              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none mb-4"
                    style={{
                      border: "1px solid #333",
                      borderBottom: `2px solid ${accentColor}`,
                      minHeight: "100px",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-6 py-2 font-semibold rounded-md text-black transition duration-300"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 15px -3px ${accentColor}`,
                      opacity: submittingComment ? 0.6 : 1,
                    }}
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              ) : (
                <div className="mb-8 p-4 rounded-lg bg-gray-800/50">
                  <p className="text-gray-300 mb-2">Please login to add comments</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg transition duration-300"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => {
                    const isCommentLiked = user && comment.likes?.some(id => id.toString() === user._id);
                    const isCommentOwner = user && comment.user?._id === user._id;
                    return (
                      <div
                        key={comment._id}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-white">
                              {comment.user?.name || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-400">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                          {isCommentOwner && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-gray-300 mb-3">{comment.content}</p>
                        <button
                          onClick={() => handleLikeComment(comment._id)}
                          className={`text-sm px-3 py-1 rounded transition duration-300 ${
                            isCommentLiked ? "text-[#E9622b]" : "text-gray-400 hover:text-gray-300"
                          }`}
                        >
                          ❤️ {comment.likes?.length || 0}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-6xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-4xl font-bold"
            style={{ color: "white" }}
          >
            Our Blog
          </h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-black rounded-lg transition duration-300"
            >
              Home
            </button>
            {user && (
              <button
                onClick={() => navigate("/create-post")}
                className="px-6 py-3 font-semibold rounded-md text-black transition duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 15px -3px ${accentColor}`,
                }}
              >
                + Create Post
              </button>
            )}
          </div>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-md text-sm"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.5)",
            }}
          >
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div
            className="w-full p-8 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70 text-center"
            style={{
              boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
            }}
          >
            <p className="text-white text-xl">No blogs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              return (
                <div
                  key={blog._id}
                  onClick={() => handleBlogClick(blog._id)}
                  className="cursor-pointer p-6 rounded-lg shadow-2xl backdrop-blur-sm bg-black/70 transition duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px ${accentColor}`,
                  }}
                >
                  {blog.image && (
                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <h2
                    className="text-xl font-bold mb-2 line-clamp-2"
                    style={{ color: "white" }}
                  >
                    {blog.title}
                  </h2>
                  <p
                    className="text-sm mb-4 line-clamp-3"
                    style={{ color: "#999" }}
                  >
                    {blog.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{blog.author?.name || "Unknown"}</span>
                    <div className="flex items-center gap-2">
                      <span>❤️ {blog.likes?.length || 0}</span>
                      <span>💬 {blog.comments?.length || 0}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {formatDate(blog.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

