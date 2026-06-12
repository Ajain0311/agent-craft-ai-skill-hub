export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export type SkillCategory =
  | 'Text Generation'
  | 'Image Generation'
  | 'Data Analysis'
  | 'Code Generation'
  | 'Summarization'
  | 'Translation'
  | 'Search'
  | 'Utility'
  | 'Custom';

export type SkillStatus = 'Draft' | 'Published' | 'Archived' | 'Deprecated';

export interface SkillInputVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  required: boolean;
  defaultValue?: any; // Consider more specific types if needed
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  inputVariables: SkillInputVariable[];
  outputFormat?: string; // e.g., 'JSON', 'Markdown', 'Plain Text'
  category: SkillCategory;
  tags: string[];
  version: string;
  author: User;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  status: SkillStatus;
  isPublic: boolean;
  rating?: number; // 1-5 scale
  usageCount?: number;
}