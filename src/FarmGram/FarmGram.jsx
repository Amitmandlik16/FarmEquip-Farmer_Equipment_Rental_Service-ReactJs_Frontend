import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaArrowDown,
  FaHome,
  FaPlusSquare,
  FaUser,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import { Transition } from "@headlessui/react";

const FarmGram = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://famerequipmentrental-springboot-production.up.railway.app/posts/all"
        );
        setPosts(response.data.reverse()); // Reverse the order of posts to display new posts first
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchProfilePosts = async (ownerId) => {
      try {
        const response = await axios.get(
          `https://famerequipmentrental-springboot-production.up.railway.app/posts/owner/${ownerId}`
        );
        setProfilePosts(response.data);
      } catch (error) {
        console.error("Error fetching profile posts:", error);
      }
    };

    fetchPosts();

    const username = localStorage.getItem("username");
    setLoggedInUsername(username);

    const ownerId = 1; // Replace with the actual owner ID
    fetchProfilePosts(ownerId);
  }, []);

  const currentPost = posts[currentPostIndex];

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `https://famerequipmentrental-springboot-production.up.railway.app/posts/like/${postId}/1` // Replace 1 with the actual owner ID
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: likes[postId] ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex < posts.length - 1 ? prevIndex + 1 : 0
    );
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : currentPost.imageUrls.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < currentPost.imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://famerequipmentrental-springboot-production.up.railway.app/posts/comments/${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (newComment.trim()) {
      try {
        await axios.post(
          "https://famerequipmentrental-springboot-production.up.railway.app/posts/addComment",
          {
            postId: postId,
            ownerId: 1, // Replace with the actual owner ID
            text: newComment,
          }
        );
        fetchComments(postId);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://famerequipmentrental-springboot-production.up.railway.app/posts/comment/delete/${commentId}/1` // Replace 1 with the actual owner ID
      );
      fetchComments(currentPost.id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadMessage("Photo uploaded successfully!");
      return response.data.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadMessage("Error uploading photo.");
    }
  };

  const handlePostSubmit = async () => {
    const imageId = await handleImageUpload();
    if (!imageId) return;

    const postData = {
      text: caption,
      ownerId: 1, // Replace with the actual owner ID
      imageIds: imageId.toString(),
    };

    try {
      const response = await axios.post(
        "https://famerequipmentrental-springboot-production.up.railway.app/posts/create",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newPost = response.data;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setCaption("");
      setImageFile(null);
      setActiveTab("home");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-18 ">
      {/* Mobile View Wrapper */}
      <div className="w-full mt-5 max-w-[400px] flex flex-col bg-black shadow-md h-160 border border-gray-300 rounded-lg">
        {/* Main Content */}
        <div className="overflow-hidden flex-grow overflow-auto p-4 pb-20 relative border-b border-gray-300 rounded-t-lg">
          {/* Posts Header */}
          <div className="absolute top-0 left-0 p-4">
            <h2 className="text-xl text-white font-bold">POSTS</h2>
          </div>

          {activeTab === "home" && posts.length > 0 ? (
            <div key={currentPost.id} className="relative mt-12">
              <div className="flex top-25 justify-center items-center relative">
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 text-2xl text-gray-700 bg-white p-2 rounded-full shadow-md"
                >
                  <FaArrowLeft />
                </button>
                <img
                  src={`https://famerequipmentrental-springboot-production.up.railway.app${currentPost.imageUrls[currentImageIndex]}`}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-md"
                />
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 text-2xl text-gray-700 bg-white p-2 rounded-full shadow-md"
                >
                  <FaArrowRight />
                </button>
              </div>

              {/* Username & Caption at Bottom */}
              <div className="absolute top-100 left-0 w-full bg-opacity-75 p-2 rounded-b-md">
                <p className="font-bold">
                  <FaUser className="inline mr-2 mb-2 text-white" />
                  {loggedInUsername}
                </p>
                <p className="text-white">{currentPost.text}</p>
              </div>

              {/* Like & Comment at Bottom Right */}
              <div className="absolute top-68 right-2 flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleLike(currentPost.id)}
                  className="text-2xl text-white"
                >
                  {likes[currentPost.id] ? (
                    <FaHeart className="text-red-600" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                <span className="text-white text-sm">{currentPost.likes}</span>
                <button
                  onClick={() => {
                    setShowComments(!showComments);
                    fetchComments(currentPost.id);
                  }}
                  className="text-2xl text-white"
                >
                  <FaRegComment />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">Available Posts</p>
          )}

          {/* Post Upload */}
          {activeTab === "post" && (
            <div className="p-4">
              <h2 className="text-xl text-white font-bold text-center mb-4">
                Create a Post
              </h2>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-white p-2 border rounded mb-2"
              />
              {uploadMessage && (
                <p className="text-center text-white text-green-600">
                  {uploadMessage}
                </p>
              )}
              <textarea
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 text-white border rounded mb-2"
              ></textarea>
              <button
                onClick={handlePostSubmit}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Post
              </button>
            </div>
          )}

          {/* Profile Page */}
          {activeTab === "profile" && (
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">Farmer Profile</h2>
              <p className="text-center text-gray-700">
                Username: {loggedInUsername}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Your Posts
                </h3>
                <div className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar">
                  {profilePosts.map((post) => (
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
                        Posted on:{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Down Arrow for Next Post (Above Navbar) */}
        {activeTab === "home" && posts.length > 0 && (
          <div className="w-full flex justify-center p-2">
            <button
              onClick={handleNextPost}
              className="text-2xl text-green-600 bg-white p-2 rounded-full shadow-md"
            >
              <FaArrowDown />
            </button>
          </div>
        )}
        {activeTab === "profile" && posts.length > 0 && (
          <div className="w-full flex justify-center p-2">
            <button
              onClick={handleNextPost}
              className="text-2xl text-green-600 bg-white p-2 rounded-full shadow-md"
            >
              <FaArrowDown />
            </button>
          </div>
        )}

        {/* Bottom Navigation (Moves with Content) */}
        <div className="w-full max-w-[400px] bg-white p-2 flex justify-around border-t border-gray-300 sticky bottom-0 border border-gray-300 rounded-b-lg">
          <button onClick={() => setActiveTab("home")} className="text-xl">
            <FaHome />
          </button>
          <button onClick={() => setActiveTab("post")} className="text-xl">
            <FaPlusSquare />
          </button>
          <button onClick={() => setActiveTab("profile")} className="text-xl">
            <FaUser />
          </button>
        </div>
      </div>

      {/* Comments Section (Sliding Up) */}
      <Transition
        show={showComments}
        enter="transition ease-out duration-300"
        enterFrom="transform translate-y-full"
        enterTo="transform translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform translate-y-0"
        leaveTo="transform translate-y-full"
        className="fixed bottom-75 left-0 right-0 bg-white dark:bg-gray-800 p-4 rounded-t-lg shadow-lg overflow-hidden"
      >
        <div className="max-w-sm mx-auto relative">
          <button
            className="absolute top-2 right-2 text-white text-2xl"
            onClick={() => setShowComments(false)}
          >
            <FaTimes />
          </button>
          <h2 className="text-xl text-white font-bold text-center mb-4">
            Comments
          </h2>
          {comments.length > 0 ? (
            comments.map((comment, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                <p className="text-gray-800 dark:text-gray-300 text-sm">
                  {comment.text}
                </p>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No comments yet.
            </p>
          )}
          {/* Add Comment */}
          <div className="mt-2 text-white flex">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 text-white p-2 border rounded-l"
            />
            <button
              onClick={() => handleCommentSubmit(currentPost.id)}
              className="bg-green-600 text-white px-3 rounded-r"
            >
              Post
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default FarmGram;
