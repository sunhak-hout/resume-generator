import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcn/ui/button";

const currentYear = new Date().getFullYear();
const monthRange = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: format(new Date(currentYear, i, 1), "MMM"),
}));

interface Props {
  value?: Date | string;
  onChange: (value: Date | null) => void;
}

const CalendarMonth: React.FC<Props> = ({ value, onChange }) => {
  const [selectedYear, setSelectedYear] = useState(
    value ? new Date(value).getFullYear() : currentYear,
  );

  const handleDecreaseYear = () => {
    setSelectedYear((prev) => prev - 1);
  };

  const handleIncreaseYear = () => {
    setSelectedYear((prev) => prev + 1);
  };

  const checkSelectedMonth = (month: number) => {
    return (
      value &&
      month === new Date(value).getMonth() &&
      selectedYear === new Date(value).getFullYear()
    );
  };

  const handleChangeMonth = (month: number) => {
    onChange(
      checkSelectedMonth(month) ? null : new Date(selectedYear, month, 1),
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <Button
          className="h-7 w-7 rounded-full"
          variant="outline"
          size="icon"
          onClick={handleDecreaseYear}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>{selectedYear}</span>
        <Button
          disabled={selectedYear >= currentYear}
          className="h-7 w-7 rounded-full"
          variant="outline"
          size="icon"
          onClick={handleIncreaseYear}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 p-2">
        {monthRange.map((m) => (
          <Button
            className="h-8 w-full rounded-md"
            variant={checkSelectedMonth(m.value) ? "default" : "outline"}
            key={m.value}
            onClick={() => handleChangeMonth(m.value)}
          >
            {m.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
