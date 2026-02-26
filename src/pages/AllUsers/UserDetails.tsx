// UserDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUserByIdQuery } from "../../redux/Features/Auth/authApi";
import Loader from "../../components/shared/Loader/Loader";
import ErrorState from "../../components/shared/ErrorState/ErrorState";
import { getEventDocuments, getMediaDocuments } from "../../utils/user.utils";
import ProfileHeader from "../../components/AllUsersPage/ProfileHeader";
import Bio from "../../components/AllUsersPage/Bio";
import PersonalInfo from "../../components/AllUsersPage/PersonalInfo";
import { DocumentsSection } from "../../components/AllUsersPage/DocumentsSection";
import { FiArrowLeft } from "react-icons/fi";
import HiringRate from "../../components/AllUsersPage/HiringRate";

// Components

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleUserByIdQuery(id);

  if (isLoading) {
    return <Loader size="size-20" />;
  }

  if (error || !data?.data) {
    return <ErrorState />;
  }

  const userData = data.data;
  const eventDocuments = getEventDocuments(userData.portfolio.document);
  const mediaDocuments = getMediaDocuments(userData.portfolio.document);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Simple Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              Profile Information
            </h2>
          </div>

          <div className="px-6 py-5">
            {/* Profile Header */}
            <ProfileHeader user={userData} />

            {/* Bio Section */}
            <Bio bio={userData.portfolio.bio} />

            {/* Personal Information */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Personal Information
              </h3>
              <PersonalInfo user={userData} />
            </div>

            {/* Hiring Rate Section */}
            {userData.portfolio.__hiringRate__ && (
              <HiringRate hiringRate={userData.portfolio.__hiringRate__} />
            )}

            {/* Event Documents Section */}
            <DocumentsSection
              title="Event Documents"
              documents={eventDocuments}
              emptyMessage="No event documents available"
            />

            {/* Media Documents Section */}
            <DocumentsSection
              title="Portfolio Media"
              documents={mediaDocuments}
              emptyMessage="No media documents available"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
