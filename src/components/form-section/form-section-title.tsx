import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  description: ReactNode;
}

const FormSectionTitle: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default FormSectionTitle;
