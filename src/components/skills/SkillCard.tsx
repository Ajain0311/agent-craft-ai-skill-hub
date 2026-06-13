import React from 'react';
import { Link } from 'react-router-dom';
import { formatSkillDate } from '../../utils/dateHelpers';
import { Skill } from '../../store/skillStore'; // Assuming Skill type exists
import { Calendar, RotateCcw } from 'lucide-react'; // Import icons

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      to={`/skills/${skill.id}`}
      className="block group relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`View details for skill: ${skill.name}`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
          {skill.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {skill.description || 'No description provided.'}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {skill.tags && skill.tags.length > 0 ? (
            skill.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              No Tags
            </span>
          )}
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <span className="sr-only">Created on:</span>
            <Calendar className="h-4 w-4 text-gray-400" />
            {formatSkillDate(skill.createdAt)}
          </span>
          {skill.updatedAt && skill.updatedAt !== skill.createdAt && (
            <span className="flex items-center gap-1 ml-auto">
              <span className="sr-only">Last updated on:</span>
              <RotateCcw className="h-4 w-4 text-gray-400" />
              {formatSkillDate(skill.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
