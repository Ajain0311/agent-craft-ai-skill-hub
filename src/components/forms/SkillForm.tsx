import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Skill, SkillCategory } from '../../store/skillStore';

// Define the schema for skill form validation
const skillFormSchema = z.object({
  name: z.string().min(3, 'Skill name must be at least 3 characters').max(100, 'Skill name must not exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must not exceed 500 characters'),
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  tags: z.string().optional(), // Tags will be comma-separated string
  category: z.nativeEnum(SkillCategory, {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
});

// Infer the form values type from the schema
type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  initialData?: Skill; // Optional initial data for editing
  onSubmit: (data: SkillFormValues) => void;
  isEditing?: boolean;
  isLoading?: boolean; // For submit button loading state
}

const SkillForm: React.FC<SkillFormProps> = ({ initialData, onSubmit, isEditing = false, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: '',
      description: '',
      prompt: '',
      tags: '',
      category: SkillCategory.PromptEngineering, // Default category
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        prompt: initialData.prompt,
        tags: initialData.tags.join(', '), // Convert array back to comma-separated string
        category: initialData.category,
      });
    } else {
      // Reset to default values if no initialData is provided (e.g., for a new skill)
      reset({
        name: '',
        description: '',
        prompt: '',
        tags: '',
        category: SkillCategory.PromptEngineering,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<SkillFormValues> = (data) => {
    onSubmit(data);
  };

  const categories = Object.values(SkillCategory);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Skill Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="e.g., Summarize Text, Generate Code"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby="name-error"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="A brief explanation of what this skill does and how to use it."
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby="description-error"
        ></textarea>
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Prompt Template
        </label>
        <textarea
          id="prompt"
          {...register('prompt')}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm dark:bg-gray-700 dark:text-gray-100"
          placeholder="Enter the AI prompt template here. Use {{variable_name}} for dynamic inputs."
          aria-invalid={errors.prompt ? "true" : "false"}
          aria-describedby="prompt-error"
        ></textarea>
        {errors.prompt && (
          <p id="prompt-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.prompt.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          {...register('tags')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="e.g., summarization, text-processing, utility"
          aria-invalid={errors.tags ? "true" : "false"}
          aria-describedby="tags-error"
        />
        {errors.tags && (
          <p id="tags-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="category"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              aria-invalid={errors.category ? "true" : "false"}
              aria-describedby="category-error"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && (
          <p id="category-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          isEditing ? 'Update Skill' : 'Create Skill'
        )}
      </button>
    </form>
  );
};

export default SkillForm;
