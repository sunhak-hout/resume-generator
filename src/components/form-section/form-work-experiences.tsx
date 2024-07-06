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
import { Textarea } from "../shadcn/ui/textarea";
import Timeline, { TimelineItem } from "../timeline";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";
import { Checkbox } from "../shadcn/ui/checkbox";

const workExperienceSchema = z.object({
  experiences: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      from: z.date().optional(),
      to: z.date().optional(),
      toPresent: z.boolean().optional(),
      description: z.string(),
    }),
  ),
});

export type WorkExperience = z.infer<typeof workExperienceSchema>;
const storedWorkExperience: WorkExperience | null = JSON.parse(
  localStorage.getItem("workExperience") || "null",
);

const FormWorkExperience: React.FC = () => {
  const { setWorkExperience } = useStore();

  const form = useForm<WorkExperience>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      experiences: storedWorkExperience?.experiences || [],
    },
  });

  const experienceFieldArray = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const workExperienceFields = form.watch();
  useEffect(() => {
    setWorkExperience(workExperienceFields);
    localStorage.setItem("workExperience", JSON.stringify(workExperienceFields)); // prettier-ignore
  }, [JSON.stringify(workExperienceFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Work Experiences"
          description="This is where you can add your work experiences"
        />
        <FormDivider />

        <Timeline className="ml-2">
          {experienceFieldArray.fields.map((ef, index) => (
            <TimelineItem key={ef.id} index={index + 1}>
              <div className="grid grid-cols-2 gap-4" key={ef.id}>
                <FormField
                  control={form.control}
                  name={`experiences.${index}.company`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Xpress Mgr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.position`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Full-Stack Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.from`}
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
                  name={`experiences.${index}.to`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <MonthPicker
                        value={field.value}
                        onChange={field.onChange}
                        disabledCalendar={!!form.getValues(`experiences.${index}.toPresent`)} // prettier-ignore
                        renderValue={
                          form.getValues(`experiences.${index}.toPresent`)
                            ? () => (
                                <span className="text-primary">Present</span>
                              )
                            : undefined
                        }
                        footer={
                          <div className="p-2">
                            <FormField
                              control={form.control}
                              name={`experiences.${index}.toPresent`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="leading-none">
                                    <FormLabel className="cursor-pointer">
                                      Currently work here!
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what you do there"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn("col-span-2", {
                    hidden: experienceFieldArray.fields.length === 1,
                  })}
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={() => experienceFieldArray.remove(index)}
                  >
                    <XCircle size={20} />
                    Delete Experience
                  </Button>
                </div>
              </div>
            </TimelineItem>
          ))}
          <TimelineItem index={experienceFieldArray.fields.length + 1}>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                experienceFieldArray.append({
                  company: "",
                  position: "",
                  description: "",
                })
              }
            >
              <PlusIcon />
              Add Experience
            </Button>
          </TimelineItem>
        </Timeline>
      </Card>
    </Form>
  );
};

export default FormWorkExperience;
