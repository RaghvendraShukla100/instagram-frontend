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
  CheckCircle,
} from "lucide-react";
import { AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
dayjs.extend(relativeTime);

function Post() {
  const [postDatas, setPostDatas] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const videoRefs = useRef([]);
  const observer = useRef();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/posts?page=${page}`,
        { withCredentials: true }
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
    fetchPosts();
  }, [page]);

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
        console.log("Fetching comments for postId:", postId);

        const res = await axios.get(
          `http://localhost:5000/api/comments/${postId}`,
          { withCredentials: true }
        );

        console.log("Fetched comments:", res.data.comments);

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

  //////////////////////////

  const handleDeleteComment = async ({
    commentId,
    postId,
    postIdx,
    setPostDatas,
  }) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });

      setPostDatas((prev) => {
        const updated = [...prev];
        const post = updated[postIdx];

        const updatedComments = post.comments.filter(
          (c) => c._id !== commentId
        );

        updated[postIdx] = {
          ...post,
          comments: updatedComments,
          commentCount: post.commentCount - 1,
        };

        return updated;
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  ////////////////////////////
  return (
    <div className="space-y-5">
      {postDatas.map((elm, idx) => {
        const mediaItems = elm.media;
        const currentMedia = mediaItems[carouselIndex[idx]];
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
            className="max-w-lg mx-auto bg-white dark:bg-black text-black dark:text-white font-sans rounded-sm shadow-sm"
          >
            <div className="flex justify-between items-center mt-10">
              <div className="flex items-center gap-3">
                <img
                  src={profilePic}
                  className="h-10 w-10 rounded-full object-cover"
                  alt={elm.createdBy.username}
                />
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <span>{elm.createdBy.username}</span>
                    {elm.createdBy.isVerified && (
                      <CheckCircle className="text-blue-500 w-4 h-4" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dayjs(elm.createdAt).fromNow()}
                  </div>
                </div>
              </div>
              <MoreHorizontal className="cursor-pointer" />
            </div>

            <div className="relative w-full h-[600px] bg-black">
              {currentMedia.type === "image" ? (
                <img
                  src={mediaUrl}
                  className="w-full h-full object-cover border border-gray-500 mt-2"
                  alt="post"
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={mediaUrl}
                  className="w-full h-full object-cover border border-gray-500 mt-2"
                  muted
                  loop
                  playsInline
                  controls
                />
              )}

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
                    <ChevronLeft className="text-white w-6 h-6" />
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
                    <ChevronRight className="text-white w-6 h-6" />
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
                    elm.isSavedByUser ? "text-yellow-400 fill-yellow-400" : ""
                  }`}
                  onClick={() => handleSave(elm._id, idx)}
                />
              </div>
              <div className="font-semibold mb-1">{elm.likeCount} likes</div>
              <div className="mb-1">
                <span className="font-semibold mr-1">
                  {elm.createdBy.username}
                </span>
                {elm.caption}
              </div>
              <div
                className="text-gray-500 text-sm cursor-pointer "
                onClick={() => toggleComments(elm._id)}
              >
                {elm.commentCount === 0
                  ? "No comment yet, be the first to comment"
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
                        className="flex justify-between gap-2 mt-2 "
                      >
                        {/* profile picture of commenting user */}
                        <div className="flex gap-2">
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
                          <AiFillDelete
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              handleDeleteComment({
                                commentId: comment._id,
                                postId: elm._id,
                                postIdx: idx,
                                setPostDatas,
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
                className="flex items-center mt-2 border-b pt-2"
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
                  className="border px-5 my-1 hover:bg-yellow-400 hover:text-gray-900 hover:font-bold rounded-sm"
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
