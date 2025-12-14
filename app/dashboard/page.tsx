"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

import { supabase } from "../../lib/supabaseClient";
import DashboardView from "./DashboardView";

export default function DashboardPage() {
  const router = useRouter();

  // -------------------------
  // User + auth state
  // -------------------------
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Menu + QR state
  // -------------------------
  const [menuUrl, setMenuUrl] = useState<string>("");
  const [menuPageUrl, setMenuPageUrl] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // -------------------------
  // UI state
  // -------------------------
  const [status, setStatus] = useState<string>("");

  const hasMenu = useMemo(() => Boolean(menuUrl), [menuUrl]);

  // ----------------------------------------------------
  // AUTH CHECK (runs once on page load)
  // ----------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUserEmail(data.user.email ?? null);
      setUserId(data.user.id);

      // Build public menu page URL
      const origin = window.location.origin;
      const publicMenuUrl = `${origin}/m/${data.user.id}`;
      setMenuPageUrl(publicMenuUrl);

      // Generate QR code
      try {
        const qr = await QRCode.toDataURL(publicMenuUrl, {
          width: 360,
          margin: 1,
        });
        setQrDataUrl(qr);
      } catch {
        setQrDataUrl("");
      }

      // OPTIONAL: infer menu existence on refresh
      const filePath = `${data.user.id}/menu.pdf`;
      const { data: pub } = supabase.storage.from("menus").getPublicUrl(filePath);
      if (pub?.publicUrl) {
        setMenuUrl(pub.publicUrl);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // ----------------------------------------------------
  // LOG OUT
  // ----------------------------------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ----------------------------------------------------
  // PDF UPLOAD HANDLER
  // ----------------------------------------------------
  const handleUploadPdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus("");

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
      const filePath = `${userId}/menu.pdf`;

      const { error } = await supabase.storage.from("menus").upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf",
      });

      if (error) {
        setStatus(`Upload error: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from("menus").getPublicUrl(filePath);
      setMenuUrl(data.publicUrl);
      setStatus("Menu updated ✅");
    } catch (err: any) {
      setStatus(`Unexpected error: ${err?.message ?? String(err)}`);
    } finally {
      // Allow uploading the same file again
      event.target.value = "";
    }
  };

  // ----------------------------------------------------
  // UTIL ACTIONS
  // ----------------------------------------------------
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
      <main style={{ padding: 40 }}>
        <h1>Dashboard</h1>
        <p>Loading your account…</p>
      </main>
    );
  }

  // ----------------------------------------------------
  // RENDER UI
  // ----------------------------------------------------
  return (
    <DashboardView
      userEmail={userEmail}
      userId={userId}
      status={status}
      hasMenu={hasMenu}
      menuUrl={menuUrl}
      menuPageUrl={menuPageUrl}
      qrDataUrl={qrDataUrl}
      onLogout={handleLogout}
      onUploadPdf={handleUploadPdf}
      onCopy={handleCopy}
      onDownloadQr={handleDownloadQr}
    />
  );
}
