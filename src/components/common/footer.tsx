import Link from 'next/link';

export default function Footer() {
  return (
    <ui-footer>
      <div slot="links">
        <Link href="/privacy" passHref>
          <p>Privacy Policy</p>
        </Link>
        <Link href="/terms" passHref>
          <p>Terms of Service</p>
        </Link>
      </div>
      <div slot="social">
        <a
          href="https://www.linkedin.com/in/gabriel-marques-batista"
          target="_blank"
          aria-label="Linkedin"
        >
          <ui-icon name="linkedin"></ui-icon>
        </a>
        <a href="https://github.com/GabrielMBatista" target="_blank" aria-label="Github">
          <ui-icon name="github"></ui-icon>
        </a>
        <a
          href="https://wa.me/5511951222379?text=Ol%C3%A1%2C%20Gabriel!%20Encontrei%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20poss%C3%ADvel%20oportunidade."
          target="_blank"
          aria-label="WhatsApp"
        >
          <ui-icon name="whatsapp"></ui-icon>
        </a>
      </div>
      <div slot="contact">📧 Gabbriel_gbl2@hotmail.com</div>
    </ui-footer>
  );
}
