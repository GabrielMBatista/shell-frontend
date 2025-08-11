import React from 'react';

interface HighlightWrapperProps {
  dataGabsText?: string;
  children: React.ReactNode;
  isDark?: boolean;
}

export default function HighlightWrapper({
  dataGabsText,
  children,
  isDark = false,
}: HighlightWrapperProps) {
  return (
    <div
      data-gabs={dataGabsText}
      className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
      }`}
    >
      {children}
    </div>
  );
}
