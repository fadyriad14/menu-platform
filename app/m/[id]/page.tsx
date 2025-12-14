// PUBLIC menu page (no login required)
// URL example: /m/<id>
// This page builds the public PDF URL and renders it with a mobile-friendly viewer.

import { createClient } from "@supabase/supabase-js";
import MenuViewer from "./MenuViewer";

type PageProps = {
  params: Promise<{ id: string }>;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function MenuPage(props: PageProps) {
  const { id } = await props.params;

  if (!id) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Menu</h1>
        <p>Missing menu id in the URL.</p>
      </main>
    );
  }

  const filePath = `${id}/menu.pdf`;
  const { data } = supabase.storage.from("menus").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  return (
    <main style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Menu</h1>

      {/* Viewer handles open/download links + embedded view */}
      <MenuViewer pdfUrl={publicUrl} />
    </main>
  );
}
