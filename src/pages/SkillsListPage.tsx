import React from 'react';

export const SkillsListPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Skills List</h1>
      <p className="text-lg text-gray-600">
        Browse and manage all available AI agent skills.
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Coming Soon</h2>
        <p className="text-gray-600">
          This page will display a list of all crafted AI skills.
        </p>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Search and filter skills
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> View skill details
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Edit and delete skills
          </li>
        </ul>
      </div>
    </div>
  );
};
