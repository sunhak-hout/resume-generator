import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { useStore } from "@/lib/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../shadcn/ui/card";
import { Textarea } from "../shadcn/ui/textarea";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const summarySchema = z.object({
  summary: z.string(),
});

export type Summary = z.infer<typeof summarySchema>;
const storedSummary: Summary | null = JSON.parse(
  localStorage.getItem("summary") || "null",
);

export const FormSummary: React.FC = () => {
  const setSummary = useStore((state) => state.setSummary);

  const form = useForm<Summary>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: storedSummary?.summary || "",
    },
  });

  const summaryFields = form.watch();
  useEffect(() => {
    setSummary(summaryFields);
    localStorage.setItem("summary", JSON.stringify(summaryFields));
  }, [JSON.stringify(summaryFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Professional Summary"
          description="This is where you can add your professional summary"
        />
        <FormDivider />

        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your professional summary"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </Form>
  );
};
