import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillForm, SkillFormData } from '../components/forms/SkillForm';
import { useSkillStore } from '../store/skillStore'; // Adjust path as necessary

export const NewSkillPage: React.FC = () => {
  const navigate = useNavigate();
  const addSkill = useSkillStore((state) => state.addSkill);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: SkillFormData) => {
    setIsSubmitting(true);
    try {
      // The addSkill action in Zustand is assumed to handle ID and timestamp generation
      addSkill(data);
      // Navigate to the skills list after successful submission
      navigate('/skills'); // Assuming '/skills' is the list page
    } catch (error) {
      console.error('Failed to add skill:', error);
      // In a real application, you might show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Create New AI Skill</h1>
      <SkillForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};
