import { FormContactInfo } from "./form-contact-info";
import FormGeneralInfo from "./form-general-info";
import FormWorkExperience from "./form-work-experiences";

export const FormSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <FormGeneralInfo />

      <FormContactInfo />

      <FormWorkExperience />
    </div>
  );
};
