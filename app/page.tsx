import Link from "next/link";

export default function HomePage() {
  return (
    <main style={styles.page}>
      {/* Top Nav */}
      <header style={styles.nav}>
        <div style={styles.brand}>
          <div style={styles.logoMark} aria-hidden />
          <span style={styles.brandText}>Menu</span>
        </div>

        <nav style={styles.navActions}>
          <Link href="/login" style={styles.secondaryButton}>
            Sign in
          </Link>
          <Link href="/dashboard" style={styles.primaryButton}>
            Go to dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>QR menu hosting • Simple & fast</div>

          <h1 style={styles.h1}>
            Your menu, always up to date — with a single QR code.
          </h1>

          <p style={styles.lede}>
            Upload a PDF once. Print one QR code. When your menu changes, replace the PDF — the QR stays the same.
          </p>

          <div style={styles.ctaRow}>
            <Link href="/login" style={styles.primaryButtonLarge}>
              Get started
            </Link>
            <a href="#how-it-works" style={styles.ghostButtonLarge}>
              How it works
            </a>
          </div>

          <div style={styles.trustRow}>
            <div style={styles.trustItem}>
              <span style={styles.trustDot} />
              No app required for customers
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustDot} />
              Works on iPhone & Android
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustDot} />
              Replace menu anytime
            </div>
          </div>
        </div>

        {/* Hero card */}
        <div style={styles.heroRight}>
          <div style={styles.previewCard}>
            <div style={styles.previewHeader}>
              <div style={styles.previewTitle}>Restaurant Dashboard</div>
              <div style={styles.previewPill}>Live</div>
            </div>

            <div style={styles.previewBody}>
              <div style={styles.previewBlock}>
                <div style={styles.previewLabel}>Your menu</div>
                <div style={styles.previewLine} />
                <div style={styles.previewLineShort} />
              </div>

              <div style={styles.previewBlock}>
                <div style={styles.previewLabel}>Your QR code</div>
                <div style={styles.qrMock} aria-hidden>
                  <div style={styles.qrMockInner} />
                </div>
              </div>

              <div style={styles.previewButtons}>
                <div style={styles.previewBtnPrimary} />
                <div style={styles.previewBtnSecondary} />
              </div>
            </div>
          </div>

          <div style={styles.miniNote}>
            Tip: Restaurants love this because the QR code never has to be reprinted.
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section style={styles.features}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.h2}>Built for restaurants</h2>
          <p style={styles.sectionSub}>
            A clean workflow that feels simple for staff and seamless for customers.
          </p>
        </div>

        <div style={styles.grid}>
          <FeatureCard
            title="One QR code forever"
            desc="Print it once. Keep it on tables, windows, flyers, receipts — your menu link stays stable."
          />
          <FeatureCard
            title="Instant updates"
            desc="Replace the PDF anytime. Customers always see the latest version when they scan."
          />
          <FeatureCard
            title="Mobile-first viewing"
            desc="Customers don’t need an app. The menu opens instantly in the browser and displays beautifully."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={styles.how}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.h2}>How it works</h2>
          <p style={styles.sectionSub}>Three steps. That’s it.</p>
        </div>

        <div style={styles.steps}>
          <Step n="1" title="Sign in" desc="Create your restaurant account and access your dashboard." />
          <Step n="2" title="Upload menu PDF" desc="Upload your menu as a PDF. You can replace it anytime." />
          <Step n="3" title="Download & print QR" desc="Print the QR and place it anywhere customers scan." />
        </div>

        <div style={styles.centerCta}>
          <Link href="/login" style={styles.primaryButtonLarge}>
            Create your QR menu
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.brand}>
            <div style={styles.logoMark} aria-hidden />
            <span style={styles.brandText}>Menu</span>
          </div>
          <div style={styles.footerLinks}>
            <Link href="/login" style={styles.footerLink}>
              Sign in
            </Link>
            <Link href="/dashboard" style={styles.footerLink}>
              Dashboard
            </Link>
          </div>
        </div>
        <div style={styles.footerFine}>
          © {new Date().getFullYear()} Menu. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureTitle}>{title}</div>
      <div style={styles.featureDesc}>{desc}</div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div style={styles.stepCard}>
      <div style={styles.stepNum}>{n}</div>
      <div>
        <div style={styles.stepTitle}>{title}</div>
        <div style={styles.stepDesc}>{desc}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 18,
    background:
      "radial-gradient(900px 500px at 20% 10%, rgba(0,0,0,0.08), transparent 60%), radial-gradient(700px 500px at 80% 0%, rgba(0,0,0,0.06), transparent 55%), #fff",
    color: "#0b0b0f",
  },

  nav: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0 18px",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#0b0b0f",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  brandText: { fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" },

  navActions: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },

  hero: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "18px 0 8px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 18,
    alignItems: "center",
  },

  heroLeft: { padding: "14px 0" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(0,0,0,0.12)",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(6px)",
    fontSize: 12,
    fontWeight: 600,
    opacity: 0.9,
  },
  h1: { fontSize: 46, lineHeight: 1.04, margin: "14px 0 12px", letterSpacing: "-0.04em" },
  lede: { fontSize: 16, lineHeight: 1.6, margin: "0 0 18px", opacity: 0.82, maxWidth: 560 },

  ctaRow: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 },

  trustRow: { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 6, opacity: 0.85 },
  trustItem: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 },
  trustDot: { width: 8, height: 8, borderRadius: 99, background: "#0b0b0f", opacity: 0.75 },

  heroRight: { display: "grid", gap: 10 },
  previewCard: {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 18,
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
    overflow: "hidden",
  },
  previewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  previewTitle: { fontWeight: 800, letterSpacing: "-0.02em" },
  previewPill: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    opacity: 0.9,
  },
  previewBody: { padding: 14, display: "grid", gap: 12 },
  previewBlock: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 12,
    background: "#fff",
  },
  previewLabel: { fontSize: 12, fontWeight: 700, opacity: 0.7, marginBottom: 10 },
  previewLine: { height: 10, borderRadius: 8, background: "rgba(0,0,0,0.08)" },
  previewLineShort: { height: 10, width: "70%", borderRadius: 8, marginTop: 8, background: "rgba(0,0,0,0.06)" },

  qrMock: {
    width: 150,
    height: 150,
    borderRadius: 16,
    border: "1px dashed rgba(0,0,0,0.18)",
    display: "grid",
    placeItems: "center",
    margin: "0 auto",
    background: "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))",
  },
  qrMockInner: {
    width: 110,
    height: 110,
    borderRadius: 14,
    background: "repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0, rgba(0,0,0,0.10) 6px, transparent 6px, transparent 12px)",
    opacity: 0.7,
  },

  previewButtons: { display: "flex", gap: 10 },
  previewBtnPrimary: { height: 38, flex: 1, borderRadius: 12, background: "#0b0b0f" },
  previewBtnSecondary: { height: 38, flex: 1, borderRadius: 12, background: "rgba(0,0,0,0.10)" },

  miniNote: { fontSize: 12, opacity: 0.7, paddingLeft: 4 },

  features: { maxWidth: 1120, margin: "0 auto", padding: "28px 0 14px" },
  sectionTitleRow: { marginBottom: 14 },
  h2: { fontSize: 26, margin: 0, letterSpacing: "-0.03em" },
  sectionSub: { margin: "8px 0 0", opacity: 0.75, maxWidth: 640, lineHeight: 1.55 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  featureCard: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 18,
    padding: 16,
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
  },
  featureTitle: { fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 },
  featureDesc: { opacity: 0.78, lineHeight: 1.55 },

  how: { maxWidth: 1120, margin: "0 auto", padding: "24px 0 34px" },
  steps: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 },
  stepCard: {
    display: "flex",
    gap: 12,
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 18,
    padding: 16,
    background: "rgba(255,255,255,0.85)",
  },
  stepNum: {
    width: 34,
    height: 34,
    borderRadius: 12,
    background: "#0b0b0f",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },
  stepTitle: { fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 },
  stepDesc: { opacity: 0.78, lineHeight: 1.5 },

  centerCta: { marginTop: 16, display: "flex", justifyContent: "center" },

  footer: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "22px 0 10px",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    marginTop: 20,
  },
  footerInner: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },
  footerLinks: { display: "flex", gap: 12, flexWrap: "wrap" },
  footerLink: { textDecoration: "none", opacity: 0.8, color: "#0b0b0f" },
  footerFine: { marginTop: 10, fontSize: 12, opacity: 0.65 },

  mono: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },

  primaryButton: {
    textDecoration: "none",
    background: "#0b0b0f",
    color: "white",
    border: "1px solid #0b0b0f",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    textDecoration: "none",
    background: "rgba(255,255,255,0.7)",
    color: "#0b0b0f",
    border: "1px solid rgba(0,0,0,0.12)",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonLarge: {
    textDecoration: "none",
    background: "#0b0b0f",
    color: "white",
    border: "1px solid #0b0b0f",
    padding: "12px 16px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ghostButtonLarge: {
    textDecoration: "none",
    background: "transparent",
    color: "#0b0b0f",
    border: "1px solid rgba(0,0,0,0.14)",
    padding: "12px 16px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
