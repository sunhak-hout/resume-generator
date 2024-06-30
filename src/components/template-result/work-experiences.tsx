import { useStore } from "@/lib/useStore";
import { format } from "date-fns";
import Timeline, { TimelineItem } from "../timeline";

const WorkExperiences: React.FC = () => {
  const { workExperience } = useStore();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-semibold print:leading-loose">
        Work Experiences
      </h4>
      <Timeline className="ml-4 gap-2">
        {workExperience?.experiences.map((exp, index) => (
          <TimelineItem key={index}>
            <div className="print:leading-loose">
              <div className="-mb-1 flex items-baseline justify-between">
                <h6 className="font-semibold">{exp.company}</h6>
                <span className="text-sm">
                  {[
                    exp.from ? format(exp.from, "MMM y") : undefined,
                    exp.to ? format(exp.to, "MMM y") : undefined,
                  ]
                    .filter(Boolean)
                    .join(" - ")}
                </span>
              </div>
              <span className="text-sm">{exp.position}</span>
              <p className="text-sm text-muted-foreground">{exp.description}</p>
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default WorkExperiences;
