import React from "react";
import { DefaultArt } from "../config/constants";
import useFollowButton from "../hooks/useFollowButton";
import useVerfiyButton from "../hooks/useVerifyButton";

function Profile({ postDetails }) {
  console.log("postDetails", postDetails);

  const { didFollow, follow } = useFollowButton(postDetails);

  return (
    <div className="profile-item w-full shadow-profile p-[14px] rounded-3xl  xl:max-h-[431px] lg:max-h-[376px] bg-white border border-solid border-opacity-10 border-white relative cursor-pointer transition ease-in hover:-translate-y-2">
      <div>
        <a
          href={`/profile/${postDetails.username}`}
          className="relative z-10 flex w-full mb-16 banner h-36 shadow-profile rounded-3xl"
        >
          <img
            className="object-cover w-full h-full rounded-3xl"
            src={postDetails.banner || DefaultArt}
            alt={"Banner"}
          />
          <div className="absolute left-0 right-0 flex m-auto overflow-auto rounded-full profile w-28 h-28 -bottom-14">
            <img src={postDetails.image} alt={"Profile"} />
          </div>
        </a>
        <div className="pt-1 text-center title-and-meta">
          <h3 className="text-base font-semibold  text-primaryBlack leading-[1.5]">
            {postDetails.fullname}
          </h3>
          <p className="flex items-center justify-center mb-3 text-sm font-semibold text-primaryBlack opacity-80">
            @{postDetails.username}

            {postDetails?.verified && (
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0d6efd"
                  className="verified"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                </svg>
              </span>
            )}
          </p>
          <div className="flex items-center justify-between meta-desc">
            <p className="text-[12px] text-black">
              <span className="font-bold">{postDetails?.recent?.length}</span>{" "}
              Creations
            </p>
            <p className="text-[12px] text-black">
              <span className="font-bold">{postDetails.follower}</span>{" "}
              Followers
            </p>
          </div>
          <div className="follow-btn">
            <button
              onClick={() => follow()}
              type="button"
              className="w-full text-black text-sm bg-[rgb(239,238,234)] mt-5 font-medium border-none h-10 rounded-full cursor-pointer transition ease-in hover:bg-primaryBlack hover:text-white"
            >
              {" "}
              {didFollow ? "Following" : "Follow"}
            </button>
          </div>

          {/* <div className="follow-btn">
            <button
              onClick={() => verify()}
              type="button"
              className="w-full text-black text-sm bg-[rgb(239,238,234)] mt-5 font-medium border-none h-10 rounded-full cursor-pointer transition ease-in hover:bg-primaryBlack hover:text-white"
            >
              {" "}
              {didVerify ? "UnVerify" : "Verify"}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
