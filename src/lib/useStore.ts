import { ContactInfo } from "@/components/form-section/form-contact-info";
import { EducationBackground } from "@/components/form-section/form-education-background";
import { GeneralInfo } from "@/components/form-section/form-general-info";
import { LanguagePreference } from "@/components/form-section/form-language";
import { Summary } from "@/components/form-section/form-summary";
import { TopSkill } from "@/components/form-section/form-top-skills";
import { WorkExperience } from "@/components/form-section/form-work-experiences";
import { create } from "zustand";

interface Store {
  generalInfo: GeneralInfo | null;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;

  contactInfo: ContactInfo | null;
  setContactInfo: (contactInfo: ContactInfo) => void;

  summary: Summary | null;
  setSummary: (summary: Summary) => void;

  workExperience: WorkExperience | null;
  setWorkExperience: (workExperience: WorkExperience) => void;

  educationBackground: EducationBackground | null;
  setEducationBackground: (educationBackground: EducationBackground) => void;

  topSkill: TopSkill | null;
  setTopSkill: (topSkill: TopSkill) => void;

  languagePreference: LanguagePreference | null;
  setLanguagePreference: (languagePreference: LanguagePreference) => void;
}

export const useStore = create<Store>()((set) => ({
  generalInfo: null,
  setGeneralInfo: (generalInfo: GeneralInfo) => set({ generalInfo }),

  contactInfo: null,
  setContactInfo: (contactInfo: ContactInfo) => set({ contactInfo }),

  summary: null,
  setSummary: (summary: Summary) => set({ summary }),

  workExperience: null,
  setWorkExperience: (workExperience: WorkExperience) => set({ workExperience }), // prettier-ignore

  educationBackground: null,
  setEducationBackground: (educationBackground: EducationBackground) => set({ educationBackground }), // prettier-ignore

  topSkill: null,
  setTopSkill: (topSkill: TopSkill) => set({ topSkill }),

  languagePreference: null,
  setLanguagePreference: (languagePreference: LanguagePreference) => set({ languagePreference }), // prettier-ignore
}));
