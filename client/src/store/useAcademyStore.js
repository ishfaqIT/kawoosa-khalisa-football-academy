import { create } from 'zustand';

const useAcademyStore = create((set) => ({
  activeWing: 'all', // 'all', 'kawoosa', 'kunzer'
  setActiveWing: (wing) => set({ activeWing: wing }),
  
  user: JSON.parse(localStorage.getItem('kkfa_user')) || null,
  token: localStorage.getItem('kkfa_token') || null,
  
  login: (userData, userToken) => {
    localStorage.setItem('kkfa_user', JSON.stringify(userData));
    localStorage.setItem('kkfa_token', userToken);
    set({ user: userData, token: userToken });
  },
  
  logout: () => {
    localStorage.removeItem('kkfa_user');
    localStorage.removeItem('kkfa_token');
    set({ user: null, token: null });
  },
  
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useAcademyStore;
