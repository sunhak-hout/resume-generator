import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { useStore } from "@/lib/useStore";
import { cn } from "@/lib/utils";

const GeneralInfo: React.FC = () => {
  const { generalInfo } = useStore();

  return (
    <div className="flex flex-col items-center px-2">
      <Avatar className="mb-2 mt-10 h-20 w-20 rounded-2xl border-2 border-white">
        <AvatarImage src={generalInfo?.photo} className="object-cover" />
        <AvatarFallback className="rounded-2xl bg-transparent">
          {[generalInfo?.firstName?.[0], generalInfo?.lastName?.[0]]
            .filter(Boolean)
            .join("")}
        </AvatarFallback>
      </Avatar>
      <h5 className="text-center text-lg font-semibold print:leading-loose">
        {[generalInfo?.firstName, generalInfo?.lastName]
          .filter(Boolean)
          .join(" ") || "----"}
      </h5>
      <h6 className="text-center font-medium print:leading-loose">
        {generalInfo?.jobTitle || "----"}
      </h6>
      <span
        className={cn("mt-2 text-center text-sm italic print:leading-loose", {
          hidden: !generalInfo?.inspiringQuote,
        })}
      >
        "{generalInfo?.inspiringQuote}"
      </span>
    </div>
  );
};

export default GeneralInfo;
