import { forwardRef } from "react";
import ContactInfo from "./contact-info";
import GeneralInfo from "./general-info";
import WorkExperiences from "./work-experiences";
import EducationBackground from "./education-background";

const Template = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="relative h-[297mm] w-[210mm] border border-primary/10"
    >
      <div className="absolute left-0 top-0 h-full w-[30%] bg-primary/90 text-white">
        <GeneralInfo />
        <ContactInfo />
      </div>

      <div className="absolute right-0 top-0 h-full w-[70%] px-4 py-6 overflow-hidden">
        <div className="flex flex-col gap-4">
          <WorkExperiences />
          <EducationBackground />
        </div>
      </div>
    </div>
  );
});

export default Template;
