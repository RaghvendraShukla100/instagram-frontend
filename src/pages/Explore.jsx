import React, { useState, useEffect } from "react";
const baseURL = import.meta.env.VITE_BACKEND_URL; // if using Vite
import { Heart, MessageCircle, PlaySquare, Copy } from "lucide-react";
import MainContentWrapper from "../components/MainContentWrapper";
import axios from "axios";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let tallReelCount = 0;

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/posts`, {
        withCredentials: true,
      });
      setPosts(res.data.posts || res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainContentWrapper>
        <div className="text-center py-10 text-gray-400">Loading posts...</div>
      </MainContentWrapper>
    );
  }

  if (error) {
    return (
      <MainContentWrapper>
        <div className="text-center py-10 text-red-400">{error}</div>
      </MainContentWrapper>
    );
  }
  console.log(posts);

  return (
    <MainContentWrapper>
      <div
        className="px-10 py-10 grid grid-cols-3 auto-rows-[350px] gap-2"
        style={{ gridAutoFlow: "dense" }}
      >
        {posts?.map((post, index) => {
          const isReel = post.media?.[0]?.type === "video";
          const isTall = isReel && tallReelCount++ % 2 === 0;
          const mediaUrl = `${baseURL}/${post.media?.[0]?.url.replace(
            /\\/g,
            "/"
          )}`;

          return (
            <div
              key={post._id || index}
              className={`relative group overflow-hidden ${
                isTall ? "row-span-2" : ""
              }`}
            >
              {isReel ? (
                <video
                  src={mediaUrl}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover hover:brightness-75 transition duration-300"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt={`Post ${index}`}
                  className="w-full h-full object-cover hover:brightness-75 transition duration-300"
                />
              )}

              {/* Top Left (Reel icon) */}
              {isReel && (
                <PlaySquare className="absolute top-2 left-2 text-white w-5 h-5 drop-shadow-md" />
              )}

              {/* Top Right (Image/Carousel icon) */}
              {!isReel && (
                <Copy className="absolute top-2 right-2 text-white w-4 h-4 drop-shadow-md" />
              )}

              {/* Hover overlay */}
              {(post.likes || post.comments) && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Heart className="w-4 h-4" /> {post.likeCount}
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <MessageCircle className="w-4 h-4" /> {post.commentCount}{" "}
                    comments
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MainContentWrapper>
  );
}

export default Explore;
