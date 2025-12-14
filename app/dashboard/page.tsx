"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  // Logged-in user info
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Loading while checking auth
  const [loading, setLoading] = useState(true);

  // Upload + status messages
  const [status, setStatus] = useState<string>("");

  // Public menu URL (PDF)
  const [menuUrl, setMenuUrl] = useState<string>("");

  // QR code image (base64 data URL)
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // For a nicer UX: show the public menu link (route) + full URL
  const [menuPageUrl, setMenuPageUrl] = useState<string>("");

  const hasMenu = useMemo(() => Boolean(menuUrl), [menuUrl]);

  // ----------------------------------------------------
  // 1) AUTH CHECK (runs once on page load)
  // ----------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      // Not logged in → redirect
      if (error || !data.user) {
        router.push("/login");
        return;
      }

      // Save user info
      setUserEmail(data.user.email ?? null);
      setUserId(data.user.id);

      // Build the menu page URL for the QR code
      const origin = window.location.origin;
      const url = `${origin}/m/${data.user.id}`;
      setMenuPageUrl(url);

      try {
        const qr = await QRCode.toDataURL(url, {
          width: 360,
          margin: 1,
        });
        setQrDataUrl(qr);
      } catch {
        setQrDataUrl("");
      }

      // Optional: if you want to show "Published" even after refresh,
      // you can try to infer the public PDF url here too:
      // const filePath = `${data.user.id}/menu.pdf`;
      // const { data: pub } = supabase.storage.from("menus").getPublicUrl(filePath);
      // setMenuUrl(pub.publicUrl);

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // ----------------------------------------------------
  // 2) LOG OUT
  // ----------------------------------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ----------------------------------------------------
  // 3) PDF UPLOAD HANDLER
  // ----------------------------------------------------
  const handleUploadPdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus("");
    setMenuUrl("");

    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus("Please upload a PDF file.");
      return;
    }

    if (!userId) {
      setStatus("User not ready yet. Please refresh and try again.");
      return;
    }

    setStatus("Uploading...");

    try {
      // Always overwrite the same file so QR never changes
      const filePath = `${userId}/menu.pdf`;

      const { error: uploadError } = await supabase.storage.from("menus").upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf",
      });

      if (uploadError) {
        setStatus(`Upload error: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage.from("menus").getPublicUrl(filePath);

      setMenuUrl(data.publicUrl);
      setStatus("Menu updated ✅");
    } catch (err: any) {
      setStatus(`Unexpected error: ${err?.message ?? String(err)}`);
    } finally {
      // Allow re-uploading the same file name again by resetting input value
      event.target.value = "";
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied ✅");
      setTimeout(() => setStatus(""), 1200);
    } catch {
      setStatus("Copy failed — please copy manually.");
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "menu-qr.png";
    a.click();
  };

  // ----------------------------------------------------
  // LOADING STATE
  // ----------------------------------------------------
  if (loading) {
    return (
      <main style={styles.page}>
        <h1 style={styles.h1}>Dashboard</h1>
        <p style={styles.sub}>Loading your account…</p>
      </main>
    );
  }

  const menuRoute = userId ? `/m/${userId}` : "";

  // ----------------------------------------------------
  // DASHBOARD UI
  // ----------------------------------------------------
  return (
    <main style={styles.page}>
      {/* Header */}
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
          <button onClick={handleLogout} style={styles.secondaryButton}>
            Log out
          </button>
        </div>
      </header>

      {/* Status message */}
      {status && <div style={styles.toast}>{status}</div>}

      {/* Main grid */}
      <section style={styles.grid}>
        {/* Menu card */}
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
              aria-disabled={!userId}
              onClick={(e) => {
                if (!userId) e.preventDefault();
              }}
            >
              View menu
            </a>

            <button
              type="button"
              style={{ ...styles.secondaryButton, ...(menuPageUrl ? {} : styles.disabled) }}
              onClick={() => menuPageUrl && handleCopy(menuPageUrl)}
              disabled={!menuPageUrl}
            >
              Copy link
            </button>
          </div>

          <div style={styles.divider} />

          <label style={styles.label}>Upload / replace menu (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleUploadPdf} style={styles.file} />

          {menuUrl && (
            <p style={styles.hint}>
              Latest PDF:{" "}
              <a href={menuUrl} target="_blank" rel="noreferrer" style={styles.link}>
                Open PDF
              </a>
            </p>
          )}
        </div>

        {/* QR card */}
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
              onClick={handleDownloadQr}
              disabled={!qrDataUrl}
            >
              Download QR (PNG)
            </button>

            <button
              type="button"
              style={{ ...styles.secondaryButton, ...(menuPageUrl ? {} : styles.disabled) }}
              onClick={() => menuPageUrl && handleCopy(menuPageUrl)}
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

  disabled: {
    opacity: 0.55,
    cursor: "not-allowed",
  },

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
