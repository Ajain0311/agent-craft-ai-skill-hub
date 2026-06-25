import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  // Add other user-related fields as needed
}

interface UserState {
  currentUser: User | null;
  // Potentially add actions here, but for this task, just the state is enough
  // login: (user: User) => void;
  // logout: () => void;
}

// Mock current user data
const mockCurrentUser: User = {
  id: 'user-123',
  name: 'Alice Smith',
  email: 'alice.smith@agentcraft.com',
  avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AS&backgroundColor=a21caf,c026d3,d946ef,f472b6,f9a8d4&backgroundType=gradientLinear',
};

export const useUserStore = create<UserState>((_set) => ({
  currentUser: mockCurrentUser,
  // login: (user) => set({ currentUser: user }),
  // logout: () => set({ currentUser: null }),
}));
