import React, { useState } from "react";
import {
  MoreHorizontal,
  Smile,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const postData = [
  {
    profileImage:
      "https://i.pinimg.com/736x/6a/c1/f8/6ac1f86b310a39559215d5b4439e2a39.jpg",
    userName: "chanelsoerholt",
    timePassedFromPost: "2d",
    caption: "just watching the sunset 🌅 what about u?",
    likeCount: 13458,
    commentCout: 1248,
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
    caption: "just watching the sunset 🌅 what about u?",
    likeCount: 13458,
    commentCout: 1248,
    postImages: [
      "https://i.pinimg.com/736x/50/c4/68/50c46853d24196c583a695b8f448f820.jpg",
      "https://i.pinimg.com/736x/0e/43/d5/0e43d5982749b83f8a688cf66185d5f4.jpg",
      "https://i.pinimg.com/736x/43/43/b1/4343b162a8a57d82b2d964f43e3bb9a1.jpg",
      "https://i.pinimg.com/736x/1d/c2/8b/1dc28bf3627cfa574220a62f1a99f3a8.jpg",
    ],
    isVerified: true,
  },
];

function Post() {
  const [carouselIndex, setCarouselIndex] = useState(
    Array(postData.length).fill(0)
  );
  const [direction, setDirection] = useState(
    Array(postData.length).fill("next")
  );

  const handleNext = (postIdx, totalImages) => {
    setCarouselIndex((prev) => {
      const updated = [...prev];
      updated[postIdx] = (updated[postIdx] + 1) % totalImages;
      return updated;
    });
    setDirection((prev) => {
      const updated = [...prev];
      updated[postIdx] = "next";
      return updated;
    });
  };

  const handlePrev = (postIdx, totalImages) => {
    setCarouselIndex((prev) => {
      const updated = [...prev];
      updated[postIdx] = (updated[postIdx] - 1 + totalImages) % totalImages;
      return updated;
    });
    setDirection((prev) => {
      const updated = [...prev];
      updated[postIdx] = "prev";
      return updated;
    });
  };

  return (
    <div className="space-y-5 ">
      {postData.map((elm, idx) => {
        const currentImage = elm.postImages[carouselIndex[idx]];

        return (
          <div
            key={idx}
            className=" max-w-lg mx-auto bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-300"
          >
            {/* post Header */}
            <div className="flex items-center justify-between py-3 ">
              <div className="flex items-center gap-3">
                <img
                  src={elm.profileImage}
                  className="h-10 w-10 rounded-full object-cover"
                  alt={elm.userName}
                />
                <div className="flex  gap-x-3">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <span>{elm.userName}</span>
                    {elm.isVerified && (
                      <CheckCircle className="text-blue-500 w-4 h-4" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {elm.timePassedFromPost} •{" "}
                    <span className="text-blue-500 font-medium cursor-pointer">
                      Follow
                    </span>
                  </div>
                </div>
              </div>
              <MoreHorizontal className="cursor-pointer text-black dark:text-white" />
            </div>

            {/* post body  */}
            <div className="relative overflow-hidden w-full h-[700px]">
              <img
                src={currentImage}
                alt="post"
                key={currentImage} // triggers re-render for transition
                className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
                  direction[idx] === "next"
                    ? "translate-x-0 animate-slide-in-right"
                    : "translate-x-0 animate-slide-in-left"
                }`}
              />

              {carouselIndex[idx] > 0 && (
                <button
                  onClick={() => handlePrev(idx, elm.postImages.length)}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>
              )}
              {carouselIndex[idx] < elm.postImages.length - 1 && (
                <button
                  onClick={() => handleNext(idx, elm.postImages.length)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              )}

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {elm.postImages.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`w-2 h-2 rounded-full ${
                      carouselIndex[idx] === dotIdx
                        ? "bg-black dark:bg-white opacity-80"
                        : "bg-black dark:bg-white opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* post Footer */}
            <div className="pb-4 text-sm">
              <div className="flex items-center justify-between py-2">
                <div className="flex gap-4">
                  <Heart className="w-5 h-5 cursor-pointer" />
                  <MessageCircle className="w-5 h-5 cursor-pointer" />
                  <Send className="w-5 h-5 cursor-pointer" />
                </div>
                <Bookmark className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="font-semibold mb-1">{elm.likeCount} likes</div>

              <div className="mb-1">
                <span className="font-semibold">{elm.userName} </span>
                <span>
                  {elm.caption}
                  <span className="text-gray-500 dark:text-gray-400 cursor-pointer">
                    {" "}
                    ... more
                  </span>
                </span>
              </div>

              <div className="text-gray-500 dark:text-gray-400 mb-2 cursor-pointer">
                View all {elm.commentCout} comments
              </div>

              <div className="flex items-center py-3 border-b border-gray-300 dark:border-gray-800 pt-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="bg-white dark:bg-black text-black dark:text-white flex-1 outline-none text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Smile className="text-gray-500 dark:text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
