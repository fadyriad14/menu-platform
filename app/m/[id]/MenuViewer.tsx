"use client";

type Props = {
  pdfUrl: string;
};

export default function MenuViewer({ pdfUrl }: Props) {
  if (!pdfUrl) return <p style={{ margin: "12px 0" }}>No menu found.</p>;

  return (
    <div>
      <div style={{ margin: "12px 0", display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "underline" }}
        >
          Open PDF in new tab
        </a>

        <a
          href={pdfUrl}
          download
          style={{ textDecoration: "underline" }}
        >
          Download PDF
        </a>
      </div>

      <div
        style={{
          width: "100%",
          height: "85vh",
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          overflow: "hidden",
          background: "white",
        }}
      >
        <iframe
          src={pdfUrl}
          title="Menu PDF"
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>

      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
        If the PDF doesn’t display here, use “Open PDF in new tab”.
      </p>
    </div>
  );
}
