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
import { Slider } from "../shadcn/ui/slider";
import Timeline, { TimelineItem } from "../timeline";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const topSkillSchema = z.object({
  skills: z.array(
    z.object({
      skill: z.string(),
      level: z.number(),
    }),
  ),
});

export type TopSkill = z.infer<typeof topSkillSchema>;
const storedTopSkill: TopSkill | null = JSON.parse(
  localStorage.getItem("topSkill") || "null",
);

const FormTopSkills: React.FC = () => {
  const setTopSkill = useStore((state) => state.setTopSkill);

  const form = useForm<TopSkill>({
    resolver: zodResolver(topSkillSchema),
    defaultValues: {
      skills: storedTopSkill?.skills || [],
    },
  });

  const skillArrayField = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const topSkillFields = form.watch();
  useEffect(() => {
    setTopSkill(topSkillFields);
    localStorage.setItem("topSkill", JSON.stringify(topSkillFields)); // prettier-ignore
  }, [JSON.stringify(topSkillFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Top Skills"
          description="This is where you can add your skills"
        />
        <FormDivider />

        <Timeline className="ml-2">
          {skillArrayField.fields.map((ln, index) => (
            <TimelineItem key={ln.id} index={index + 1}>
              <div className="grid grid-cols-2 gap-4" key={ln.id}>
                <FormField
                  control={form.control}
                  name={`skills.${index}.skill`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Skill</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. React" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.level`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Slider
                          onValueChange={field.onChange}
                          defaultValue={[field.value]}
                          max={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn("col-span-2", {
                    hidden: skillArrayField.fields.length === 1,
                  })}
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={() => skillArrayField.remove(index)}
                  >
                    <XCircle size={20} />
                    Delete Skill
                  </Button>
                </div>
              </div>
            </TimelineItem>
          ))}
          <TimelineItem index={skillArrayField.fields.length + 1}>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => skillArrayField.append({ skill: "", level: 5 })}
            >
              <PlusIcon />
              Add Skill
            </Button>
          </TimelineItem>
        </Timeline>
      </Card>
    </Form>
  );
};

export default FormTopSkills;
