import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 wh-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"></div>
    </div>
  );
};

export default Loading;
