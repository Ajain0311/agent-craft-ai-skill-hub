import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SkillForm, { SkillFormInputs } from '../components/forms/SkillForm';
import { useSkillStore } from '../store/skillStore';

const EditSkillPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const getSkillById = useSkillStore((state) => state.getSkillById);
  const updateSkill = useSkillStore((state) => state.updateSkill);
  const [isLoading, setIsLoading] = useState(false);

  const skillToEdit = skillId ? getSkillById(skillId) : undefined;

  const initialData: SkillFormInputs | undefined = skillToEdit
    ? {
        id: skillToEdit.id,
        name: skillToEdit.name,
        description: skillToEdit.description,
        prompt: skillToEdit.prompt,
        tags: skillToEdit.tags,
        isPublic: skillToEdit.isPublic ?? false,
      }
    : undefined;

  const handleSubmit = async (data: SkillFormInputs) => {
    if (!skillId) return;
    setIsLoading(true);
    try {
      updateSkill(skillId, {
        name: data.name,
        description: data.description,
        prompt: data.prompt,
        tags: data.tags ?? [],
        isPublic: data.isPublic,
      });
      navigate(`/skills/${skillId}`);
    } catch (error) {
      console.error('Failed to update skill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!skillId) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">No skill ID provided for editing.</p>
      </div>
    );
  }

  if (!skillToEdit) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Skill Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">The skill you are trying to edit does not exist.</p>
        <button
          onClick={() => navigate('/skills')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go to Skills List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
        Edit Skill: {skillToEdit.name}
      </h1>
      <SkillForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/skills/${skillId}`)}
        isEditing={true}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditSkillPage;
