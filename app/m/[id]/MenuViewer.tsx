"use client";

/**
 * MenuViewer
 * - Takes a public PDF URL
 * - Uses PDF.js to render each page into a canvas
 * - Shows pages in a simple vertical scroll (mobile-friendly)
 *
 * Vercel/Next-safe approach:
 * - Dynamically import "pdfjs-dist" (no deep import paths)
 * - Use a CDN worker URL pinned to the installed pdf.js version
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
      if (!pdfUrl) {
        setStatus("No menu URL provided.");
        if (containerRef.current) containerRef.current.innerHTML = "";
        return;
      }

      setStatus("Loading menu...");

      try {
        // Import from package root (stable across versions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfjsLib: any = await import("pdfjs-dist");

        // Point PDF.js at its worker (CDN) using the installed version
        const version = pdfjsLib?.version || "4.0.0";
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

        // Start loading the PDF
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
        });

        const pdf = await loadingTask.promise;

        if (cancelled) return;

        setStatus(`Rendering ${pdf.numPages} page(s)...`);

        // Clear old render
        if (containerRef.current) containerRef.current.innerHTML = "";

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

          // Styling
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.margin = "0 auto 16px auto";
          canvas.style.border = "1px solid #e5e5e5";
          canvas.style.borderRadius = "8px";
          canvas.style.background = "white";

          // Append before rendering so user sees progress
          containerRef.current?.appendChild(canvas);

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;
        }

        if (!cancelled) setStatus("");
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : typeof err === "string" ? err : JSON.stringify(err);
        setStatus(`Could not load menu. ${msg}`);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div>
      {status && <p style={{ margin: "12px 0" }}>{status}</p>}
      <div ref={containerRef} />
    </div>
  );
}
