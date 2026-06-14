import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SkillsListPage from '../SkillsListPage';
import useSkillStore from '../../store/useSkillStore';

// Mocking the store
const mockSkills = [
  {
    id: '1',
    name: 'Skill One',
    description: 'Description for Skill One',
    tags: ['react', 'frontend'],
    createdAt: '2023-10-27T10:00:00Z',
    updatedAt: '2023-10-27T11:00:00Z',
    createdBy: 'User A',
  },
  {
    id: '2',
    name: 'Skill Two',
    description: 'Description for Skill Two',
    tags: ['node', 'backend'],
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T11:00:00Z',
    createdBy: 'User B',
  },
];

const mockStore = {
  skills: mockSkills,
  selectedSkill: null,
  filterTag: '',
  addSkill: jest.fn(),
  updateSkill: jest.fn(),
  deleteSkill: jest.fn(),
  setSelectedSkill: jest.fn(),
  clearSelectedSkill: jest.fn(),
  setFilterTag: jest.fn(),
};

// Mocking the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SkillsListPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Set the mock store state
    useSkillStore.setState(mockStore);
  });

  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /AI Skills Hub/i })).toBeInTheDocument();
  });

  it('renders a list of skills', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Skill One')).toBeInTheDocument();
    expect(screen.getByText('Skill Two')).toBeInTheDocument();
  });

  it('navigates to skill detail page when a skill card is clicked', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );
    const skillCard = screen.getByText('Skill One').closest('.skill-card'); // Assuming SkillCard has a class 'skill-card'
    expect(skillCard).toBeInTheDocument();
    fireEvent.click(skillCard as Element);
    expect(mockNavigate).toHaveBeenCalledWith('/skills/1');
  });

  it('filters skills by tag', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );

    const filterInput = screen.getByPlaceholderText(/filter by tag/i);
    fireEvent.change(filterInput, { target: { value: 'react' } });

    // Wait for potential state updates or re-renders
    waitFor(() => {
      expect(screen.getByText('Skill One')).toBeInTheDocument();
      expect(screen.queryByText('Skill Two')).not.toBeInTheDocument();
    });
  });

  it('clears filter when input is cleared', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );

    const filterInput = screen.getByPlaceholderText(/filter by tag/i);
    fireEvent.change(filterInput, { target: { value: 'react' } });
    waitFor(() => {
      expect(screen.getByText('Skill One')).toBeInTheDocument();
    });

    fireEvent.change(filterInput, { target: { value: '' } });
    waitFor(() => {
      expect(screen.getByText('Skill One')).toBeInTheDocument();
      expect(screen.getByText('Skill Two')).toBeInTheDocument();
    });
  });

  it('navigates to create new skill page', () => {
    render(
      <MemoryRouter>
        <SkillsListPage />
      </MemoryRouter>
    );
    const newSkillButton = screen.getByRole('button', { name: /new skill/i });
    fireEvent.click(newSkillButton);
    expect(mockNavigate).toHaveBeenCalledWith('/skills/new');
  });
});
