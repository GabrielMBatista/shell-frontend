import Link from 'next/link';

export default function Footer() {
  return (
    <ui-footer >
      <div slot="contact">📧 contact@example.com</div>
      <div slot="links">
        <Link href="/privacy" passHref legacyBehavior>
          <a>Privacy Policy</a>
        </Link>
        <Link href="/terms" passHref legacyBehavior>
          <a>Terms of Service</a>
        </Link>
      </div>
      <div slot="social">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <ui-icon name="twitter"></ui-icon>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <ui-icon name="facebook"></ui-icon>
        </a>
      </div>
    </ui-footer>
  );
}
