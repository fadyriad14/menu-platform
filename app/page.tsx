import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <header className="nav">
        <div className="brand">
          <div className="mark" aria-hidden />
          <span className="brandText">Menu</span>
        </div>

        <div className="navActions">
          <Link className="link" href="/login">
            Sign in
          </Link>
          <Link className="btn" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="heroLeft">
          <div className="eyebrow">Simple QR menu hosting</div>

          <h1 className="title">
            One QR code.
            <br />
            Always the latest menu.
          </h1>

          <p className="subtitle">
            Upload your menu as a PDF. Print one QR code. When the menu changes, replace the PDF —
            the QR stays the same.
          </p>

          <div className="ctaRow">
            <Link className="btnPrimary" href="/login">
              Get started
            </Link>
            <a className="btnGhost" href="#how">
              How it works
            </a>
          </div>

          <div className="finePrint">
            No app required. Works instantly in Safari and Chrome.
          </div>
        </div>

        <div className="heroRight">
          <div className="device">
            <div className="deviceTop">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>

            <div className="deviceBody">
              <div className="card">
                <div className="cardTitle">Your menu</div>
                <div className="line" />
                <div className="line short" />
              </div>

              <div className="card">
                <div className="cardTitle">Your QR code</div>
                <div className="qrMock" aria-hidden />
              </div>

              <div className="row">
                <div className="pill dark">Download QR</div>
                <div className="pill">Copy link</div>
              </div>
            </div>
          </div>

          <div className="note">
            Restaurants love this because they never have to reprint QR codes.
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="sectionHeader">
          <h2 className="h2">How it works</h2>
          <p className="sectionSub">Three steps. Designed to feel effortless.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="num">1</div>
            <div>
              <div className="stepTitle">Sign in</div>
              <div className="stepDesc">Access your dashboard and create your menu link.</div>
            </div>
          </div>

          <div className="step">
            <div className="num">2</div>
            <div>
              <div className="stepTitle">Upload a PDF</div>
              <div className="stepDesc">Replace it anytime — the QR code stays the same.</div>
            </div>
          </div>

          <div className="step">
            <div className="num">3</div>
            <div>
              <div className="stepTitle">Print the QR</div>
              <div className="stepDesc">Customers scan and the menu opens instantly.</div>
            </div>
          </div>
        </div>

        <div className="center">
          <Link className="btnPrimary" href="/login">
            Create your QR menu
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footerInner">
          <div className="brand">
            <div className="mark" aria-hidden />
            <span className="brandText">Menu</span>
          </div>

          <div className="footerLinks">
            <Link className="link" href="/login">
              Sign in
            </Link>
            <Link className="link" href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="copyright">© {new Date().getFullYear()} Menu</div>
      </footer>

      <style jsx global>{`
        :root {
          --bg: #ffffff;
          --fg: #0b0b0f;
          --muted: rgba(11, 11, 15, 0.7);
          --hairline: rgba(11, 11, 15, 0.12);
          --card: rgba(255, 255, 255, 0.72);
          --shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
          --radius: 18px;
        }

        /* Apple-ish system typography */
        html,
        body {
          background: var(--bg);
          color: var(--fg);
          margin: 0;
          padding: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display",
            "SF Pro Text", Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: inherit;
        }

        .page {
          min-height: 100vh;
          padding: 18px;
          background:
            radial-gradient(800px 500px at 50% -100px, rgba(0, 0, 0, 0.06), transparent 55%),
            radial-gradient(600px 450px at 90% 0%, rgba(0, 0, 0, 0.05), transparent 60%),
            #fff;
        }

        .nav {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 10px 0 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mark {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: #0b0b0f;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .brandText {
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 15px;
        }

        .navActions {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .link {
          text-decoration: none;
          opacity: 0.82;
          font-weight: 600;
        }
        .link:hover {
          opacity: 1;
        }

        .btn,
        .btnPrimary,
        .btnGhost {
          text-decoration: none;
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 700;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.12s ease, opacity 0.12s ease;
        }

        .btn {
          border: 1px solid var(--hairline);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
        }

        .btnPrimary {
          background: #0b0b0f;
          color: #fff;
          border: 1px solid #0b0b0f;
          padding: 12px 18px;
        }

        .btnGhost {
          border: 1px solid var(--hairline);
          background: transparent;
          padding: 12px 18px;
          opacity: 0.9;
        }

        .btn:hover,
        .btnPrimary:hover,
        .btnGhost:hover {
          transform: translateY(-1px);
        }

        .hero {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          align-items: center;
          padding: 18px 0 8px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--hairline);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(10px);
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .title {
          margin: 14px 0 12px;
          font-size: 52px;
          line-height: 1.02;
          letter-spacing: -0.05em;
        }

        .subtitle {
          margin: 0 0 18px;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
        }

        .ctaRow {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 10px;
        }

        .finePrint {
          font-size: 12px;
          color: var(--muted);
          opacity: 0.9;
        }

        .heroRight {
          display: grid;
          gap: 10px;
          justify-items: end;
        }

        .device {
          width: 100%;
          max-width: 420px;
          border-radius: var(--radius);
          border: 1px solid var(--hairline);
          background: var(--card);
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .deviceTop {
          display: flex;
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.55);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.18);
        }

        .deviceBody {
          padding: 14px;
          display: grid;
          gap: 12px;
        }

        .card {
          border: 1px solid rgba(0, 0, 0, 0.10);
          background: #fff;
          border-radius: 16px;
          padding: 12px;
        }

        .cardTitle {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.02em;
          opacity: 0.72;
          margin-bottom: 10px;
        }

        .line {
          height: 10px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.08);
        }
        .line.short {
          width: 70%;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.06);
        }

        .qrMock {
          width: 160px;
          height: 160px;
          margin: 0 auto;
          border-radius: 18px;
          border: 1px dashed rgba(0, 0, 0, 0.18);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.01)),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.12) 0,
              rgba(0, 0, 0, 0.12) 6px,
              transparent 6px,
              transparent 12px
            );
          opacity: 0.7;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .pill {
          flex: 1;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.06);
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 13px;
          opacity: 0.9;
        }

        .pill.dark {
          background: #0b0b0f;
          color: #fff;
          border-color: #0b0b0f;
        }

        .note {
          max-width: 420px;
          font-size: 12px;
          color: var(--muted);
          text-align: right;
          padding-right: 4px;
        }

        .section {
          max-width: 1120px;
          margin: 0 auto;
          padding: 26px 0 32px;
        }

        .sectionHeader {
          margin-bottom: 14px;
        }

        .h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.03em;
        }

        .sectionSub {
          margin: 8px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .step {
          display: flex;
          gap: 12px;
          border: 1px solid rgba(0, 0, 0, 0.10);
          border-radius: 18px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.85);
        }

        .num {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: #0b0b0f;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 900;
        }

        .stepTitle {
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .stepDesc {
          color: var(--muted);
          line-height: 1.55;
        }

        .center {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .footer {
          max-width: 1120px;
          margin: 0 auto;
          padding: 18px 0 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .footerInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footerLinks {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .copyright {
          margin-top: 10px;
          font-size: 12px;
          color: var(--muted);
        }

        /* Responsive (iPhone-perfect) */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .heroRight {
            justify-items: start;
          }
          .note {
            text-align: left;
          }
          .steps {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 42px;
          }
        }

        @media (max-width: 420px) {
          .title {
            font-size: 38px;
          }
        }
      `}</style>
    </main>
  );
}
