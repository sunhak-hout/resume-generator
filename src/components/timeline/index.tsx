import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return (
    <ol
      className={cn(
        "relative flex flex-col gap-8 border-s border-primary/10",
        className,
      )}
    >
      {children}
    </ol>
  );
};

interface TimelineItemProps {
  children: ReactNode;
  icon?: ReactNode;
  index?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  children,
  icon,
  index,
}) => {
  return (
    <li className="ms-6">
      {icon ? (
        <span className="absolute -start-3">{icon}</span>
      ) : (
        <span
          className={cn(
            "absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white",
            { "-start-1 mt-2 h-2 w-2": typeof index !== "number" },
          )}
        >
          {index}
        </span>
      )}
      {children}
    </li>
  );
};

export { TimelineItem };
export default Timeline;
