import React, { useState } from "react";
import { FiUser, FiX, FiMaximize2 } from "react-icons/fi";
import { getFullName, getProfilePicture } from "../../utils/user.utils";
import type { UserProfile } from "../../types/user.types";

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const fullName = getFullName(user.firstName, user.lastName);
  const profilePicture = getProfilePicture(user.portfolio.document);

  const openImageModal = () => {
    if (profilePicture) {
      setIsImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <div className="flex items-start space-x-4">
        {/* Profile Picture - Clickable */}
        <div className="flex-shrink-0">
          {profilePicture ? (
            <button
              onClick={openImageModal}
              className="relative group focus:outline-none"
              aria-label="View profile picture in full screen cursor-pointer"
            >
              <img
                src={profilePicture.url}
                alt={fullName}
                className="w-16 h-16 rounded-full border border-gray-200 object-cover cursor-pointer transition-opacity group-hover:opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement
                    ?.querySelector(".fallback")
                    ?.classList.remove("hidden");
                }}
              />
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 rounded-full bg-black/20 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                <FiMaximize2 className="w-5 h-5 text-white" />
              </div>
            </button>
          ) : null}

          {/* Fallback Profile Icon (non-clickable) */}
          <div
            className={`w-16 h-16 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center ${profilePicture ? "hidden" : ""} fallback`}
          >
            <FiUser className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Name and Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-gray-900 capitalize">
                {fullName}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">@{user.nickName}</p>
            </div>
            {user.isSubscribed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Premium
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isImageModalOpen && profilePicture && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeImageModal}
        >
          {/* Close button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10 cursor-pointer"
            aria-label="Close full screen view"
          >
            <FiX className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={profilePicture.url}
              alt={`${fullName} - Profile Picture`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image info overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {fullName} • Profile Picture
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
