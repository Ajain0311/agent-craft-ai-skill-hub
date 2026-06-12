import React from 'react';
import { Tag } from 'lucide-react';
import { SkillTag } from '../../store/skillStore';

interface TagFilterProps {
  availableTags: SkillTag[];
  selectedTags: SkillTag[];
  onTagToggle: (tag: SkillTag) => void;
  className?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({ availableTags, selectedTags, onTagToggle, className }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`} role="group" aria-label="Filter by tags">
      {availableTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ease-in-out
              ${isSelected
                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            aria-pressed={isSelected}
          >
            <Tag className="h-4 w-4" aria-hidden="true" />
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;
