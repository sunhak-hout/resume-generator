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
import MonthPicker from "../month-picker";
import { Card } from "../shadcn/ui/card";
import Timeline, { TimelineItem } from "../timeline";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const educationBackgroundSchema = z.object({
  educations: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      from: z.date().optional(),
      to: z.date().optional(),
    }),
  ),
});

export type EducationBackground = z.infer<typeof educationBackgroundSchema>;
const storedEducationBackground: EducationBackground | null = JSON.parse(
  localStorage.getItem("educationBackground") || "null",
);

const FormEducationBackground: React.FC = () => {
  const setEducationBackground = useStore(
    (state) => state.setEducationBackground,
  );

  const form = useForm<EducationBackground>({
    resolver: zodResolver(educationBackgroundSchema),
    defaultValues: {
      educations: storedEducationBackground?.educations || [],
    },
  });

  const educationBackgroundFieldArray = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const educationBackgroundFields = form.watch();
  useEffect(() => {
    setEducationBackground(educationBackgroundFields);
    localStorage.setItem(
      "educationBackground",
      JSON.stringify(educationBackgroundFields),
    );
  }, [JSON.stringify(educationBackgroundFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Education Background"
          description="This is where you can add your education background"
        />
        <FormDivider />

        <Timeline className="ml-2">
          {educationBackgroundFieldArray.fields.map((ef, index) => (
            <TimelineItem key={ef.id} index={index + 1}>
              <div className="grid grid-cols-2 gap-4" key={ef.id}>
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Bachelor's Degree in Computer Science"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.school`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>School or College</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CADT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.from`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <MonthPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.to`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <MonthPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn("col-span-2", {
                    hidden: educationBackgroundFieldArray.fields.length === 1,
                  })}
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={() => educationBackgroundFieldArray.remove(index)}
                  >
                    <XCircle size={20} />
                    Delete Education
                  </Button>
                </div>
              </div>
            </TimelineItem>
          ))}
          <TimelineItem index={educationBackgroundFieldArray.fields.length + 1}>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                educationBackgroundFieldArray.append({ school: "", degree: "" })
              }
            >
              <PlusIcon />
              Add Education
            </Button>
          </TimelineItem>
        </Timeline>
      </Card>
    </Form>
  );
};

export default FormEducationBackground;
