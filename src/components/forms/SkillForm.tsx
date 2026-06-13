import React, { useState, useEffect } from 'react';
import { TagInput } from './TagInput';

export interface SkillFormData {
  name: string;
  prompt: string;
  description: string;
  tags: string[];
}

interface SkillFormProps {
  initialData?: Partial<SkillFormData>;
  onSubmit: (data: SkillFormData) => void;
  isSubmitting?: boolean;
}

export const SkillForm: React.FC<SkillFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [prompt, setPrompt] = useState(initialData?.prompt || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrompt(initialData.prompt || '');
      setDescription(initialData.description || '');
      setTags(initialData.tags || []);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Skill name is required.';
    }
    if (!prompt.trim()) {
      newErrors.prompt = 'Prompt is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, prompt, description, tags });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div>
        <label htmlFor="skill-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Skill Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="skill-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Summarize Document"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="skill-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Prompt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="skill-prompt"
          name="prompt"
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
          placeholder="Provide a clear and concise prompt for the AI agent. E.g., 'Summarize the following text in 3 bullet points:'"
          aria-required="true"
          aria-invalid={!!errors.prompt}
          aria-describedby={errors.prompt ? 'prompt-error' : undefined}
        ></textarea>
        {errors.prompt && (
          <p id="prompt-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.prompt}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="skill-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (Markdown supported)
        </label>
        <textarea
          id="skill-description"
          name="description"
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
          placeholder="Describe the skill's purpose, usage, and any specific parameters. Markdown is supported for rich formatting."
        ></textarea>
      </div>

      <TagInput
        id="skill-tags"
        label="Tags"
        name="tags"
        value={tags}
        onChange={setTags}
        placeholder="Add relevant tags (e.g., 'summarization', 'NLP', 'document processing')"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving Skill...' : 'Create Skill'}
        </button>
      </div>
    </form>
  );
};
