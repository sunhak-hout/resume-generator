import { forwardRef } from "react";
import ContactInfo from "./contact-info";
import EducationBackground from "./education-background";
import GeneralInfo from "./general-info";
import Language from "./language";
import TopSkills from "./top-skills";
import WorkExperiences from "./work-experiences";
import Summary from "./summary";

const ResumeTemplate = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative h-[297mm] w-[210mm] border border-primary/10"
    >
      <div className="absolute left-0 top-0 flex h-full w-[30%] flex-col gap-5 bg-primary/90 text-white">
        <GeneralInfo />
        <ContactInfo />
        <Summary />
        <TopSkills />
        <Language />
      </div>

      <div className="absolute right-0 top-0 h-full w-[70%] overflow-hidden bg-white px-4 py-6">
        <div className="flex flex-col gap-4">
          <WorkExperiences />
          <EducationBackground />
        </div>
      </div>
    </div>
  );
});

export default ResumeTemplate;
