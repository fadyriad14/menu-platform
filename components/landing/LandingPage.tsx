import Link from "next/link";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.bg} aria-hidden />

      {/* Nav */}
      <header className={styles.nav}>
        <div className={styles.brand}>
          <div className={styles.mark} aria-hidden />
          <div className={styles.brandStack}>
            <span className={styles.brandText}>Menu</span>
            <span className={styles.brandSub}>Hospitality-first QR menus</span>
          </div>
        </div>

        <nav className={styles.navActions}>
          <Link href="/login" className={styles.navLink}>
            Sign in
          </Link>
          <Link href="/dashboard" className={styles.navButton}>
            Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.kicker}>
            <span className={styles.kickerPip} aria-hidden />
            Elegant QR menus for restaurants, cafes, and bars
          </div>

          <h1 className={styles.h1}>
            A premium menu experience,
            <span className={styles.h1Accent}> without the friction</span>.
          </h1>

          <p className={styles.lede}>
            Upload your PDF once. Get a beautiful menu page and a QR code that never changes. Update
            your menu anytime—guests always see the latest version.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/dashboard" className={styles.ctaPrimary}>
              Get started <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              Sign in
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statTop}>One QR</div>
              <div className={styles.statBottom}>never reprint</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statTop}>Fast</div>
              <div className={styles.statBottom}>mobile-first</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statTop}>Clean</div>
              <div className={styles.statBottom}>no clutter</div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={styles.heroRight}>
          <div className={styles.preview}>
            <div className={styles.previewTop}>
              <div className={styles.dots} aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewTitle}>Menu Preview</div>
              <div className={styles.previewPill}>Live</div>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.paper}>
                <div className={styles.paperHeader}>
                  <div className={styles.paperBadge}>Today’s menu</div>
                  <div className={styles.paperName}>menu.pdf</div>
                </div>

                <div className={styles.paperLines}>
                  <div className={styles.line} />
                  <div className={styles.line} />
                  <div className={`${styles.line} ${styles.lineShort}`} />
                </div>

                <div className={styles.divider} />

                <div className={styles.menuRow}>
                  <div className={styles.menuItem}>
                    <div className={styles.itemName}>Signature Latte</div>
                    <div className={styles.itemDesc}>espresso • vanilla • oat</div>
                  </div>
                  <div className={styles.itemPrice}>$6</div>
                </div>

                <div className={styles.menuRow}>
                  <div className={styles.menuItem}>
                    <div className={styles.itemName}>House Salad</div>
                    <div className={styles.itemDesc}>citrus vinaigrette</div>
                  </div>
                  <div className={styles.itemPrice}>$12</div>
                </div>
              </div>

              <div className={styles.qrBlock}>
                <div className={styles.qr} aria-hidden />
                <div className={styles.qrCaption}>Scan to view</div>
              </div>

              <div className={styles.chips}>
                <div className={styles.chip}>Upload</div>
                <div className={`${styles.chip} ${styles.chipAccent}`}>QR</div>
                <div className={styles.chip}>Share</div>
              </div>

              <div className={styles.previewNote}>
                Replace the PDF anytime—your QR stays the same.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Made for hospitality</h2>
          <p className={styles.sub}>
            A clean workflow that feels premium—from your dashboard to your guest’s phone.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.icon} aria-hidden>
                ⤒
              </div>
              <div className={styles.cardTitle}>Upload once</div>
            </div>
            <div className={styles.cardText}>
              Drop in a PDF. Update later in seconds without changing your printed materials.
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.icon} aria-hidden>
                ⧉
              </div>
              <div className={styles.cardTitle}>Beautiful menu page</div>
            </div>
            <div className={styles.cardText}>
              A clean public link that reads well on mobile—ideal for tables and counters.
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.icon} aria-hidden>
                ◎
              </div>
              <div className={styles.cardTitle}>One QR forever</div>
            </div>
            <div className={styles.cardText}>
              Print one code and forget it. Your guests always see the newest menu.
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Set up in minutes</h2>
          <p className={styles.sub}>Calm, simple, reliable—built for busy shifts.</p>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div>
              <div className={styles.stepTitle}>Sign in</div>
              <div className={styles.stepText}>Open your dashboard and create a menu link.</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div>
              <div className={styles.stepTitle}>Upload menu</div>
              <div className={styles.stepText}>Drop in a PDF—your page updates instantly.</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div>
              <div className={styles.stepTitle}>Print the QR</div>
              <div className={styles.stepText}>Place it on tables, windows, receipts—anywhere.</div>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <Link href="/dashboard" className={styles.ctaPrimary}>
            Open dashboard <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerMark} aria-hidden />
            <div className={styles.footerStack}>
              <span className={styles.footerText}>Menu</span>
              <span className={styles.footerSub}>Premium QR menu hosting</span>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <Link className={styles.footerLink} href="/login">
              Sign in
            </Link>
            <Link className={styles.footerLink} href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Menu. Crafted for hospitality.
        </div>
      </footer>
    </main>
  );
}
