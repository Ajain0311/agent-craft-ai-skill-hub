import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Assuming Tag type exists from previous tasks or is defined globally
interface Tag {
  id: string;
  name: string;
}

// Define the schema for a skill form
const skillFormSchema = z.object({
  id: z.string().optional(), // For editing existing skills
  name: z.string().min(3, 'Skill name must be at least 3 characters').max(100, 'Skill name cannot exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description cannot exceed 500 characters'),
  prompt: z.string().min(20, 'Prompt must be at least 20 characters'),
  tags: z.array(z.string()).optional(), // Array of tag IDs or names
  isPublic: z.boolean().default(false), // New field for sharing status
  // Add other fields like `category`, `version`, `authorId` etc. as needed
});

export type SkillFormInputs = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  initialData?: SkillFormInputs;
  onSubmit: (data: SkillFormInputs) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SkillForm: React.FC<SkillFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SkillFormInputs>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      prompt: '',
      tags: [],
      isPublic: false, // Default to private
    },
  });

  const watchedIsPublic = watch('isPublic');

  // Mock tags for selection (assuming a tag management system)
  const availableTags: Tag[] = [
    { id: 'tag-1', name: 'Productivity' },
    { id: 'tag-2', name: 'Marketing' },
    { id: 'tag-3', name: 'Development' },
    { id: 'tag-4', name: 'Customer Support' },
    { id: 'tag-5', name: 'Data Analysis' },
  ];

  const handleTagChange = (tagId: string, isChecked: boolean) => {
    const currentTags = initialData?.tags || [];
    if (isChecked) {
      setValue('tags', [...currentTags, tagId]);
    } else {
      setValue('tags', currentTags.filter((tag) => tag !== tagId));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">
        {initialData?.id ? 'Edit Skill' : 'Create New Skill'}
      </h2>

      {/* Skill Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Skill Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="e.g., Summarize Document"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby="name-error"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-y"
          placeholder="A brief explanation of what this skill does and how to use it."
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-describedby="description-error"
        ></textarea>
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Prompt */}
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
          Core Prompt
        </label>
        <textarea
          id="prompt"
          {...register('prompt')}
          rows={8}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-y"
          placeholder="Write the detailed prompt for the AI agent here. Use placeholders like {{input}}."
          aria-invalid={errors.prompt ? 'true' : 'false'}
          aria-describedby="prompt-error"
        ></textarea>
        {errors.prompt && (
          <p id="prompt-error" className="mt-1 text-sm text-red-400">
            {errors.prompt.message}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                value={tag.id}
                checked={initialData?.tags?.includes(tag.id) || false} // Check if tag is in initialData
                onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-300 cursor-pointer">
                {tag.name}
              </label>
            </div>
          ))}
        </div>
        {errors.tags && (
          <p className="mt-1 text-sm text-red-400">
            {errors.tags.message}
          </p>
        )}
      </div>

      {/* Public/Private Toggle */}
      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
        <label htmlFor="isPublic" className="flex flex-col cursor-pointer">
          <span className="text-sm font-medium text-gray-300">Sharing Status</span>
          <span className="text-xs text-gray-400 mt-1">
            {watchedIsPublic ? 'Public: Visible to everyone' : 'Private: Visible only to you and your team'}
          </span>
        </label>
        <div className="relative inline-block w-10 h-6 select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id="isPublic"
            {...register('isPublic')}
            className="peer sr-only" // sr-only hides the actual checkbox visually but keeps it accessible
            aria-checked={watchedIsPublic}
            role="switch"
          />
          <div className="block bg-gray-600 w-10 h-6 rounded-full transition-colors duration-200 ease-in peer-checked:bg-purple-600"></div>
          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in peer-checked:translate-x-full peer-focus:ring-2 peer-focus:ring-purple-500 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-700"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Skill' : 'Create Skill'}
        </button>
      </div>
    </form>
  );
};
