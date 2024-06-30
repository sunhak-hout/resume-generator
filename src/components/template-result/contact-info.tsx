import { useStore } from "@/lib/useStore";
import { Mail, MapPinned, PhoneCall } from "lucide-react";

const ContactInfo: React.FC = () => {
  const { contactInfo } = useStore();

  return (
    <>
      <div className="flex flex-col gap-2 px-4 py-4">
        <div className="flex items-start gap-2">
          <PhoneCall className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm print:leading-loose">
            {contactInfo?.phone || "----"}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Mail className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm print:leading-loose">
            {contactInfo?.email || "----"}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MapPinned className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm print:leading-loose">
            {contactInfo?.address || "----"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
