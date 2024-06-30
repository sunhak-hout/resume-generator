import { Card } from "@/components/shadcn/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader, Send } from "lucide-react";
import { createRef, useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import Template from "./template";

const TemplateResult: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const containerRef = createRef<HTMLDivElement>();
  const cvContainerRef = createRef<HTMLDivElement>();
  const cvRef = createRef<HTMLDivElement>();
  const canvasRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 1;
    const cvWidth = cvRef.current?.clientWidth || 1;
    const scale = containerWidth / cvWidth;
    cvContainerRef.current?.setAttribute(
      "style",
      `transform: scale(${scale - 0.065}); transform-origin: top left;`,
    );
  }, [containerRef, cvRef, cvContainerRef]);

  const handlePreview = async () => {
    if (cvRef && cvRef.current && canvasRef && canvasRef.current) {
      const toBeModified = cvRef.current.getElementsByClassName(
        "print:leading-loose",
      );
      Array.from(toBeModified).forEach((h) =>
        h.classList.add("relative", "-top-2"),
      );

      const canvas = await html2canvas(cvRef.current, { scale: 2 });
      Array.from(toBeModified).forEach((h) =>
        h.classList.remove("relative", "-top-2"),
      );

      canvasRef.current?.replaceWith(canvas);
    }
  };

  const handleDownload = async () => {
    if (!cvRef || !cvRef.current) return;
    setDownloading(true);

    const toBeModified = cvRef.current.getElementsByClassName(
      "print:leading-loose",
    );
    Array.from(toBeModified).forEach((h) =>
      h.classList.add("relative", "-top-2"),
    );

    const cvCanvas = await html2canvas(cvRef.current, { scale: 2 });
    Array.from(toBeModified).forEach((h) =>
      h.classList.remove("relative", "-top-2"),
    );

    const iamgeCV = cvCanvas.toDataURL("image/jpeg");

    const pdf = new jsPDF({
      orientation: "portrait",
      format: "a4",
      unit: "mm",
    });

    const imgProps = pdf.getImageProperties(iamgeCV);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(iamgeCV, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
    setDownloading(false);
  };

  return (
    <Card className="h-full w-full overflow-auto p-6" ref={containerRef}>
      <div className="mb-4 flex items-center gap-2">
        <div className="mr-auto">
          <h3 className="text-lg font-medium">Template Result</h3>
          <p className="text-sm text-muted-foreground">
            Preview your CV on realtime updates.
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
        <div ref={cvContainerRef}>
          <Template />
        </div>

        {/* hidden on purpose for printing quality */}
        <div className="fixed left-[200%]">
          <Template ref={cvRef} />
        </div>
      </div>
    </Card>
  );
};

export default TemplateResult;
