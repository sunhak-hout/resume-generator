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
import { zodResolver } from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import { ChangeEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../shadcn/ui/card";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const generalInfoSchema = z.object({
  photo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
});

export type GeneralInfo = z.infer<typeof generalInfoSchema>;
const storedGeneralInfo: GeneralInfo | null = JSON.parse(
  localStorage.getItem("generalInfo") || "null",
);

const FormGeneralInfo: React.FC = () => {
  const { setGeneralInfo } = useStore();

  const form = useForm<GeneralInfo>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      photo: storedGeneralInfo?.photo || "",
      firstName: storedGeneralInfo?.firstName || "",
      lastName: storedGeneralInfo?.lastName || "",
      jobTitle: storedGeneralInfo?.jobTitle || "",
    },
  });

  const generalInfoFields = form.watch();
  useEffect(() => {
    setGeneralInfo(generalInfoFields);
    localStorage.setItem("generalInfo", JSON.stringify(generalInfoFields));
  }, [JSON.stringify(generalInfoFields)]);

  const handleChangePhoto: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    new Compressor(file, {
      resize: "cover",
      width: 256,
      maxWidth: 256,
      height: 256,
      maxHeight: 256,
      success(file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          console.log(fileReader.result);
          form.setValue("photo", fileReader.result as string);
        };
        fileReader.readAsDataURL(file as Blob);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="General Info"
          description="This is how others will see you on the site"
        />
        <FormDivider />

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleChangePhoto} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Full-Stack Developer" {...field} />
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

export default FormGeneralInfo;
