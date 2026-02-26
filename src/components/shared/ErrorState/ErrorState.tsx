import React from 'react';
import { FiXCircle } from 'react-icons/fi';

interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "Unable to fetch user details. Please try again." 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center max-w-md">
        <FiXCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-lg font-medium text-gray-900 mt-3">
          Error Loading Profile
        </h2>
        <p className="text-sm text-gray-500 mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;