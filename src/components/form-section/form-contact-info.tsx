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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../shadcn/ui/card";
import FormDivider from "./form-divider";
import FormSectionTitle from "./form-section-title";

const contactInfoSchema = z.object({
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  linkedIn: z.string(),
  website: z.string(),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;
const storedContactInfo: ContactInfo | null = JSON.parse(
  localStorage.getItem("contactInfo") || "null",
);

export const FormContactInfo: React.FC = () => {
  const { setContactInfo } = useStore();

  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: storedContactInfo?.email || "",
      phone: storedContactInfo?.phone || "",
      address: storedContactInfo?.address || "",
      linkedIn: storedContactInfo?.linkedIn || "",
      website: storedContactInfo?.website || "",
    },
  });

  const contactInfoFields = form.watch();
  useEffect(() => {
    setContactInfo(contactInfoFields);
    localStorage.setItem("contactInfo", JSON.stringify(contactInfoFields));
  }, [JSON.stringify(contactInfoFields)]);

  return (
    <Form {...form}>
      <Card className="flex flex-col gap-4 p-6">
        <FormSectionTitle
          title="Contact Info"
          description="This is where you can add your contact information"
        />
        <FormDivider />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +855XXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. sample@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. #01, St. 111, Phnom Penh, Cambodia, 12000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>LinkedIn (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. https://linkedin.com/xxxxxxxxxxxxxxx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. https://sunhak.dev" {...field} />
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
