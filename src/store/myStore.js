import { create } from 'zustand';

export const useStore = create((set) => ({
  user: [],
  setUser: (data) => set((state) => ({ user: data })),
  topics: [],
  setTopics: (data) => set((state) => ({ topics: data })),
}));
