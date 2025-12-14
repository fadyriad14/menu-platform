"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  // QR code image (base64)
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // The public menu page URL we want the QR to open
  const [menuPageUrl, setMenuPageUrl] = useState<string>("");

  // ----------------------------------------------------
  // 1) AUTH CHECK (runs once on page load)
  // ----------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      // Not logged in → redirect to /login
      if (error || !data.user) {
        router.push("/login");
        return;
      }

      const id = data.user.id;

      // Save user info
      setUserEmail(data.user.email ?? null);
      setUserId(id);

      // IMPORTANT:
      // QR must point to the PUBLIC menu route (/m/<id>), not the dashboard.
      // siteUrl should be your Vercel URL in production.
      const siteUrl =
        (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "") ||
        "http://localhost:3000";

      const publicMenuUrl = `${siteUrl}/m/${id}`;
      setMenuPageUrl(publicMenuUrl);

      try {
        // Generate QR code image that opens the public menu URL
        const qr = await QRCode.toDataURL(publicMenuUrl, {
          width: 300,
          margin: 1,
        });
        setQrDataUrl(qr);
      } catch {
        setQrDataUrl("");
      }

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
  const handleUploadPdf = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      // Always overwrite the same file so the QR never changes
      const filePath = `${userId}/menu.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("menus")
        .upload(filePath, file, {
          upsert: true,
          contentType: "application/pdf",
        });

      if (uploadError) {
        setStatus(`Upload error: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage.from("menus").getPublicUrl(filePath);

      setMenuUrl(data.publicUrl);
      setStatus("Upload complete ✅");
    } catch (err: any) {
      setStatus(`Unexpected error: ${err?.message ?? String(err)}`);
    }
  };

  // ----------------------------------------------------
  // LOADING STATE
  // ----------------------------------------------------
  if (loading) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Dashboard</h1>
        <p>Loading...</p>
      </main>
    );
  }

  // ----------------------------------------------------
  // DASHBOARD UI
  // ----------------------------------------------------
  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>
        Logged in as: <b>{userEmail}</b>
      </p>

      <h3 style={{ marginTop: 20 }}>Upload Menu PDF</h3>
      <input type="file" accept="application/pdf" onChange={handleUploadPdf} />

      {status && <p style={{ marginTop: 10 }}>{status}</p>}

      {menuUrl && (
        <p>
          Public PDF link:{" "}
          <a href={menuUrl} target="_blank" rel="noreferrer">
            Open PDF
          </a>
        </p>
      )}

      <div style={{ marginTop: 30 }}>
        <h3>Menu QR Code</h3>

        {/* Show the FULL public URL (this is what the QR points to) */}
        {menuPageUrl && (
          <p style={{ fontSize: 14 }}>
            Menu page:{" "}
            <a href={menuPageUrl} target="_blank" rel="noreferrer">
              {menuPageUrl}
            </a>
          </p>
        )}

        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Menu QR Code"
            style={{ width: 220, marginTop: 10 }}
          />
        ) : (
          <p>QR not generated.</p>
        )}
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: 8,
            cursor: "pointer",
            background: "white",
          }}
        >
          Log Out
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Home
        </Link>
      </div>
    </main>
  );
}
