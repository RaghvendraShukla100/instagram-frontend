import React from "react";
import {
  MoreHorizontal,
  Smile,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  CheckCircle,
} from "lucide-react";

function Post() {
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between  py-3">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/6a/c1/f8/6ac1f86b310a39559215d5b4439e2a39.jpg"
            className="h-10 w-10 rounded-full object-cover"
            alt="profile"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <span>chanelsoerholt</span>
              <CheckCircle className="text-blue-500 w-4 h-4" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              4 d •{" "}
              <span className="text-blue-500 font-medium cursor-pointer">
                Follow
              </span>
            </div>
          </div>
        </div>
        <MoreHorizontal className="cursor-pointer text-black dark:text-white" />
      </div>

      {/* Post Image */}
      <div>
        <img
          src="https://i.pinimg.com/736x/e4/f1/78/e4f1789093712c9f24c842e7287ff08e.jpg"
          alt="post"
          className="w-full"
        />
        {/* Carousel indicator dots */}
        <div className="flex justify-center py-2 space-x-1">
          <div className="w-2 h-2 rounded-full bg-black dark:bg-white opacity-70" />
          <div className="w-2 h-2 rounded-full bg-black dark:bg-white opacity-30" />
        </div>
      </div>

      {/* Post Footer */}
      <div className="pb-4 text-sm">
        {/* Icons Row */}
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-4">
            <Heart className="w-5 h-5 cursor-pointer" />
            <MessageCircle className="w-5 h-5 cursor-pointer" />
            <Send className="w-5 h-5 cursor-pointer" />
          </div>
          <Bookmark className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Likes */}
        <div className="font-semibold mb-1">10,282 likes</div>

        {/* Caption */}
        <div className="mb-1">
          <span className="font-semibold">chanelsoerholt </span>
          <span>
            just watching the sunset 🌅 what about u?{" "}
            <span className="text-gray-500 dark:text-gray-400 cursor-pointer">
              ... more
            </span>
          </span>
        </div>

        {/* Comments */}
        <div className="text-gray-500 dark:text-gray-400 mb-2 cursor-pointer">
          View all 145 comments
        </div>

        {/* Add Comment */}
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
}

export default Post;
