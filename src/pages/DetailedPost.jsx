import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdClose,
} from "react-icons/io";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BiSolidSend } from "react-icons/bi";

// ✅ Day.js imports
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function DetailedPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData, postId, mediaIndex } = location.state || {};
  console.log(profileData);

  const postData = profileData.posts.map((post) => ({
    _id: post._id,
    profileImage: `http://localhost:5000/${profileData.profilePic.replace(
      /\\/g,
      "/"
    )}`,
    userName: profileData.username,
    timePassedFromPost: getTimePassed(post.createdAt),
    caption: post.caption,
    likeCount: post.likes ? post.likes.length : 0,
    commentCount: post.comments ? post.comments.length : 0,
    postImages: post.media.map((m) => ({
      url: `http://localhost:5000/${m.url.replace(/\\/g, "/")}`,
      type: m.type,
    })),
    isVerified: profileData.isVerified,
  }));

  const initialPostIndex = postId
    ? postData.findIndex((post) => post._id === postId)
    : 0;

  const [postIndex, setPostIndex] = useState(
    initialPostIndex !== -1 ? initialPostIndex : 0
  );
  const [imageIndex, setImageIndex] = useState(mediaIndex || 0);

  const currentPost = postData[postIndex];
  const currentImage = currentPost.postImages[imageIndex];

  const handleInnerPrev = () => {
    setImageIndex((prev) =>
      prev === 0 ? currentPost.postImages.length - 1 : prev - 1
    );
  };

  const handleInnerNext = () => {
    setImageIndex((prev) =>
      prev === currentPost.postImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevPost = () => {
    const prevPost = postIndex === 0 ? postData.length - 1 : postIndex - 1;
    setPostIndex(prevPost);
    setImageIndex(0);
  };

  const handleNextPost = () => {
    const nextPost = postIndex === postData.length - 1 ? 0 : postIndex + 1;
    setPostIndex(nextPost);
    setImageIndex(0);
  };

  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* Close Button */}
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={handleCloseButtonClick}
      >
        <IoMdClose className="w-8 h-8 text-gray-300 transition hover:text-red-600" />
      </div>

      {/* Previous Post Button */}
      <div
        onClick={handlePrevPost}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <IoIosArrowDropleftCircle className="w-12 h-12 text-gray-300 hover:text-white transition" />
      </div>

      {/* Main Post Modal */}
      <div className="flex items-center h-[90%] max-w-7xl bg-black rounded-sm overflow-hidden relative">
        {/* Media Viewer */}
        <div className="w-fit max-w-[65%] max-h-[90vh] relative flex items-center justify-center bg-black">
          {currentPost.postImages.length > 1 && (
            <div
              onClick={handleInnerPrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/40 rounded-full p-1"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </div>
          )}

          {currentImage.type === "image" ? (
            <img
              src={currentImage.url}
              alt="Post Media"
              className="max-h-[90vh] max-w-full object-contain"
            />
          ) : (
            <video
              src={currentImage.url}
              controls
              autoPlay
              loop
              className="max-h-[90vh] max-w-full object-contain"
            />
          )}

          {currentPost.postImages.length > 1 && (
            <div
              onClick={handleInnerNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/40 rounded-full p-1"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Post Details Panel */}
        <div className="w-[400px] flex flex-col  h-full bg-[#252323] text-white p-4 rounded-sm">
          {/* Header */}
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-3">
              <img
                src={currentPost.profileImage}
                alt={currentPost.userName}
                className="w-10 h-10 rounded-full border-2"
              />
              <span className="font-bold">{currentPost.userName}</span>
              <span className="text-xs">{currentPost.timePassedFromPost}</span>
              <button className="text-blue-400 text-sm">Follow</button>
            </div>
            <MoreHorizontal />
          </div>

          {/* body -Comments */}
          <div className="flex-1 h-[68%] py-5 flex justify-center items-center overflow-hidden">
            <div className="font-bold">No comments to display</div>
          </div>

          {/* Footer */}
          <div className="pb-4 text-sm ">
            <div className="flex items-center justify-between py-2">
              <div className="flex gap-4">
                <Heart className="w-5 h-5 cursor-pointer" />
                <MessageCircle className="w-5 h-5 cursor-pointer" />
                <Send className="w-5 h-5 cursor-pointer" />
              </div>
              <Bookmark className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="font-semibold mb-1">
              {currentPost.likeCount.toLocaleString()} likes
            </div>
            <div className="mb-1">
              <span className="font-semibold">{currentPost.userName} </span>
              {currentPost.caption.trim().split(" ").slice(0, 5).join(" ")}
            </div>

            <div className="flex items-center border-t border-gray-700 pt-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-transparent  text-white flex-1 outline-none text-sm placeholder:text-gray-400"
              />
              <BiSolidSend className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Post Button */}
      <div
        onClick={handleNextPost}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <IoIosArrowDroprightCircle className="w-12 h-12 text-gray-300 hover:text-white transition" />
      </div>
    </div>
  );
}

/**
 * Uses Day.js to calculate human-readable time difference.
 * @param {string} createdAt - ISO date string
 * @returns {string} - Time passed in "3 minutes ago" format
 */
function getTimePassed(createdAt) {
  return dayjs(createdAt).fromNow();
}

export default DetailedPost;
