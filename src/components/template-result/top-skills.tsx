import { useStore } from "@/lib/useStore";
import { SquareCheckBig } from "lucide-react";

const TopSkills: React.FC = () => {
  const topSkill = useStore((state) => state.topSkill);

  return (
    <div className="flex flex-col gap-2 px-4">
      <h5 className="text-md mb-1 font-semibold print:leading-loose">
        Top Skills
      </h5>
      <div className="flex flex-col gap-3">
        {topSkill?.skills.map((skill, index) => (
          <div className="flex items-start gap-2" key={index}>
            <SquareCheckBig className="h-5 w-5 flex-shrink-0" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="text-sm font-semibold print:leading-loose">
                {skill?.skill}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {new Array(+skill?.level).fill("").map((_, index) => (
                  <div className="h-1 rounded bg-white" key={index} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSkills;
