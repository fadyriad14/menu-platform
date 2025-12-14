// PUBLIC menu page (no login required)
//
// URL example:
//   /m/<userId>
// This page builds a public PDF URL for: <userId>/menu.pdf in the "menus" bucket

import { createClient } from "@supabase/supabase-js";

type PageProps = {
  params: Promise<{ id: string }>;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function MenuPage(props: PageProps) {
  // In Next.js 15/16, params can be a Promise in server components
  const { id } = await props.params;

  // If somehow the route is missing an id, show a friendly message
  if (!id) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Menu</h1>
        <p>Missing menu id in the URL.</p>
      </main>
    );
  }

  const filePath = `${id}/menu.pdf`;

  // Build public URL for the PDF in the "menus" bucket
  const { data } = supabase.storage.from("menus").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 12 }}>Menu</h1>

      <div style={{ marginBottom: 12 }}>
        <a href={publicUrl} target="_blank" rel="noreferrer">
          Open PDF in new tab
        </a>
      </div>

      <iframe
        src={publicUrl}
        style={{ width: "100%", height: "85vh", border: "1px solid #ddd" }}
        title="Menu PDF"
      />
    </main>
  );
}
