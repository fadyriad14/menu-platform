"use client";

/**
 * MenuViewer
 * - Takes a public PDF URL
 * - Uses PDF.js to render each page into a canvas
 * - Shows pages in a simple vertical scroll (mobile-friendly)
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  pdfUrl: string;
};

export default function MenuViewer({ pdfUrl }: Props) {
  const [status, setStatus] = useState<string>("Loading menu...");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      setStatus("Loading menu...");

      // Dynamically import pdfjs to avoid SSR issues
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");


      // Point PDF.js at its worker file
      // (This is the most reliable way in Next.js)
      // @ts-ignore
      // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url
        ).toString();


      try {
        // Load the PDF document
        // @ts-ignore
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        setStatus(`Rendering ${pdf.numPages} page(s)...`);

        // Clear any old render
        if (containerRef.current) containerRef.current.innerHTML = "";

        // Render each page into a canvas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNum);

          // Increase scale for readability on phones
          const viewport = page.getViewport({ scale: 1.6 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) continue;

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          // Add some spacing / styling
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.margin = "0 auto 16px auto";
          canvas.style.border = "1px solid #e5e5e5";
          canvas.style.borderRadius = "8px";

          // Append before rendering so user sees progress
          containerRef.current?.appendChild(canvas);

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;
        }

        if (!cancelled) setStatus("");
      } catch (err: any) {
        setStatus(`Could not load menu. ${err?.message ?? String(err)}`);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div>
      {/* Status / error */}
      {status && <p style={{ margin: "12px 0" }}>{status}</p>}

      {/* Rendered pages go here */}
      <div ref={containerRef} />
    </div>
  );
}
export {};
