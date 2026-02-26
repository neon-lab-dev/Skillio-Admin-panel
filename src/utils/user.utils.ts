// utils/user.utils.ts

import type { Document } from "../types/user.types";

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const getProfilePicture = (documents: Document[]): Document | undefined => {
  return documents.find(doc => doc.type === 'PROFILE_PHOTO');
};

export const getEventDocuments = (documents: Document[]): Document[] => {
  return documents.filter(doc => doc.type === 'EVENT');
};

export const getMediaDocuments = (documents: Document[]): Document[] => {
  return documents.filter(doc => doc.type === 'IMAGE' || doc.type === 'VIDEO');
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatCurrency = (amount: string): string => {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};