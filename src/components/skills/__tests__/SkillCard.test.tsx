import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillCard from '../SkillCard';

describe('SkillCard', () => {
  const mockSkill = {
    id: '1',
    name: 'Test Skill',
    description: 'A short description of the test skill.',
    tags: ['test', 'example'],
    createdAt: '2023-10-27T10:00:00Z',
    updatedAt: '2023-10-27T11:00:00Z',
    createdBy: 'User One',
  };

  it('renders skill name and description correctly', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText('Test Skill')).toBeInTheDocument();
    expect(screen.getByText('A short description of the test skill.')).toBeInTheDocument();
  });

  it('renders tags correctly', () => {
    render(<SkillCard skill={mockSkill} />);
    mockSkill.tags.forEach(tag => {
      expect(screen.getByText(tag, { exact: false })).toBeInTheDocument();
    });
  });

  it('renders created by information', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/Created by: User One/i)).toBeInTheDocument();
  });

  it('renders dates correctly', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText(/Created: Oct 27, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Updated: Oct 27, 2023/i)).toBeInTheDocument();
  });
});
