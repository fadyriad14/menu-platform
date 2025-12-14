"use client";

import Link from "next/link";

type Props = {
  userEmail: string | null;
  userId: string | null;
  status: string;
  hasMenu: boolean;
  menuUrl: string;
  menuPageUrl: string;

  onLogout: () => void;
  onUploadPdf: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCopy: (text: string) => void;
  onDownloadQr: () => void;

  qrDataUrl: string;
};

export default function DashboardView({
  userEmail,
  userId,
  status,
  hasMenu,
  menuUrl,
  menuPageUrl,
  onLogout,
  onUploadPdf,
  onCopy,
  onDownloadQr,
  qrDataUrl,
}: Props) {
  const menuRoute = userId ? `/m/${userId}` : "";

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>Dashboard</h1>
          <p style={styles.sub}>
            Signed in as <span style={styles.mono}>{userEmail}</span>
          </p>
        </div>

        <div style={styles.headerActions}>
          <Link href="/" style={styles.secondaryButton}>
            Home
          </Link>
          <button onClick={onLogout} style={styles.secondaryButton}>
            Log out
          </button>
        </div>
      </header>

      {status && <div style={styles.toast}>{status}</div>}

      <section style={styles.grid}>
        {/* Menu */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.h2}>Your menu</h2>
            <span style={{ ...styles.badge, ...(hasMenu ? styles.badgeGreen : styles.badgeGray) }}>
              {hasMenu ? "Published" : "No menu yet"}
            </span>
          </div>

          <p style={styles.p}>
            Upload a PDF menu. Replacing the PDF updates your menu instantly — your QR code never changes.
          </p>

          <div style={styles.row}>
            <a
              href={menuRoute}
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.primaryButton, ...(userId ? {} : styles.disabled) }}
              onClick={(e) => {
                if (!userId) e.preventDefault();
              }}
            >
              View menu
            </a>

            <button
              type="button"
              style={{ ...styles.secondaryButton, ...(menuPageUrl ? {} : styles.disabled) }}
              onClick={() => menuPageUrl && onCopy(menuPageUrl)}
              disabled={!menuPageUrl}
            >
              Copy link
            </button>
          </div>

          <div style={styles.divider} />

          <label style={styles.label}>Upload / replace menu (PDF)</label>
          <input type="file" accept="application/pdf" onChange={onUploadPdf} style={styles.file} />

          {menuUrl && (
            <p style={styles.hint}>
              Latest PDF:{" "}
              <a href={menuUrl} target="_blank" rel="noreferrer" style={styles.link}>
                Open PDF
              </a>
            </p>
          )}
        </div>

        {/* QR */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.h2}>Your QR code</h2>
          </div>

          <p style={styles.p}>Download and print this QR code so customers can scan your menu.</p>

          <div style={styles.qrBox}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Menu QR Code" style={styles.qrImg} />
            ) : (
              <p style={styles.hint}>QR could not be generated.</p>
            )}
          </div>

          <div style={styles.row}>
            <button
              type="button"
              style={{ ...styles.primaryButton, ...(qrDataUrl ? {} : styles.disabled) }}
              onClick={onDownloadQr}
              disabled={!qrDataUrl}
            >
              Download QR (PNG)
            </button>

            <button
              type="button"
              style={{ ...styles.secondaryButton, ...(menuPageUrl ? {} : styles.disabled) }}
              onClick={() => menuPageUrl && onCopy(menuPageUrl)}
              disabled={!menuPageUrl}
            >
              Copy menu link
            </button>
          </div>

          {menuPageUrl && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Public menu link</div>
              <div style={styles.monoBox}>
                <span style={styles.mono}>{menuPageUrl}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: 18, maxWidth: 1100, margin: "0 auto" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  headerActions: { display: "flex", gap: 10, alignItems: "center" },

  h1: { fontSize: 28, margin: 0 },
  h2: { fontSize: 18, margin: 0 },

  sub: { margin: "6px 0 0", opacity: 0.75 },
  p: { margin: "8px 0 12px", opacity: 0.85, lineHeight: 1.45 },

  grid: { display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 14 },

  card: {
    gridColumn: "span 12",
    border: "1px solid #e6e6e6",
    borderRadius: 14,
    padding: 16,
    background: "white",
    boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
  },

  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },

  badge: { fontSize: 12, padding: "5px 10px", borderRadius: 999, border: "1px solid transparent" },
  badgeGreen: { background: "#e9f8ef", borderColor: "#bfe8cd" },
  badgeGray: { background: "#f3f4f6", borderColor: "#e5e7eb" },

  row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  divider: { height: 1, background: "#eee", margin: "14px 0" },

  label: { fontSize: 12, fontWeight: 600, opacity: 0.75, marginBottom: 8 },

  file: {
    width: "100%",
    maxWidth: 520,
    padding: 10,
    border: "1px solid #e5e5e5",
    borderRadius: 10,
    background: "white",
  },

  hint: { marginTop: 10, fontSize: 12, opacity: 0.7 },

  primaryButton: {
    appearance: "none",
    border: "1px solid #111",
    background: "#111",
    color: "white",
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },

  secondaryButton: {
    appearance: "none",
    border: "1px solid #ddd",
    background: "white",
    color: "#111",
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },

  disabled: { opacity: 0.55, cursor: "not-allowed" },

  qrBox: {
    border: "1px dashed #ddd",
    borderRadius: 14,
    padding: 14,
    display: "grid",
    placeItems: "center",
    marginBottom: 12,
  },

  qrImg: { width: 220, height: 220 },

  link: { textDecoration: "underline" },

  mono: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
  monoBox: { border: "1px solid #eee", borderRadius: 10, padding: 10, background: "#fafafa" },

  toast: {
    border: "1px solid #eee",
    background: "#fafafa",
    borderRadius: 12,
    padding: "10px 12px",
    marginBottom: 14,
    fontSize: 14,
  },
};
