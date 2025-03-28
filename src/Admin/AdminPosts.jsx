import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve authentication token
        const response = await axios.get(
          "https://famerequipmentrental-springboot-production.up.railway.app/posts/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar setActiveTab={() => {}} />
      <div className="flex-1 p-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Farmer's Posts
        </h1>

        {loading ? (
          <p className="text-center text-lg font-semibold">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No posts found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <img
                    src={`https://famerequipmentrental-springboot-production.up.railway.app${post.imageUrls[0]}`}
                    alt="Post"
                    className="w-full h-60 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.text}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Likes: {post.likes}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Comments: {post.comments}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;
