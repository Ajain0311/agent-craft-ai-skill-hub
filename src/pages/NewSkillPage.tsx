import React from 'react';

export const NewSkillPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New AI Skill</h1>
      <p className="text-lg text-gray-600">
        Define and configure a new AI agent skill for your team.
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Skill Creation Form</h2>
        <p className="text-gray-600">
          This page will contain a form to create a new AI skill.
          Fields might include: Skill Name, Description, Prompt Template, Parameters, etc.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
              Skill Name
            </label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="e.g., Summarize Document, Generate Code"
              aria-label="Skill Name"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Provide a brief description of what this skill does."
              aria-label="Skill Description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Skill
          </button>
        </form>
      </div>
    </div>
  );
};
