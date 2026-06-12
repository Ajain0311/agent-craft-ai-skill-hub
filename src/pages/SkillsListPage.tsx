import React, { useState, useMemo } from 'react';
import { useSkillStore, Skill, SkillTag } from '../store/skillStore';
import SearchBar from '../components/common/SearchBar';
import TagFilter from '../components/common/TagFilter';
import SkillCard from '../components/skills/SkillCard';
import { Frown } from 'lucide-react';

const SkillsListPage: React.FC = () => {
  const allSkills = useSkillStore((state) => state.skills);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<SkillTag[]>([]);

  const availableTags: SkillTag[] = useMemo(() => {
    const tags = new Set<SkillTag>();
    allSkills.forEach((skill) => {
      skill.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allSkills]);

  const filteredSkills = useMemo(() => {
    let filtered = allSkills;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          skill.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((skill) =>
        selectedTags.some((selectedTag) => skill.tags.includes(selectedTag))
      );
    }

    return filtered;
  }, [allSkills, searchTerm, selectedTags]);

  const handleTagToggle = (tag: SkillTag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        AI Skills Hub
      </h1>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-grow">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search skills by name or description..."
            className="w-full"
          />
        </div>
        {availableTags.length > 0 && (
          <div className="md:w-auto">
            <TagFilter
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>
        )}
      </div>

      <div
        className="mb-4 text-sm text-gray-600 dark:text-gray-300"
        role="status"
        aria-live="polite"
      >
        {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
      </div>

      {filteredSkills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <Frown className="mb-4 h-16 w-16" aria-hidden="true" />
          <p className="text-lg font-medium">No skills found matching your criteria.</p>
          <p className="text-sm">Try adjusting your search term or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsListPage;
