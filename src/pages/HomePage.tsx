import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to AgentCraft!</h1>
      <p className="text-lg text-gray-600">
        Your hub for crafting, organizing, and sharing AI agent skills.
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Quick Start</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Navigate to "Skills List" to see existing skills.</li>
          <li>Click "New Skill" to create a new AI agent skill.</li>
          <li>Explore the sidebar for more options.</li>
        </ul>
      </div>
    </div>
  );
};
