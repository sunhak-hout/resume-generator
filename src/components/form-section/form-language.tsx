import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { useStore } from "@/lib/useStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../shadcn/ui/card";
import Timeline, { TimelineItem } from "../timeline";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const languagePreferenceSchema = z.object({
  languages: z.array(
    z.object({
      language: z.string(),
      level: z.string(),
    }),
  ),
});

export type LanguagePreference = z.infer<typeof languagePreferenceSchema>;
const storedLanguage: LanguagePreference | null = JSON.parse(
  localStorage.getItem("languagePreference") || "null",
);

const FormLanguage: React.FC = () => {
  const { setLanguagePreference } = useStore();

  const form = useForm<LanguagePreference>({
    resolver: zodResolver(languagePreferenceSchema),
    defaultValues: {
      languages: storedLanguage?.languages || [],
    },
  });

  const languageFieldArray = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const languagePreferenceFields = form.watch();
  useEffect(() => {
    setLanguagePreference(languagePreferenceFields);
    localStorage.setItem("languagePreference", JSON.stringify(languagePreferenceFields)); // prettier-ignore
  }, [JSON.stringify(languagePreferenceFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Language"
          description="This is where you can add your language"
        />
        <FormDivider />

        <Timeline className="ml-2">
          {languageFieldArray.fields.map((ln, index) => (
            <TimelineItem key={ln.id} index={index + 1}>
              <div className="grid grid-cols-2 gap-4" key={ln.id}>
                <FormField
                  control={form.control}
                  name={`languages.${index}.language`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`languages.${index}.level`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fluent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn("col-span-2", {
                    hidden: languageFieldArray.fields.length === 1,
                  })}
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={() => languageFieldArray.remove(index)}
                  >
                    <XCircle size={20} />
                    Delete Education
                  </Button>
                </div>
              </div>
            </TimelineItem>
          ))}
          <TimelineItem index={languageFieldArray.fields.length + 1}>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                languageFieldArray.append({ language: "", level: "" })
              }
            >
              <PlusIcon />
              Add Language
            </Button>
          </TimelineItem>
        </Timeline>
      </Card>
    </Form>
  );
};

export default FormLanguage;
