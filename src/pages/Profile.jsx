import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContentWrapper from "../components/MainContentWrapper";
import { MdVerified } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { BiSolidUserPin } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const { userId } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [logedInUserPost, setLoggedInUserPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followLoading, setFollowLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        { withCredentials: true }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLogedInUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/users/me`, {
        withCredentials: true,
      });
      console.log("Before state ", response.data.userPosts);

      setProfileData(response.data.user);
      setLoggedInUserPost(response.data.userPosts);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };
  console.log(profileData);

  useEffect(() => {
    if (userId) fetchUserData();
    else fetchLogedInUserData();
  }, [userId]);

  const handleFollowButtonClick = async () => {
    if (!profileData?._id) return;
    try {
      setFollowLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/users/${profileData._id}/follow`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message || "Follow status updated.");

      /**
       * ✅ Refetch the profile data cleanly after follow/unfollow,
       * ensuring updated followers count and isFollowing without affecting UI structure.
       */
      fetchUserData();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error toggling follow.");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <MainContentWrapper>
        <div className="text-center py-10 text-gray-400">
          Loading profile...
        </div>
      </MainContentWrapper>
    );
  }

  if (error) {
    return (
      <MainContentWrapper>
        <div className="text-center py-10 text-red-500">{error}</div>
      </MainContentWrapper>
    );
  }

  const postData = profileData?.posts || logedInUserPost;
  const profilePicUrl = profileData?.profilePic
    ? `http://localhost:5000/${profileData.profilePic.replace(/\\/g, "/")}`
    : "/default-profile.png";

  return (
    <MainContentWrapper>
      <div className="px-6 md:px-24 py-8 md:py-14">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="w-40 aspect-square border-4 overflow-hidden rounded-full p-1">
            <img
              src={profilePicUrl}
              alt="profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="md:ml-10 md:pl-10 w-full">
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="font-medium text-lg">
                {profileData?.username}
              </span>
              {profileData?.isVerified && (
                <MdVerified className="text-blue-600 text-2xl" />
              )}
              <button
                disabled={followLoading}
                className={`capitalize font-medium h-8 px-5 rounded-md ${
                  profileData?.isFollowing ? "bg-gray-500" : "bg-blue-500"
                }`}
                onClick={handleFollowButtonClick}
              >
                {followLoading
                  ? "Processing..."
                  : profileData?.isFollowing
                  ? "Following"
                  : "Follow"}
              </button>

              <button className="bg-[#25292e] capitalize font-medium h-8 px-5 rounded-md">
                message
              </button>
              <div className="bg-[#25292e] h-8 px-2.5 rounded-md flex items-center justify-center">
                <IoPersonAddSharp />
              </div>
              <IoIosMore className="text-2xl" />
            </div>

            <div className="flex gap-5 mt-5">
              <p className="font-thin">
                <span className="font-bold">{postData.length}</span> posts
              </p>
              <p className="font-thin">
                <span className="font-bold">
                  {profileData?.followersCount || 0}
                </span>{" "}
                followers
              </p>
              <p className="font-thin">
                <span className="font-bold">
                  {profileData?.followingCount || 0}
                </span>{" "}
                following
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">{profileData?.name}</h3>
              <div className="font-thin p-1">
                <p>Artist</p>
                <p>{profileData?.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-10">
          <div className="flex border-b pb-3 justify-around my-3">
            <IoMdGrid className="w-8 h-8 cursor-pointer" />
            <PiVideoFill className="w-8 h-8 cursor-pointer" />
            <BiSolidUserPin className="w-8 h-8 cursor-pointer" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {postData.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-10">
                No posts to display.
              </div>
            )}

            {postData.map((post) => {
              if (!post.media || post.media.length === 0) return null;

              const media = post.media[0];
              const mediaUrl = `http://localhost:5000/${media.url.replace(
                /\\/g,
                "/"
              )}`;

              return (
                <div
                  key={post._id}
                  className="w-full h-72 md:h-[430px] overflow-hidden relative"
                >
                  {media.type === "image" ? (
                    <img
                      src={mediaUrl}
                      alt="post"
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  ) : media.type === "video" ? (
                    <video
                      src={mediaUrl}
                      controls
                      muted
                      loop
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
}

export default Profile;
