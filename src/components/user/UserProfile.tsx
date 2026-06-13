import React from 'react';
import { useUserStore } from '../../store/useUserStore';

export const UserProfile: React.FC = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="p-4 text-center text-gray-500">
        No user logged in.
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg shadow-md">
      {currentUser.avatarUrl ? (
        <img
          src={currentUser.avatarUrl}
          alt={`${currentUser.name}'s avatar`}
          className="h-10 w-10 rounded-full object-cover border-2 border-purple-500"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-lg">{currentUser.name}</span>
        <span className="text-gray-400 text-sm">{currentUser.email}</span>
      </div>
    </div>
  );
};
