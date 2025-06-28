import React from "react";
import MainContentWrapper from "../components/MainContentWrapper";
import { MdVerified } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { GiQueenCrown } from "react-icons/gi";

function profile() {
  return (
    <MainContentWrapper>
      <div className="px-24 py-14">
        {/* profile section of profile */}
        <div className="border flex ">
          <div className="w-36 h-36 border-4 rounded-full p-1">
            <img
              src="https://i.pinimg.com/736x/5b/ef/40/5bef403b6dd495cc21c97189e49c0b5a.jpg"
              alt="profile image"
              className="rounded-full h-full w-full object-cover"
            />
          </div>
          <div className=" ml-10 pl-10 ">
            <div className=" flex items-center gap-x-3  mt-2">
              <span className="font-medium">prakritipavani</span>
              <MdVerified className="text-blue-600 text-2xl" />

              <button className="bg-[#25292e] capitalize font-medium h-8 px-5 rounded-md">
                follow
              </button>
              <button className="bg-[#25292e] capitalize font-medium h-8 px-5 rounded-md">
                message
              </button>
              <div className="bg-[#25292e] h-8 px-2.5 rounded-md flex items-center justify-center">
                <IoPersonAddSharp />
              </div>

              <IoIosMore className="text-2xl" />
            </div>
            <div className="flex gap-5  mt-5">
              <p className="font-thin">
                <span className="font-bold">790 </span> posts
              </p>
              <p className="font-thin">
                <span className="font-bold">1.1M </span> followers
              </p>
              <p className="font-thin">
                <span className="font-bold">507 </span> followings
              </p>
            </div>
            <div>
              <div className="flex gap-4 items-center mt-4">
                <h3 className="font-medium ">Prakriti pavani</h3>
                <GiQueenCrown />
              </div>
              <div className="font-thin p-1">
                <p>Artist</p>
                <p>
                  dreamer 💭 // Aspirations higher than the Empire State
                  Building // socially exclusive
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* story section of profile */}
        <div>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        {/* post section of profile*/}
        <div>
          <div>post, reels, tags</div>
          {/* all post will be visible here */}
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
}

export default profile;
