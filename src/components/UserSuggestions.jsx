import { useEffect, useState } from "react";
import axios from "axios";

const UserSuggestions = () => {
  const [user, setUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      });
      console.log(response.data);

      setUser(response?.data.user); // ensure backend sends { user }
      setSuggestedUsers(response?.data.secondDegreeUsers || []);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load user suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleFollow = async (targetUserId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/toggle-follow/${targetUserId}`,
        {},
        { withCredentials: true }
      );

      // Update the UI to reflect follow state without reload
      setSuggestedUsers((prev) =>
        prev.map((user) =>
          user._id === targetUserId ? { ...user, isFollowing: true } : user
        )
      );
    } catch (err) {
      console.error("Error following user:", err);
      alert("Error following user.");
    }
  };

  if (loading) {
    return (
      <div className="w-full px-5 max-w-sm text-sm text-gray-400">
        Loading suggestions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-5 max-w-sm text-sm text-red-400">{error}</div>
    );
  }

  return (
    <div className="w-full px-5 max-w-sm text-sm text-gray-400 space-y-4">
      {/* Current User Section */}
      <div className="flex justify-between  items-center">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.profilePic
                ? `http://localhost:5000/${user.profilePic.replace(/\\/g, "/")}`
                : "/default-profile.png"
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-white">{user?.username}</div>
            <div className="text-xs">{user?.name}</div>
          </div>
        </div>
        <button className="text-blue-500 font-semibold text-xs">Switch</button>
      </div>

      {/* Suggestions Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-400">
          Suggested for you
        </span>
        <button className="text-white text-xs font-semibold">See All</button>
      </div>

      {/* Suggested Users List */}
      <div className="space-y-3 p-2 rounded-md">
        {suggestedUsers.length === 0 && (
          <div className="text-center text-xs text-gray-500">
            No suggestions available.
          </div>
        )}
        {suggestedUsers.map((elm) => (
          <div key={elm._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={
                  elm?.profilePic
                    ? `http://localhost:5000/${elm.profilePic.replace(
                        /\\/g,
                        "/"
                      )}`
                    : elm?.img || "/default-profile.png"
                }
                alt={elm?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-white text-sm font-semibold">
                  {elm?.username}
                </div>
                <div className="text-xs text-gray-400">
                  {elm?.name || "Suggested for you"}
                </div>
              </div>
            </div>
            {elm.isFollowing ? (
              <button
                disabled
                className="text-gray-500 font-semibold text-xs cursor-not-allowed"
              >
                Following
              </button>
            ) : (
              <button
                onClick={() => handleFollow(elm._id)}
                className="text-blue-500 font-semibold text-xs hover:text-blue-400 transition"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="text-[11px] leading-5 text-gray-500 mt-6 flex flex-wrap gap-x-2 gap-y-1">
        {[
          "About",
          "Help",
          "Press",
          "API",
          "Jobs",
          "Privacy",
          "Terms",
          "Locations",
          "Language",
          "Meta Verified",
        ].map((link, index) => (
          <a key={index} href="#" className="hover:underline">
            {link}
          </a>
        ))}
        <p className="text-xs w-full mt-2">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default UserSuggestions;
