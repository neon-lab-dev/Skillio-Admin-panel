/* eslint-disable @typescript-eslint/no-explicit-any */
// types/user.types.ts
export interface THiringRate {
  id: string;
  hourlyPricing: string;
  dailyPricing: string;
  weeklyPricing: string;
  monthlyPricing: string;
  portfolioId: string;
}

export interface Document {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
  mimeType: string;
  remarks: string;
  type: 'PROFILE_PHOTO' | 'VIDEO' | 'IMAGE' | 'EVENT' | string;
  status: string;
  portfolioId: string;
}

export interface Portfolio {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  subCategory: string;
  proficiency: string;
  totalEvents: number;
  bio: string;
  profileId: string;
  follows: any | null;
  __hiringRate__: THiringRate;
  document: Document[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  nickName: string;
  groupName: string;
  isSubscribed: boolean;
  profileType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  portfolio: Portfolio;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: UserProfile;
}