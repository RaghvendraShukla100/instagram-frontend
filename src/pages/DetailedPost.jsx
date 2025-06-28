import React, { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdClose,
} from "react-icons/io";
import {
  MoreHorizontal,
  Smile,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const postData = [
  {
    profileImage:
      "https://i.pinimg.com/736x/6a/c1/f8/6ac1f86b310a39559215d5b4439e2a39.jpg",
    userName: "chanelsoerholt",
    timePassedFromPost: "2d",
    caption: "just watching the sunset 🌅 what about u?",
    likeCount: 13458,
    commentCount: 1248,
    postImages: [
      "https://i.pinimg.com/736x/d0/b0/c5/d0b0c5089d2d475f1e974ebdc48cfa95.jpg",
      "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
      "https://i.pinimg.com/736x/19/cc/d8/19ccd85eaf493588018f58a1c590194c.jpg",
    ],
    isVerified: true,
  },
  {
    profileImage:
      "https://i.pinimg.com/736x/6a/c1/f8/6ac1f86b310a39559215d5b4439e2a39.jpg",
    userName: "nikitadatta",
    timePassedFromPost: "2h",
    caption: "Exploring the beach vibes! 🌊",
    likeCount: 27891,
    commentCount: 1873,
    postImages: [
      "https://i.pinimg.com/736x/50/c4/68/50c46853d24196c583a695b8f448f820.jpg",
      "https://i.pinimg.com/736x/0e/43/d5/0e43d5982749b83f8a688cf66185d5f4.jpg",
    ],
    isVerified: true,
  },
];

function DetailedPost({ onClose }) {
  const [postIndex, setPostIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const currentPost = postData[postIndex];
  const currentImage = currentPost.postImages[imageIndex];

  // Navigate between images within the same post
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

  // Navigate between posts
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* Close Button */}
      <div className="absolute top-5 right-5 cursor-pointer" onClick={onClose}>
        <IoMdClose className="w-8 h-8 text-gray-300 hover:text-white transition" />
      </div>

      {/* Previous Post Button */}
      <div
        onClick={handlePrevPost}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <IoIosArrowDropleftCircle className="w-12 h-12 text-gray-300 hover:text-white transition" />
      </div>

      {/* Main Container */}
      <div className="flex items-center h-[90%] max-w-7xl bg-black rounded-lg overflow-hidden relative">
        {/* Left: Media with Inner Carousel Controls */}
        <div className="w-fit max-w-[65%] max-h-[90vh] relative flex items-center justify-center bg-black">
          {/* Inner Left Arrow */}
          {currentPost.postImages.length > 1 && (
            <div
              onClick={handleInnerPrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/40 rounded-full p-1"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Image */}
          <img
            src={currentImage}
            alt="Post Media"
            className="max-h-[90vh] max-w-full object-contain rounded-l-lg"
          />

          {/* Inner Right Arrow */}
          {currentPost.postImages.length > 1 && (
            <div
              onClick={handleInnerNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/40 rounded-full p-1"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Right: Details Panel */}
        <div className="w-[400px] h-full bg-[#252323] text-white p-4 overflow-y-auto rounded-r-lg">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={currentPost.profileImage}
                alt={currentPost.userName}
                className="w-10 rounded-full border-2 border-[#b519a5]"
              />
              <span className="font-bold">{currentPost.userName}</span>
              <span className="text-xs">{currentPost.timePassedFromPost}</span>
              <button className="text-blue-400 text-sm">Follow</button>
            </div>
            <MoreHorizontal />
          </div>

          {/* Comments Placeholder */}
          <div className="h-[68%] py-5 flex justify-center items-center">
            <div className="font-bold">No comments to display</div>
          </div>

          {/* Footer */}
          <div className="pb-4 text-sm">
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
              {currentPost.caption}
            </div>
            <div className="text-gray-400 mb-2 cursor-pointer">
              View all {currentPost.commentCount.toLocaleString()} comments
            </div>
            <div className="flex items-center border-t border-gray-700 pt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-transparent text-white flex-1 outline-none text-sm placeholder:text-gray-400"
              />
              <Smile className="w-5 h-5 text-gray-400 ml-2" />
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

export default DetailedPost;
