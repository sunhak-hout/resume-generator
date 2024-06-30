import { ContactInfo } from "@/components/form-section/form-contact-info";
import { EducationBackground } from "@/components/form-section/form-education-background";
import { GeneralInfo } from "@/components/form-section/form-general-info";
import { WorkExperience } from "@/components/form-section/form-work-experiences";
import { create } from "zustand";

interface Store {
  generalInfo: GeneralInfo | null;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;

  contactInfo: ContactInfo | null;
  setContactInfo: (contactInfo: ContactInfo) => void;

  workExperience: WorkExperience | null;
  setWorkExperience: (workExperience: WorkExperience) => void;

  educationBackground: EducationBackground | null;
  setEducationBackground: (educationBackground: EducationBackground) => void;
}

export const useStore = create<Store>()((set) => ({
  generalInfo: null,
  setGeneralInfo: (generalInfo: GeneralInfo) => set({ generalInfo }),

  contactInfo: null,
  setContactInfo: (contactInfo: ContactInfo) => set({ contactInfo }),

  workExperience: null,
  setWorkExperience: (workExperience: WorkExperience) => set({ workExperience }), // prettier-ignore

  educationBackground: null,
  setEducationBackground: (educationBackground: EducationBackground) => set({ educationBackground }), // prettier-ignore
}));
