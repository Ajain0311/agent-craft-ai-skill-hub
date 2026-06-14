import { act, create } from 'zustand/test/utils';
import useSkillStore, { SkillState } from '../useSkillStore';

describe('useSkillStore', () => {
  let store: ReturnType<typeof create<SkillState>>;

  beforeEach(() => {
    store = create<SkillState>()((set) => useSkillStore(set));
  });

  afterEach(() => {
    store.destroy();
  });

  it('should initialize with empty skills and no selected skill', () => {
    const state = store.getState();
    expect(state.skills).toEqual([]);
    expect(state.selectedSkill).toBeNull();
  });

  it('should add a skill', () => {
    const newSkill = {
      id: '1',
      name: 'New Skill',
      description: 'Description',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Test User',
    };
    act(() => store.getState().addSkill(newSkill));
    expect(store.getState().skills).toContainEqual(newSkill);
  });

  it('should set and clear selected skill', () => {
    const skillToSelect = {
      id: '2',
      name: 'Skill To Select',
      description: 'Description',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Test User',
    };
    act(() => store.getState().setSelectedSkill(skillToSelect));
    expect(store.getState().selectedSkill).toEqual(skillToSelect);

    act(() => store.getState().clearSelectedSkill());
    expect(store.getState().selectedSkill).toBeNull();
  });

  it('should update a skill', () => {
    const initialSkill = {
      id: '3',
      name: 'Initial Skill',
      description: 'Initial Desc',
      tags: ['old'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User A',
    };
    const updatedSkill = {
      ...initialSkill,
      name: 'Updated Skill',
      description: 'Updated Desc',
      tags: ['new'],
    };

    act(() => store.getState().addSkill(initialSkill));
    act(() => store.getState().updateSkill(updatedSkill));

    const state = store.getState().skills;
    expect(state).toHaveLength(1);
    expect(state[0].name).toBe('Updated Skill');
    expect(state[0].description).toBe('Updated Desc');
    expect(state[0].tags).toEqual(['new']);
  });

  it('should delete a skill', () => {
    const skillToDelete = {
      id: '4',
      name: 'Skill To Delete',
      description: 'Desc',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User B',
    };
    act(() => store.getState().addSkill(skillToDelete));
    expect(store.getState().skills).toHaveLength(1);

    act(() => store.getState().deleteSkill(skillToDelete.id));
    expect(store.getState().skills).toHaveLength(0);
  });

  it('should filter skills by tag', () => {
    const skill1 = {
      id: '5',
      name: 'Skill One',
      description: 'Desc 1',
      tags: ['react', 'frontend'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User C',
    };
    const skill2 = {
      id: '6',
      name: 'Skill Two',
      description: 'Desc 2',
      tags: ['react', 'backend'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User D',
    };
    const skill3 = {
      id: '7',
      name: 'Skill Three',
      description: 'Desc 3',
      tags: ['node', 'backend'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User E',
    };

    act(() => {
      store.getState().addSkill(skill1);
      store.getState().addSkill(skill2);
      store.getState().addSkill(skill3);
    });

    act(() => store.getState().setFilterTag('react'));
    expect(store.getState().skills.map(s => s.id)).toEqual(['5', '6']);

    act(() => store.getState().setFilterTag('backend'));
    expect(store.getState().skills.map(s => s.id)).toEqual(['6', '7']);

    act(() => store.getState().setFilterTag(''));
    expect(store.getState().skills.map(s => s.id)).toEqual(['5', '6', '7']);
  });
});
