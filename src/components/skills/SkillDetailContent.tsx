import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, User, Calendar, Clock, ArrowLeft } from 'lucide-react';
import MarkdownRenderer from '../common/MarkdownRenderer';
import { Skill } from '../../store/skillStore'; // Assuming Skill type is exported from here

interface SkillDetailContentProps {
  skill: Skill | null;
  isLoading: boolean;
}

const SkillDetailContent: React.FC<SkillDetailContentProps> = ({ skill, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <div className="h-4 w-24 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <div className="h-4 w-24 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Skill Not Found</h2>
        <p className="mb-4">The skill you are looking for does not exist or has been removed.</p>
        <Link to="/skills" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Skills
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{skill.name}</h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1 text-gray-500" />
          <span>{skill.author}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
          <span>Created: {formatDate(skill.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span>Updated: {formatDate(skill.updatedAt)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Description</h2>
      <MarkdownRenderer markdown={skill.description} className="text-gray-700" />

      {/* Add more sections here as needed, e.g., Parameters, Usage, Examples */}

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Run Skill
        </button>
      </div>
    </div>
  );
};

export default SkillDetailContent;
