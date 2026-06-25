import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const skillFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Skill name must be at least 3 characters').max(100, 'Skill name cannot exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description cannot exceed 500 characters'),
  prompt: z.string().min(20, 'Prompt must be at least 20 characters'),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
});

export type SkillFormInputs = z.infer<typeof skillFormSchema>;
export type SkillFormData = SkillFormInputs;

interface SkillFormProps {
  initialData?: Partial<SkillFormInputs>;
  onSubmit: (data: SkillFormInputs) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  isEditing?: boolean;
}

const availableTags = [
  { id: 'productivity', name: 'Productivity' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'development', name: 'Development' },
  { id: 'customer-support', name: 'Customer Support' },
  { id: 'data-analysis', name: 'Data Analysis' },
  { id: 'summarization', name: 'Summarization' },
  { id: 'communication', name: 'Communication' },
  { id: 'code-review', name: 'Code Review' },
];

export const SkillForm: React.FC<SkillFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitting,
  isEditing,
}) => {
  const loading = isLoading ?? isSubmitting ?? false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SkillFormInputs>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: '',
      description: '',
      prompt: '',
      tags: [],
      isPublic: false,
      ...initialData,
    },
  });

  const watchedIsPublic = watch('isPublic');
  const watchedTags = watch('tags') ?? [];

  const handleTagChange = (tagId: string, isChecked: boolean) => {
    if (isChecked) {
      setValue('tags', [...watchedTags, tagId]);
    } else {
      setValue('tags', watchedTags.filter((t) => t !== tagId));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-xl max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">
        {isEditing ? 'Edit Skill' : 'Create New Skill'}
      </h2>

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
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

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
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

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
        />
        {errors.prompt && (
          <p className="mt-1 text-sm text-red-400">{errors.prompt.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                value={tag.id}
                checked={watchedTags.includes(tag.id)}
                onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-300 cursor-pointer">
                {tag.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
        <label htmlFor="isPublic" className="flex flex-col cursor-pointer">
          <span className="text-sm font-medium text-gray-300">Sharing Status</span>
          <span className="text-xs text-gray-400 mt-1">
            {watchedIsPublic ? 'Public: Visible to everyone' : 'Private: Visible only to you and your team'}
          </span>
        </label>
        <div className="relative inline-block w-10 h-6 select-none">
          <input
            type="checkbox"
            id="isPublic"
            {...register('isPublic')}
            className="peer sr-only"
            role="switch"
          />
          <div className="block bg-gray-600 w-10 h-6 rounded-full transition-colors duration-200 peer-checked:bg-purple-600" />
          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-full" />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEditing ? 'Update Skill' : 'Create Skill'}
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
