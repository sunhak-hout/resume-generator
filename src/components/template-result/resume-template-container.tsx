import { createRef, useCallback, useEffect } from "react";
import ResumeTemplate from "./resume-template";
import { cn } from "@/lib/utils";

export interface ResumeTemplateContainer {
  className?: string;
}

const ResumeTemplateContainer: React.FC<ResumeTemplateContainer> = ({
  className,
}) => {
  const containerRef = createRef<HTMLDivElement>();
  const resumeContainerRef = createRef<HTMLDivElement>();
  const resumeRef = createRef<HTMLDivElement>();

  const calculateResumeScaleRatio = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth || 1;
    const resumeWidth = resumeRef.current?.clientWidth || 1;

    const scale = (containerWidth - 2) / resumeWidth; //? -2 for spacing

    resumeContainerRef.current?.setAttribute(
      "style",
      `transform: scale(${scale}); transform-origin: top left;`,
    );
  }, [containerRef, resumeRef, resumeContainerRef]);

  useEffect(() => {
    calculateResumeScaleRatio();
    window.addEventListener("resize", calculateResumeScaleRatio);
    return () => {
      window.removeEventListener("resize", calculateResumeScaleRatio);
    };
  }, [calculateResumeScaleRatio]);

  return (
    <div
      className={cn("relative aspect-[210/297] overflow-hidden", className)}
      ref={containerRef}
    >
      <div ref={resumeContainerRef}>
        <ResumeTemplate ref={resumeRef} />
      </div>
    </div>
  );
};

export default ResumeTemplateContainer;
