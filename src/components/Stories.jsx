import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; // or any other icons
import axios from "axios";

const Stories = () => {
  // const storyList = [
  //   {
  //     name: "neha",
  //     img: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  //   },
  //   {
  //     name: "ram",
  //     img: "https://i.pinimg.com/736x/b5/35/2c/b5352cdb93b8a029f0b8e1feb7dfa47a.jpg",
  //   },
  //   {
  //     name: "rahul",
  //     img: "https://i.pinimg.com/736x/9e/8b/67/9e8b67dafcc95baf049aaee887ee29ab.jpg",
  //   },
  //   {
  //     name: "ravi",
  //     img: "https://i.pinimg.com/736x/42/7d/92/427d920e486106dc8c55faa2515bbc52.jpg",
  //   },
  //   {
  //     name: "soham",
  //     img: "https://i.pinimg.com/736x/93/d8/9c/93d89c743f7811926f573450de99afe1.jpg",
  //   },
  //   {
  //     name: "sona",
  //     img: "https://i.pinimg.com/736x/0f/5c/b4/0f5cb4eb274e9486660b0a10d0d6026b.jpg",
  //   },
  //   {
  //     name: "neha 2",
  //     img: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  //   },
  //   {
  //     name: "ram 2",
  //     img: "https://i.pinimg.com/736x/b5/35/2c/b5352cdb93b8a029f0b8e1feb7dfa47a.jpg",
  //   },
  // ];
  const [stories, setStories] = useState();
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:5000/api/stories").then((res) => {
      setStories(res.data);
    });
  }, []);

  const itemsPerPage = 6;

  const visibleStories = stories?.slice(startIndex, startIndex + itemsPerPage);
  const hasMoreRight = startIndex + itemsPerPage < stories?.length;
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

  return (
    <div className="relative flex items-center gap-4 py-5 ">
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
        {visibleStories?.map((elm, index) => (
          <div key={index} className="flex flex-col items-center w-[90px]">
            {/* Gradient ring wrapper */}
            <div className="w-[90px] h-[90px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-fuchsia-700">
              {/* Inner black circle */}
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                {/* Profile image */}
                <img
                  src={elm.img}
                  alt={elm.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="text-xs text-center mt-2 text-white truncate w-full">
              {elm.name}
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
