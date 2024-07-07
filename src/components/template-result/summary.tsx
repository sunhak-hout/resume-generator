import { useStore } from "@/lib/useStore";
import { cn } from "@/lib/utils";

const Summary: React.FC = () => {
  const summary = useStore((state) => state.summary);

  return (
    <div
      className={cn("flex flex-col gap-2 px-4", { hidden: !summary?.summary })}
    >
      <h5 className="text-md font-semibold print:leading-loose">Summary</h5>
      <p className="text-sm print:leading-loose">{summary?.summary}</p>
    </div>
  );
};

export default Summary;
