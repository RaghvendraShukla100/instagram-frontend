import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if needed
          },
        });
        setStories(res.data.stories || []); // backend returns { stories: [...] }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const visibleStories = stories.slice(startIndex, startIndex + itemsPerPage);
  const hasMoreRight = startIndex + itemsPerPage < stories.length;
  const hasMoreLeft = startIndex > 0;

  const handleNext = () => {
    if (hasMoreRight) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (hasMoreLeft) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-5">Loading stories...</div>
    );
  }

  // console.log("stories data : ", stories[0]?.createdBy?.profilePic);

  return (
    <div className="relative flex items-center gap-4 py-5">
      {/* Left Arrow */}
      {hasMoreLeft && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2 z-10 hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Stories */}
      <div className="flex gap-4 overflow-x-hidden px-8">
        {visibleStories.map((story, index) => (
          <div
            key={story._id || index}
            className="flex flex-col items-center w-[90px]"
          >
            {/* Gradient ring wrapper */}
            <div className="w-[90px] h-[90px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-fuchsia-700">
              {/* Inner black circle */}
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                {/* Profile image */}
                <img
                  src={
                    stories?.createdBy?.profilePic
                      ? `http://localhost:5000/${stories.createdBy.profilePic.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "https://via.placeholder.com/90x90.png?text=Story"
                  }
                  alt={stories?.createdBy?.name || "Story"}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="text-xs text-center mt-2 text-white truncate w-full">
              {story.createdBy?.name || story.createdBy?.username || "User"}
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {hasMoreRight && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2 z-10 hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Stories;
