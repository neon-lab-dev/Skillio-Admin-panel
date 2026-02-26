// components/user/DocumentsSection.tsx
import React from 'react';
import { FiFile, FiImage, FiVideo } from 'react-icons/fi';
import type { Document } from '../../types/user.types';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const getIcon = () => {
    switch (document.type) {
      case 'IMAGE':
        return <FiImage className="w-5 h-5 text-blue-500" />;
      case 'VIDEO':
        return <FiVideo className="w-5 h-5 text-purple-500" />;
      default:
        return <FiFile className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <a
      href={document.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {document.fileName}
          </p>
          <p className="text-xs text-gray-500">
            {document.type} • {document.remarks}
          </p>
        </div>
      </div>
    </a>
  );
};

interface DocumentsSectionProps {
  title: string;
  documents: Document[];
  emptyMessage?: string;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  title,
  documents,
  emptyMessage = "No documents available"
}) => {
  if (documents.length === 0) {
    return (
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 italic">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
};