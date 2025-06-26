import React from "react";
import FollowList from "../components/FollowList";
import MainContentWrapper from "../components/MainContentWrapper";

function Home() {
  return (
    <MainContentWrapper>
      <div className="flex w-full h-full">
        {/* Left Section: 65% */}
        <div className="w-[65%] px-5   overflow-clip ">
          <FollowList />
        </div>

        {/* Right Section: 35% */}
        <div className="w-[35%] bg-gray-900 text-white p-4">
          <p>Main Right Content</p>
        </div>
      </div>
    </MainContentWrapper>
  );
}

export default Home;
