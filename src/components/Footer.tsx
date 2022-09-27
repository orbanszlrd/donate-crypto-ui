import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaPaypal,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <span>
        <a
          href="https://github.com/orbanszlrd/donate-crypto-ui"
          title="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={24}></FaGithub>
        </a>
      </span>
      <span>
        <a
          href="https://www.linkedin.com/in/orban-szilard/"
          title="Linkedin"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={24}></FaLinkedin>
        </a>
      </span>
      <span>
        <a
          href="https://www.facebook.com/opofa"
          title="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook size={24}></FaFacebook>
        </a>
      </span>
      <span>
        <a
          href="https://www.instagram.com/orbanszlrd"
          title="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagramSquare size={24}></FaInstagramSquare>
        </a>
      </span>
      <span>
        <a
          href="https://www.paypal.com/paypalme/orbanszlrd"
          title="PayPal"
          target="_blank"
          rel="noreferrer"
        >
          <FaPaypal size={24}></FaPaypal>
        </a>
      </span>
    </footer>
  );
};

export default Footer;
