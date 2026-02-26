// components/user/PersonalInfo.tsx
import React from 'react';
import { 
  FiCreditCard, 
  FiCalendar, 
  FiUser, 
  FiBriefcase, 
  FiStar, 
  FiActivity,
  FiHash 
} from 'react-icons/fi';
import { formatDate } from '../../utils/user.utils';
import type { UserProfile } from '../../types/user.types';

interface PersonalInfoProps {
  user: UserProfile;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const getProficiencyBadge = (proficiency: string) => {
    const colors = {
      'PROFESSIONAL': 'bg-purple-100 text-purple-800',
      'AMATEUR': 'bg-blue-100 text-blue-800',
      'BEGINNER': 'bg-green-100 text-green-800',
      'EXPERT': 'bg-orange-100 text-orange-800'
    };
    
    const color = colors[proficiency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {proficiency}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Portfolio ID */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiCreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Portfolio ID</p>
          <p className="text-sm font-mono text-gray-900 break-all">
            {user.portfolio.id}
          </p>
        </div>
      </div>

      {/* Profile Type */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiUser className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Profile Type</p>
          <p className="text-sm text-gray-900">{user.profileType}</p>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiBriefcase className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Category</p>
          <p className="text-sm text-gray-900">{user.portfolio.category}</p>
        </div>
      </div>

      {/* Sub Category */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiBriefcase className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Sub Category</p>
          <p className="text-sm text-gray-900">{user.portfolio.subCategory}</p>
        </div>
      </div>

      {/* Proficiency */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiStar className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Proficiency</p>
          <div className="mt-1">
            {getProficiencyBadge(user.portfolio.proficiency)}
          </div>
        </div>
      </div>

      {/* Total Events */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiActivity className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Total Events</p>
          <p className="text-sm text-gray-900">{user.portfolio.totalEvents} events</p>
        </div>
      </div>

      {/* Profile ID */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiHash className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Profile ID</p>
          <p className="text-sm font-mono text-gray-900 break-all">
            {user.portfolio.profileId}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiCalendar className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Account Status</p>
          <p className="text-sm text-gray-900">{user.status}</p>
        </div>
      </div>

      {/* Portfolio Created */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiCalendar className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Portfolio Created</p>
          <p className="text-sm text-gray-900">
            {formatDate(user.portfolio.createdAt)}
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-start">
        <div className="w-8 flex-shrink-0">
          <FiCalendar className="w-4 h-4 text-gray-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">Last Updated</p>
          <p className="text-sm text-gray-900">
            {formatDate(user.portfolio.updatedAt)}
          </p>
        </div>
      </div>

      {/* Follows Status */}
      {user.portfolio.follows && (
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0">
            <FiUser className="w-4 h-4 text-gray-400 mt-0.5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Follows</p>
            <p className="text-sm text-gray-900">{user.portfolio.follows}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;