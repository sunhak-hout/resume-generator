import { useStore } from "@/lib/useStore";
import { format } from "date-fns";
import Timeline, { TimelineItem } from "../timeline";

const EducationBackground: React.FC = () => {
  const { educationBackground } = useStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold print:leading-loose">
        Education Background
      </h4>
      <Timeline className="ml-4 gap-4">
        {educationBackground?.educations.map((edu, index) => (
          <TimelineItem key={index}>
            <div className="print:leading-loose">
              <div className="-mb-1 flex items-baseline justify-between">
                <h6 className="font-semibold">{edu.school}</h6>
                <span className="text-sm">
                  {[
                    edu.from ? format(edu.from, "MMM y") : undefined,
                    edu.to ? format(edu.to, "MMM y") : undefined,
                  ]
                    .filter(Boolean)
                    .join(" - ")}
                </span>
              </div>
              <span className="text-sm">{edu.degree}</span>
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default EducationBackground;
