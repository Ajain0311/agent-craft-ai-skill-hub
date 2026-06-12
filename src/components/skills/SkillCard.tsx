import React from 'react';
import { Sparkles, User, Calendar, Tag as TagIcon } from 'lucide-react';
import { Skill, SkillTag } from '../../store/skillStore';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(skill.createdAt));

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Sparkles className="mr-2 inline-block h-5 w-5 text-indigo-500" aria-hidden="true" />
          {skill.name}
        </h3>
        {skill.isPublic ? (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Public
          </span>
        ) : (
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Private
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {skill.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {skill.tags.map((tag: SkillTag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
          >
            <TagIcon className="h-3 w-3" aria-hidden="true" />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" aria-hidden="true" />
          <span>{skill.authorId}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
