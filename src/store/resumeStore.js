import { create } from "zustand";

export const useResumeStore = create((set) => ({
  resume: {
    personal: {},
    objective: "",
    education: [],
    skills: [],
    projects: [],
    experience: [],
    certifications: [],
    hobbies: []
  },

  updateField: (section, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        [section]: value
      }
    }))
}));
    