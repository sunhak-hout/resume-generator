import { Button } from "@/components/shadcn/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import CalendarMonth from "../calendar-month";
import { FormControl } from "../shadcn/ui/form";

interface Props {
  value: ControllerRenderProps["value"];
  onChange: ControllerRenderProps["onChange"];
}

const MonthPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "MMMM y") : <span>Pick month</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarMonth value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
