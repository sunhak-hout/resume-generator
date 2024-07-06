import { Card } from "@/components/shadcn/ui/card";
import { useStore } from "@/lib/useStore";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader, Send } from "lucide-react";
import { createRef, useCallback, useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import Template from "./template";

const TemplateResult: React.FC = () => {
  const { generalInfo } = useStore();

  const [downloading, setDownloading] = useState(false);

  const containerRef = createRef<HTMLDivElement>();
  const resumeContainerRef = createRef<HTMLDivElement>();
  const resumeRef = createRef<HTMLDivElement>();
  const canvasRef = createRef<HTMLDivElement>();

  const calculateResumeScaleRatio = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth || 1;
    const resumeWidth = resumeRef.current?.clientWidth || 1;

    const scale = (containerWidth - 25 * 2) / resumeWidth; //? INFO: 25 = (padding: 24px) + 1 for spacing

    resumeContainerRef.current?.setAttribute(
      "style",
      `transform: scale(${scale}); transform-origin: top left;`,
    );
  }, [containerRef, resumeRef, resumeContainerRef]);

  useEffect(() => {
    calculateResumeScaleRatio();
    window.addEventListener("resize", calculateResumeScaleRatio);
    return () => {
      window.removeEventListener("resize", calculateResumeScaleRatio);
    };
  }, [calculateResumeScaleRatio]);

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
    <Card className="w-full p-6" ref={containerRef}>
      <div className="mb-4 flex items-center gap-2">
        <div className="mr-auto">
          <h3 className="text-lg font-semibold">Template Result</h3>
          <p className="text-sm text-muted-foreground">
            Preview your resume on realtime updates.
          </p>
        </div>

        {/* debug purpose */}
        <Button
          size="icon"
          variant="outline"
          className="hidden flex-shrink-0 rounded-full"
          onClick={handlePreview}
        >
          <Send />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="flex-shrink-0 rounded-full"
          onClick={handleDownload}
        >
          {downloading ? <Loader className="animate-spin" /> : <Download />}
        </Button>
      </div>

      {/* debug purpose */}
      <div className="hidden h-auto" ref={canvasRef} />

      <div className="relative aspect-[210/297] overflow-hidden">
        <div ref={resumeContainerRef}>
          <Template />
        </div>

        {/* hidden on purpose for printing quality */}
        <div className="fixed left-[200%] aspect-[210/297]">
          <Template ref={resumeRef} />
        </div>
      </div>
    </Card>
  );
};

export default TemplateResult;
