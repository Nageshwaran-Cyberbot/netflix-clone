import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h3>Account Centre</h3>
            <ul>
              <li><a href="#account">Account Settings</a></li>
              <li><a href="#profile">Manage Profiles</a></li>
              <li><a href="#subscription">Subscription</a></li>
              <li><a href="#billing">Billing Details</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#feedback">Send Feedback</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#investor">Investor Relations</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#terms">Terms of Use</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#cookies">Cookie Preferences</a></li>
              <li><a href="#corporate">Corporate Info</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <button className="footer-service-code">Service Code</button>
          <p>&copy; {new Date().getFullYear()} Netflix Clone. Built with React + TypeScript</p>
          <p className="footer-disclaimer">
            This is a clone project for educational purposes. All movie data from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
