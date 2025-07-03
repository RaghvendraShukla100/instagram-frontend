import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

dayjs.extend(relativeTime);

function Post() {
  const navigate = useNavigate();

  const [postDatas, setPostDatas] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState({});

  const videoRefs = useRef([]);
  const observer = useRef();

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/posts/?page=${page}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setPostDatas((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const filteredNew = res.data.filter((p) => !existingIds.has(p._id));
          return [...prev, ...filteredNew];
        });
        setCarouselIndex((prev) => [
          ...prev,
          ...Array(res.data.length).fill(0),
        ]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          const video = videoRefs.current[idx];
          if (!video) return;

          if (entry.isIntersecting) {
            video.muted = isMuted; // ✅ ensure global mute/unmute respected
            video.play().catch(() => {}); // auto-play
            setIsPlaying((prev) => ({ ...prev, [idx]: true }));
          } else {
            video.pause();
            setIsPlaying((prev) => ({ ...prev, [idx]: false }));
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
        video.muted = isMuted; // ✅ apply global mute state on attach
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [postDatas, isMuted]); // ✅ include isMuted in deps for re-applying on toggle

  // Toggle play/pause on video tap
  const handleVideoClick = (idx) => {
    const video = videoRefs.current[idx];
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying((prev) => ({ ...prev, [idx]: true }));
    } else {
      video.pause();
      setIsPlaying((prev) => ({ ...prev, [idx]: false }));
    }
  };

  // Toggle mute/unmute on speaker icon click
  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;

      // Apply to all current videos immediately
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = newMuteState;
        }
      });

      return newMuteState;
    });
  };

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const toggleComments = async (postId) => {
    if (expandedPosts.has(postId)) {
      // Collapse comments
      setExpandedPosts((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    } else {
      try {
        // console.log("Fetching comments for postId:", postId);

        const res = await axios.get(
          `http://localhost:5000/api/comments/${postId}`,
          { withCredentials: true }
        );

        // console.log("Fetched comments:", res.data.comments);

        const fetchedComments = res.data.comments.map((comment) => ({
          ...comment,
          createdBy: {
            ...comment.createdBy,
            profilePic: comment.createdBy.profilePic.replace(/\\/g, "/"),
          },
        }));

        setPostDatas((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, comments: fetchedComments } : post
          )
        );

        setExpandedPosts((prev) => {
          const updated = new Set(prev);
          updated.add(postId);
          return updated;
        });
      } catch (error) {
        console.error(
          "❌ Error fetching all comments:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleLike = async (postId, idx) => {
    try {
      const post = postDatas[idx];
      const alreadyLiked = post.isLikedByUser;

      if (!alreadyLiked) {
        await axios.post(
          `http://localhost:5000/api/likes/${postId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(`http://localhost:5000/api/likes/${postId}`, {
          withCredentials: true,
        });
      }

      setPostDatas((prev) => {
        const updated = [...prev];
        updated[idx] = {
          ...post,
          isLikedByUser: !alreadyLiked,
          likeCount: post.likeCount + (alreadyLiked ? -1 : 1),
        };
        return updated;
      });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSave = async (postId, idx) => {
    try {
      const post = postDatas[idx];
      const alreadySaved = post.isSavedByUser;

      if (!alreadySaved) {
        await axios.post(
          `http://localhost:5000/api/saves/${postId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(`http://localhost:5000/api/saves/${postId}`, {
          withCredentials: true,
        });
      }

      setPostDatas((prev) => {
        const updated = [...prev];
        updated[idx] = {
          ...post,
          isSavedByUser: !alreadySaved,
          saveCount: post.saveCount + (alreadySaved ? -1 : 1),
        };
        return updated;
      });
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const handleInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (e, postId, idx) => {
    e.preventDefault();
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { text: commentText },
        { withCredentials: true }
      );

      setPostDatas((prev) => {
        const updated = [...prev];
        const post = updated[idx];
        const newComment = res.data.comment;

        const existingComments = Array.isArray(post.comments)
          ? post.comments
          : [];

        updated[idx] = {
          ...post,
          comments: [
            newComment,
            ...existingComments.filter((c) => c._id !== newComment._id),
          ].slice(0, 3),
          commentCount: post.commentCount + 1,
        };
        return updated;
      });

      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async ({ commentId, postId, postIdx }) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });

      setPostDatas((prev) => {
        const updatedPosts = [...prev];
        const post = updatedPosts[postIdx];

        // Filter out the deleted comment
        post.comments = post.comments.filter((c) => c._id !== commentId);

        // Decrement comment count safely
        post.commentCount = Math.max(0, post.commentCount - 1);

        updatedPosts[postIdx] = post;
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleFollowButtonClick = async (userId, postIdx) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${userId}/follow`,
        { withCredentials: true }
      );

      const { isFollowing, message } = res.data;

      // ✅ Update local state so UI updates immediately
      setPostDatas((prev) => {
        const updated = [...prev];
        updated[postIdx] = {
          ...updated[postIdx],
          isFollowingCreator: isFollowing,
        };
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      {postDatas.map((elm, idx) => {
        const mediaItems = elm.media;
        const currentIdx = carouselIndex[idx] ?? 0;
        const currentMedia = mediaItems[currentIdx];

        const mediaUrl = `http://localhost:5000/${currentMedia.url.replace(
          /\\/g,
          "/"
        )}`;
        const profilePic = `http://localhost:5000/${elm.createdBy.profilePic.replace(
          /\\/g,
          "/"
        )}`;
        const showAllComments = expandedPosts.has(elm._id);
        const displayedComments = showAllComments
          ? elm.comments
          : elm.comments?.slice(0, 2);

        return (
          <div
            key={elm._id}
            ref={idx === postDatas.length - 1 ? lastPostElementRef : null}
            className="max-w-lg mx-auto  bg-white dark:bg-black text-black
           md:w-[500px]   dark:text-white font-sans rounded-sm shadow-sm"
          >
            {/* post heading */}
            <div className="flex justify-between items-center mt-7 mb-3  ">
              <div className="flex items-center gap-3 ">
                <div className="border-2 p-[2px] rounded-full">
                  <img
                    src={profilePic}
                    className="h-8 w-8 rounded-full object-cover"
                    alt={elm.createdBy.username}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <span
                      onClick={() => navigate(`/profile/${elm.createdBy._id}`)}
                      className="cursor-pointer "
                    >
                      {elm.createdBy.username}
                    </span>

                    {elm.createdBy.isVerified && (
                      <MdVerified className="text-blue-600  " />
                    )}
                  </div>
                  <span
                    className="text-blue-600 font-semibold text-sm cursor-pointer"
                    onClick={() =>
                      handleFollowButtonClick(elm.createdBy._id, idx)
                    }
                  >
                    {elm.isFollowingCreator ? "Following" : "Follow"}
                  </span>

                  <div className="text-xs text-gray-500 ">
                    {dayjs(elm.createdAt).fromNow()}
                  </div>
                </div>
              </div>
              <MoreHorizontal className="cursor-pointer" />
            </div>

            <div
              className="relative flex items-center justify-center border rounded-sm
             border-gray-600 w-[500px] h-[600px] bg-black"
            >
              {currentMedia.type === "image" ? (
                <img
                  src={mediaUrl}
                  className="w-full h-full object-cover "
                  alt="post"
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={mediaUrl}
                  data-idx={idx} // required for observer
                  className="h-full object-cover cursor-pointer"
                  muted
                  loop
                  playsInline
                  onClick={() => handleVideoClick(idx)} // tap to play/pause
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMuteToggle();
                }}
                className="absolute top-2 right-2 bg-black/40 text-white p-1 rounded-full text-xs"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCarouselIndex((prev) => {
                        const updated = [...prev];
                        updated[idx] =
                          (updated[idx] - 1 + mediaItems.length) %
                          mediaItems.length;
                        return updated;
                      })
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1"
                  >
                    <ChevronLeft className="text-white w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCarouselIndex((prev) => {
                        const updated = [...prev];
                        updated[idx] = (updated[idx] + 1) % mediaItems.length;
                        return updated;
                      })
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1"
                  >
                    <ChevronRight className="text-white w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="text-sm mt-2">
              <div className="flex justify-between mb-2">
                <div className="flex gap-4">
                  <Heart
                    className={`w-6 h-6 cursor-pointer transition-transform duration-200 ${
                      elm.isLikedByUser
                        ? "text-red-500 fill-red-500 scale-125"
                        : "scale-100"
                    }`}
                    onClick={() => handleLike(elm._id, idx)}
                  />
                  <MessageCircle
                    className={`w-5 h-5 cursor-pointer ${
                      elm.isCommentedByUser ? "text-blue-500" : ""
                    }`}
                  />
                  <Send className="w-5 h-5 cursor-pointer" />
                </div>
                <Bookmark
                  className={`w-5 h-5 cursor-pointer ${
                    elm.isSavedByUser ? "text-white fill-white" : ""
                  }`}
                  onClick={() => handleSave(elm._id, idx)}
                />
              </div>
              <div className="font-semibold mb-1">{elm.likeCount} likes</div>
              <div className="mb-1">
                <span className="font-semibold mr-1">
                  {elm.createdBy.username}
                </span>
                {elm.caption.trim().split(" ").slice(0, 10).join(" ")}
              </div>
              <div
                className="text-gray-500 text-sm cursor-pointer "
                onClick={() => toggleComments(elm._id)}
              >
                {elm.commentCount === 0
                  ? "No comment yet".toUpperCase()
                  : showAllComments
                  ? "Hide comments"
                  : `View all ${elm.commentCount} comments`}
              </div>
              <AnimatePresence initial={false}>
                {displayedComments?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {displayedComments.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex justify-between items-center gap-2 mt-2 "
                      >
                        {/* profile picture of commenting user */}
                        <div className="flex gap-2 items-center">
                          <img
                            src={`http://localhost:5000/${comment?.createdBy?.profilePic?.replace(
                              /\\/g,
                              "/"
                            )}`}
                            alt={comment?.createdBy?.username}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-semibold mr-1 ">
                              {comment?.createdBy?.username ?? "Unknown User"}
                            </span>
                            <span className="font-thin">{comment.text}</span>
                          </div>
                          {/* button to delete the comment */}
                          <AiFillDelete
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              handleDeleteComment({
                                commentId: comment._id,
                                postId: elm._id,
                                postIdx: idx,
                              })
                            }
                          />
                        </div>
                        {/* display the time of comment */}
                        <div className="text-xs text-gray-500">
                          {dayjs(comment.createdAt).fromNow()}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={(e) => handleCommentSubmit(e, elm._id, idx)}
                className="flex items-center mt-2 border-b border-gray-800 pb-2 pt-2"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[elm._id] || ""}
                  onChange={(e) => handleInputChange(elm._id, e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button
                  type="submit"
                  className="font-semibold capitalize hover:underline my-1"
                >
                  post
                </button>
              </form>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className="flex justify-center my-4 text-gray-500">Loading...</div>
      )}
    </div>
  );
}

export default Post;
