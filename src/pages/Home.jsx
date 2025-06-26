import React from "react";
import FollowList from "../components/FollowList";
import MainContentWrapper from "../components/MainContentWrapper";
import Post from "../components/post";
import UserSuggestions from "../components/UserSuggestions";

function Home() {
  return (
    <MainContentWrapper>
      <div className="flex w-full h-full">
        {/* Left Section: 65% */}
        <div className="w-[65%] px-5   overflow-clip ">
          <FollowList />
          <Post />
        </div>

        {/* Right Section: 35% */}
        <div className="w-[35%]  text-white p-4">
          <UserSuggestions />
        </div>
      </div>
    </MainContentWrapper>
  );
}

export default Home;
