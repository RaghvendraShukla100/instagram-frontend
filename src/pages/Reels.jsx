import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  VolumeX,
  Volume2,
  Music2,
  MoreVertical,
} from "lucide-react";

const Reels = () => {
  const [reelsData, setReelsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleFollowClick = async (creatorId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${creatorId}/follow`,
        {},
        { withCredentials: true }
      );
      setReelsData((prev) =>
        prev.map((reel) =>
          reel.creatorId === creatorId
            ? {
                ...reel,
                isFollowedByCurrentUser: !reel.isFollowedByCurrentUser,
              }
            : reel
        )
      );
    } catch (err) {
      console.error("Follow toggle error:", err);
    }
  };

  console.log(reelsData);

  const handleSave = async (postId) => {
    setReelsData((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, isSavedByCurrentUser: !p.isSavedByCurrentUser }
          : p
      )
    );

    try {
      const post = reelsData.find((p) => p._id === postId);
      if (!post.isSavedByCurrentUser) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/saves/${postId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/saves/${postId}`,
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error("Save toggle error:", err);
    }
  };

  const observer = useRef();
  const lastReelRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/reels?page=${page}`,
          { withCredentials: true }
        );

        setReelsData((prev) => {
          const existingIds = new Set(prev.map((r) => r._id));
          const newReels = response.data.reels.filter(
            (r) => !existingIds.has(r._id)
          );
          return [...prev, ...newReels];
        });

        if (response.data.reels.length < 10) setHasMore(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReels();
  }, [page]);

  const toggleGlobalMute = () => setIsMuted((prev) => !prev);

  return (
    <div className="h-screen w-full overflow-y-scroll bg-black snap-y snap-mandatory">
      {reelsData.map((reel, index) => (
        <ReelCard
          key={reel._id || index}
          reel={reel}
          isMuted={isMuted}
          toggleGlobalMute={toggleGlobalMute}
          handleToggleFollowClick={handleToggleFollowClick}
          handleSave={handleSave}
          refProp={index === reelsData.length - 1 ? lastReelRef : null}
        />
      ))}
    </div>
  );
};

const ReelCard = ({
  reel,
  isMuted,
  toggleGlobalMute,
  handleToggleFollowClick,
  handleSave,
  refProp,
}) => {
  const videoRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) videoRef.current.play();
      else videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={refProp}
      className="h-screen w-full flex justify-center items-center snap-start relative"
    >
      <div className="relative h-full max-h-screen w-[400px] bg-black">
        <video
          ref={videoRef}
          src={`${import.meta.env.VITE_BACKEND_URL}/${
            reel.media.find((m) => m.type === "video")?.url
          }`}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        <button
          onClick={toggleGlobalMute}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 text-white">
          <button className={reel.isLikedByCurrentUser ? "text-red-500" : ""}>
            <Heart className="w-6 h-6" />
          </button>
          <button>
            <MessageCircle className="w-6 h-6" />
          </button>
          <button>
            <Share2 className="w-6 h-6" />
          </button>

          {/* ✅ Bookmark toggle with instant UI feedback */}
          <Bookmark
            onClick={() => handleSave(reel._id)}
            className={`w-6 h-6 cursor-pointer ${
              reel.isSavedByCurrentUser
                ? "text-white fill-gray-50"
                : "text-white"
            }`}
          />
        </div>

        <div className="absolute bottom-6 left-4 text-white w-[80%] text-sm space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                reel.creatorProfilePic
              }`}
              alt="user"
              className="w-7 h-7 rounded-full"
            />
            <span className="font-semibold">{reel.creatorUsername}</span>
            <span
              className="text-blue-400 text-xs cursor-pointer"
              onClick={() => handleToggleFollowClick(reel.creatorId)}
            >
              {reel.isFollowedByCurrentUser ? "• Following" : "• Follow"}
            </span>
          </div>
          <p className="line-clamp-2">
            {reel.caption} <span className="text-gray-400">more</span>
          </p>
          <div className="flex items-center gap-1 opacity-80">
            <Music2 className="w-4 h-4" />
            <span className="truncate">Original Audio</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-white">
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Reels;
