import React from "react";

const suggestedUsers = [
  {
    username: "vivek_pandey002",
    suggestion: "Suggested for you",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    username: "sunita_tiwari_1982",
    suggestion: "Suggested for you",
    img: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    username: "alok_12__tiwari",
    suggestion: "Suggested for you",
    img: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    username: "diaagupta_",
    suggestion: "Followed by guess_who_7",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    username: "ravipandey334",
    suggestion: "Suggested for you",
    img: "https://randomuser.me/api/portraits/men/24.jpg",
  },
];

const UserSuggestions = () => {
  return (
    <div className="w-full max-w-sm text-sm text-gray-400 space-y-4">
      {/* Current User Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-white">raghvendrashukla687</div>
            <div className="text-xs">Raghvendra shukla</div>
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
      <div className="space-y-3">
        {suggestedUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.img}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-white text-sm font-semibold">
                  {user.username}
                </div>
                <div className="text-xs text-gray-400">{user.suggestion}</div>
              </div>
            </div>
            <button className="text-blue-500 font-semibold text-xs">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links (as anchor tags) */}
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
