"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  // ----------------------------------------------------
  // AUTH CHECK + QR GENERATION
  // ----------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUserEmail(data.user.email ?? null);
      setUserId(data.user.id);

      // ✅ THIS IS THE FIX:
      // Dynamically determine site URL at runtime
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "";

      const menuPageUrl = `${siteUrl}/m/${data.user.id}`;

      try {
        const qr = await QRCode.toDataURL(menuPageUrl, {
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
  // LOGOUT
  // ----------------------------------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ----------------------------------------------------
  // PDF UPLOAD
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
      setStatus("User not ready. Refresh and try again.");
      return;
    }

    setStatus("Uploading...");

    const filePath = `${userId}/menu.pdf`;

    const { error } = await supabase.storage
      .from("menus")
      .upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf",
      });

    if (error) {
      setStatus(`Upload error: ${error.message}`);
      return;
    }

    const { data } = supabase.storage
      .from("menus")
      .getPublicUrl(filePath);

    setMenuUrl(data.publicUrl);
    setStatus("Upload complete ✅");
  };

  // ----------------------------------------------------
  // LOADING
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
  // UI
  // ----------------------------------------------------
  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>
        Logged in as: <b>{userEmail}</b>
      </p>

      <h3 style={{ marginTop: 20 }}>Upload Menu PDF</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUploadPdf}
      />

      {status && <p style={{ marginTop: 10 }}>{status}</p>}

      {menuUrl && (
        <p>
          Public PDF:{" "}
          <a href={menuUrl} target="_blank" rel="noreferrer">
            Open PDF
          </a>
        </p>
      )}

      <div style={{ marginTop: 30 }}>
        <h3>Menu QR Code</h3>

        {userId && (
          <p>
            Menu page:{" "}
            <a href={`/m/${userId}`} target="_blank" rel="noreferrer">
              /m/{userId}
            </a>
          </p>
        )}

        {qrDataUrl && (
          <img
            src={qrDataUrl}
            alt="Menu QR Code"
            style={{ width: 220, marginTop: 10 }}
          />
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
