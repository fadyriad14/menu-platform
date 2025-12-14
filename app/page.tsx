// Import Next.js Link component for client-side navigation
import Link from "next/link";

// This is the homepage component
// It is the default export for the "/" route
export default function Home() {
  return (
    // <main> wraps the main content of the page
    <main style={{ padding: 40 }}>
      {/* Page title */}
      <h1>Menu Platform</h1>

      {/* Short description */}
      <p>Upload your menu. Generate a QR code.</p>

      {/* Spacing container */}
      <div style={{ marginTop: 20 }}>
        {/* 
          Link component:
          - Navigates to /login
          - Faster than a normal <a> tag
        */}
        <Link
          href="/login"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
