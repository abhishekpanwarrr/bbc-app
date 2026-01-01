import { create } from "zustand";

type Preferences = {
  strength?: "Light" | "Medium" | "Strong";
  milk?: "None" | "Regular" | "Oat" | "Soy";
  sweetness?: "No sugar" | "Less" | "Normal";
  temperature?: "Hot" | "Cold";
  completed: boolean;
};

type PrefState = {
  prefs: Preferences;
  setPref: (key: keyof Preferences, value: any) => void;
  completeQuiz: () => void;
};

export const usePreferences = create<PrefState>((set) => ({
  prefs: {
    completed: false,
  },

  setPref: (key, value) =>
    set((state) => ({
      prefs: { ...state.prefs, [key]: value },
    })),

  completeQuiz: () =>
    set((state) => ({
      prefs: { ...state.prefs, completed: true },
    })),
}));
