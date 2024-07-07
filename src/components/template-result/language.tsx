import { useStore } from "@/lib/useStore";
import { SquareCheckBig } from "lucide-react";

const Language: React.FC = () => {
  const languagePreference = useStore((state) => state.languagePreference);

  return (
    <div className="flex flex-col gap-2 px-4">
      <h5 className="text-md mb-1 font-semibold print:leading-loose">
        Languages
      </h5>
      {languagePreference?.languages.map((ln, index) => (
        <div className="flex items-start gap-2" key={index}>
          <SquareCheckBig className="h-5 w-5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold print:leading-loose">
              {ln?.language}
            </div>
            <span className="text-sm print:leading-loose">{ln?.level}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Language;
