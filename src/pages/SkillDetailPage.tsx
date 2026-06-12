import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSkillStore } from '../store/skillStore'; // Assuming this path and structure
import SkillDetailContent from '../components/skills/SkillDetailContent';

const SkillDetailPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const fetchSkills = useSkillStore((state) => state.fetchSkills);
  const getSkillById = useSkillStore((state) => state.getSkillById);
  const allSkills = useSkillStore((state) => state.skills); // To check if skills are loaded
  const storeIsLoading = useSkillStore((state) => state.isLoading);

  const [skill, setSkill] = useState(getSkillById(skillId || '') || null);
  const [isLoading, setIsLoading] = useState(true); // Local loading state for the page
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkill = async () => {
      setIsLoading(true);
      setError(null);
      if (allSkills.length === 0 && !storeIsLoading) {
        // If skills are not loaded yet, fetch them
        await fetchSkills();
      }
      // After fetching (or if already fetched), try to get the skill
      const foundSkill = getSkillById(skillId || '');
      if (foundSkill) {
        setSkill(foundSkill);
      } else if (skillId) {
        // If skillId exists but skill not found after fetch, it's a 404
        setSkill(null);
        setError('Skill not found.');
      }
      setIsLoading(false);
    };

    loadSkill();
  }, [skillId, fetchSkills, getSkillById, allSkills.length, storeIsLoading]);

  // If skillId is undefined (e.g., malformed URL), handle it
  if (!skillId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Invalid Skill ID</h2>
          <p className="mb-4">No skill ID was provided in the URL.</p>
          <Link to="/skills" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/skills" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Skills
        </Link>
      </div>

      {error && !isLoading && (
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md text-center mb-6">
          <p>{error}</p>
        </div>
      )}

      <SkillDetailContent skill={skill} isLoading={isLoading} />
    </div>
  );
};

export default SkillDetailPage;
