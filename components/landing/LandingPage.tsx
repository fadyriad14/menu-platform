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
          <span className={styles.brandText}>Menu</span>
          <span className={styles.brandTag}>QR menus, done right</span>
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
            <span className={styles.kickerDot} aria-hidden />
            QR menu hosting • premium, simple, fast
          </div>

          <h1 className={styles.h1}>
            A menu link that feels
            <span className={styles.h1Accent}> effortless</span>.
          </h1>

          <p className={styles.lede}>
            Upload your PDF once, get a beautiful menu page, and a QR code that never changes. Update
            anytime—your guests always see the latest version.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/dashboard" className={styles.ctaPrimary}>
              Get started
              <span className={styles.ctaArrow} aria-hidden>
                →
              </span>
            </Link>

            <Link href="/login" className={styles.ctaSecondary}>
              Sign in
            </Link>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon} aria-hidden>
                ✓
              </div>
              <div>
                <div className={styles.trustTitle}>Instant public page</div>
                <div className={styles.trustText}>Mobile-first menu route</div>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIcon} aria-hidden>
                ✓
              </div>
              <div>
                <div className={styles.trustTitle}>QR stays the same</div>
                <div className={styles.trustText}>Swap PDFs anytime</div>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIcon} aria-hidden>
                ✓
              </div>
              <div>
                <div className={styles.trustTitle}>Clean & reliable</div>
                <div className={styles.trustText}>No clutter, no ads</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              <div className={styles.windowDots} aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewTopText}>Menu Preview</div>
              <div className={styles.previewTopPill}>Live</div>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.previewMini}>
                <div className={styles.previewMiniTitle}>Today’s menu.pdf</div>
                <div className={styles.skel} />
                <div className={styles.skel} />
                <div className={`${styles.skel} ${styles.skelShort}`} />
              </div>

              <div className={styles.previewQR} aria-hidden>
                <div className={styles.qrInner} />
              </div>

              <div className={styles.previewActions}>
                <div className={styles.actionChip}>Upload</div>
                <div className={`${styles.actionChip} ${styles.actionChipDark}`}>QR</div>
                <div className={styles.actionChip}>Share</div>
              </div>

              <div className={styles.previewNote}>
                Update the PDF anytime — your QR always points to the latest menu.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Premium workflow. Minimal steps.</h2>
          <p className={styles.sub}>
            Designed for busy service—everything you need, nothing you don’t.
          </p>
        </div>

        <div className={styles.grid3}>
          <div className={styles.feature}>
            <div className={styles.featureTop}>
              <div className={styles.featureIcon} aria-hidden>
                ⤒
              </div>
              <div className={styles.featureTitle}>Upload PDF</div>
            </div>
            <div className={styles.featureText}>
              Drag & drop your menu. Replace it any time without changing the QR.
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureTop}>
              <div className={styles.featureIcon} aria-hidden>
                ⧉
              </div>
              <div className={styles.featureTitle}>Public menu page</div>
            </div>
            <div className={styles.featureText}>
              Clean, fast route that looks great on iPhone and Android.
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureTop}>
              <div className={styles.featureIcon} aria-hidden>
                ◎
              </div>
              <div className={styles.featureTitle}>QR stays constant</div>
            </div>
            <div className={styles.featureText}>
              Print once. Keep forever. Update content whenever you want.
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Set up in minutes</h2>
          <p className={styles.sub}>A calm flow that just works.</p>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div>
              <div className={styles.stepTitle}>Sign in</div>
              <div className={styles.stepText}>Open your dashboard and create your menu link.</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div>
              <div className={styles.stepTitle}>Upload menu</div>
              <div className={styles.stepText}>Drop in a PDF—your public page updates instantly.</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div>
              <div className={styles.stepTitle}>Print the QR</div>
              <div className={styles.stepText}>Put it on tables, windows, receipts, anywhere.</div>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <Link href="/dashboard" className={styles.ctaPrimary}>
            Open dashboard
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerMark} aria-hidden />
            <span className={styles.footerText}>Menu</span>
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
          © {new Date().getFullYear()} Menu. Crafted for fast service.
        </div>
      </footer>
    </main>
  );
}
