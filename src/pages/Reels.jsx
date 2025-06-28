import React, { useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  VolumeX,
  Music2,
  MoreVertical,
} from "lucide-react";

const reels = [
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "fontan_architecture",
    caption: "A shower bench isn’t just a luxury. It’s a must ...",
    music: "less.people - So Beautiful",
    likes: "1,030",
    comments: "10",
    profileImg:
      "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
  },
  // Add more reels as needed
];

const Reels = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll bg-black snap-y snap-mandatory">
      {reels.map((reel, index) => (
        <ReelCard reel={reel} key={index} />
      ))}
    </div>
  );
};

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center snap-start relative">
      <div className="relative h-full max-h-screen w-[400px] bg-black">
        {/* Video */}
        <video
          ref={videoRef}
          src={reel.src}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onClick={togglePlayback}
        />

        {/* Mute Icon */}
        <div className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full">
          <VolumeX className="w-5 h-5" />
        </div>

        {/* Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 text-white">
          <div className="flex flex-col items-center">
            <Heart className="w-6 h-6" />
            <span className="text-sm">{reel.likes}</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">{reel.comments}</span>
          </div>
          <Share2 className="w-6 h-6" />
          <Bookmark className="w-6 h-6" />
          <img
            src={reel.profileImg}
            alt="user"
            className="w-7 h-7 rounded-full mt-2"
          />
        </div>

        {/* Info */}
        <div className="absolute bottom-6 left-4 text-white w-[80%] text-sm space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={reel.profileImg}
              alt="user"
              className="w-7 h-7 rounded-full"
            />
            <span className="font-semibold">{reel.user}</span>
            <span className="text-gray-300 text-xs">• Follow</span>
          </div>
          <p className="line-clamp-2">
            {reel.caption} <span className="text-gray-400">more</span>
          </p>
          <div className="flex items-center gap-1 opacity-80">
            <Music2 className="w-4 h-4" />
            <span className="truncate">{reel.music}</span>
          </div>
        </div>

        {/* More icon */}
        <div className="absolute bottom-4 right-4 text-white">
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Reels;
