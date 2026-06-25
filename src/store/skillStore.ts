import { create } from 'zustand';

export type SkillTag = string;

export interface Skill {
  id: string;
  name: string;
  description: string;
  prompt: string;
  tags: string[];
  category?: string;
  author?: string;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  parameters?: Record<string, string>;
  exampleUsage?: string;
}

interface AddSkillInput {
  name: string;
  description: string;
  prompt: string;
  tags?: string[];
  isPublic?: boolean;
  category?: string;
  author?: string;
  authorId?: string;
}

interface SkillState {
  skills: Skill[];
  addSkill: (data: AddSkillInput) => void;
  deleteSkill: (id: string) => void;
  updateSkill: (id: string, data: Partial<Omit<Skill, 'id' | 'createdAt'>>) => void;
  getSkillById: (id: string) => Skill | undefined;
}

const initialSkills: Skill[] = [
  {
    id: '1',
    name: 'Summarize Document',
    description: 'Summarizes long documents into concise bullet points.',
    prompt: 'Summarize the following document in 5 bullet points:\n\n{{document}}',
    tags: ['productivity', 'summarization'],
    category: 'Summarization',
    author: 'Alice Smith',
    authorId: 'user-123',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    isPublic: true,
    exampleUsage: 'Paste any long article or report to get a quick summary.',
  },
  {
    id: '2',
    name: 'Code Review Assistant',
    description: 'Reviews code and provides suggestions for improvement.',
    prompt: 'Review the following code and provide detailed feedback on code quality, potential bugs, and improvements:\n\n```\n{{code}}\n```',
    tags: ['development', 'code-review'],
    category: 'Code Generation',
    author: 'Alice Smith',
    authorId: 'user-123',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    isPublic: true,
  },
  {
    id: '3',
    name: 'Email Composer',
    description: 'Drafts professional emails based on your input.',
    prompt: 'Write a professional email with the following details:\nTone: {{tone}}\nSubject: {{subject}}\nKey Points: {{points}}',
    tags: ['productivity', 'communication'],
    category: 'Text Generation',
    author: 'Alice Smith',
    authorId: 'user-123',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
    isPublic: true,
  },
];

export const useSkillStore = create<SkillState>((set, get) => ({
  skills: initialSkills,
  addSkill: (data) => {
    const now = new Date().toISOString();
    const newSkill: Skill = {
      ...data,
      tags: data.tags ?? [],
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ skills: [...state.skills, newSkill] }));
  },
  deleteSkill: (id) => {
    set((state) => ({ skills: state.skills.filter((s) => s.id !== id) }));
  },
  updateSkill: (id, data) => {
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    }));
  },
  getSkillById: (id) => {
    return get().skills.find((s) => s.id === id);
  },
}));
