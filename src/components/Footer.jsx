import { personalInfo } from "../data/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p>"Price is what you pay. Value is what you get." — Warren Buffett</p>
        <p>"When something is important enough, you do it even if the odds are not in your favor." — Elon Musk</p>
      </div>
    </footer>
  );
}
