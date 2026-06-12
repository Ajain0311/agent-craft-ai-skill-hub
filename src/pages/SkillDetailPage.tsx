import React from 'react';
import { useParams } from 'react-router-dom';

export const SkillDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Skill Detail Page</h1>
      <p className="text-lg text-gray-600">
        Details for skill ID: <span className="font-semibold text-indigo-600">{id || 'N/A'}</span>
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Skill Information</h2>
        <p className="text-gray-600">
          This page will display comprehensive details about a specific AI skill,
          including its prompts, parameters, and usage examples.
        </p>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Skill Name: Example Skill {id}
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Description: A detailed description of what this skill does.
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Prompts: Associated prompts and templates.
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-indigo-500">&#8226;</span> Version History: Track changes over time.
          </li>
        </ul>
      </div>
    </div>
  );
};
