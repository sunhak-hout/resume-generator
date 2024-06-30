import { Card } from "@/components/shadcn/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader, Send } from "lucide-react";
import { createRef, useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import Template from "./template";
import { useStore } from "@/lib/useStore";

const TemplateResult: React.FC = () => {
  const { generalInfo } = useStore();

  const [downloading, setDownloading] = useState(false);

  const containerRef = createRef<HTMLDivElement>();
  const resumeContainerRef = createRef<HTMLDivElement>();
  const resumeRef = createRef<HTMLDivElement>();
  const canvasRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 1;
    const resumeWidth = resumeRef.current?.clientWidth || 1;
    const scale = containerWidth / resumeWidth;
    resumeContainerRef.current?.setAttribute(
      "style",
      `transform: scale(${scale - 0.065}); transform-origin: top left;`,
    );
  }, [containerRef, resumeRef, resumeContainerRef]);

  const handlePreview = async () => {
    if (resumeRef && resumeRef.current && canvasRef && canvasRef.current) {
      const toBeModified = resumeRef.current.getElementsByClassName(
        "print:leading-loose",
      );
      Array.from(toBeModified).forEach((h) =>
        h.classList.add("relative", "-top-2"),
      );

      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      Array.from(toBeModified).forEach((h) =>
        h.classList.remove("relative", "-top-2"),
      );

      canvasRef.current?.replaceWith(canvas);
    }
  };

  const handleDownload = async () => {
    if (!resumeRef || !resumeRef.current) return;
    setDownloading(true);

    const toBeModified = resumeRef.current.getElementsByClassName(
      "print:leading-loose",
    );
    Array.from(toBeModified).forEach((h) =>
      h.classList.add("relative", "-top-2"),
    );

    const resumeCanvas = await html2canvas(resumeRef.current, { scale: 2 });
    Array.from(toBeModified).forEach((h) =>
      h.classList.remove("relative", "-top-2"),
    );

    const imageResume = resumeCanvas.toDataURL("image/jpeg");

    const pdf = new jsPDF({
      orientation: "portrait",
      format: "a4",
      unit: "mm",
    });

    const imgProps = pdf.getImageProperties(imageResume);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imageResume, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(
      [generalInfo?.firstName, generalInfo?.lastName, "resume"]
        .filter(Boolean)
        .join("_") + ".pdf",
    );
    setDownloading(false);
  };

  return (
    <Card className="h-full w-full overflow-auto p-6" ref={containerRef}>
      <div className="mb-4 flex items-center gap-2">
        <div className="mr-auto">
          <h3 className="text-lg font-medium">Template Result</h3>
          <p className="text-sm text-muted-foreground">
            Preview your resume on realtime updates.
          </p>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={handlePreview}
        >
          <Send />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={handleDownload}
        >
          {downloading ? <Loader className="animate-spin" /> : <Download />}
        </Button>
      </div>

      <div className="h-auto" ref={canvasRef} />

      <div className="relative overflow-hidden">
        <div ref={resumeContainerRef}>
          <Template />
        </div>

        {/* hidden on purpose for printing quality */}
        <div className="fixed left-[200%]">
          <Template ref={resumeRef} />
        </div>
      </div>
    </Card>
  );
};

export default TemplateResult;
