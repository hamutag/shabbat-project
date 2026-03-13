import { create } from "zustand";

interface AppState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Notifications
  unreadNotifications: number;
  setUnreadNotifications: (count: number) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  selectedMitzvot: string[];
  toggleMitzva: (id: string) => void;
  selectedTrack: string | null;
  setSelectedTrack: (id: string | null) => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Notifications
  unreadNotifications: 0,
  setUnreadNotifications: (count) => set({ unreadNotifications: count }),

  // Onboarding
  onboardingStep: 1,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  selectedMitzvot: [],
  toggleMitzva: (id) =>
    set((state) => ({
      selectedMitzvot: state.selectedMitzvot.includes(id)
        ? state.selectedMitzvot.filter((m) => m !== id)
        : [...state.selectedMitzvot, id],
    })),
  selectedTrack: null,
  setSelectedTrack: (id) => set({ selectedTrack: id }),
  resetOnboarding: () =>
    set({
      onboardingStep: 1,
      selectedMitzvot: [],
      selectedTrack: null,
    }),
}));
