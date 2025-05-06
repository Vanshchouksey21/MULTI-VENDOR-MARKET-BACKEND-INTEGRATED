import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

// Modal Content Components
const ProductModal = () => (
  <div>
    <h2>Our Products</h2>
    <p>Explore our extensive collection of top-notch products from multiple vendors. Find what you need, at the best prices.</p>
  </div>
);

const AboutModal = () => (
  <div>
    <h2>About Us</h2>
    <p>MultiVendor is a marketplace that brings you the best products from trusted vendors worldwide. Our mission is to offer you high-quality products and exceptional customer service.</p>
  </div>
);

const ContactModal = () => (
  <div>
    <h2>Contact Us</h2>
    <p>If you have any questions or need assistance, don't hesitate to reach out. We're here to help you!</p>
    <p>Email: support@multivendor.com</p>
    <p>Phone: +1 234 567 890</p>
  </div>
);

const PrivacyModal = () => (
  <div>
    <h2>Privacy Policy</h2>
    <p>We respect your privacy and are committed to protecting your personal information. Please review our privacy policy to understand how we manage your data.</p>
  </div>
);

const CustomerServiceModal = () => (
  <div>
    <h2>Customer Service</h2>
    <p>Need help? Check our help center, return policies, or FAQs for quick assistance.</p>
    <ul>
      <li><Link to="/help" className="text-light">Help Center</Link></li>
      <li><Link to="/returns" className="text-light">Returns & Exchanges</Link></li>
      <li><Link to="/faq" className="text-light">Frequently Asked Questions</Link></li>
    </ul>
  </div>
);

const Footer = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCustomerServiceModal, setShowCustomerServiceModal] = useState(false);

  return (
    <>
      <footer className="custom-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h4 className="brand-title">MultiVendor</h4>
              <p>Your go-to platform for discovering top-notch products from multiple vendors.</p>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="section-title">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Button variant="link" className="footer-link" onClick={() => setShowProductModal(true)}>Products</Button></li>
                <li><Button variant="link" className="footer-link" onClick={() => setShowAboutModal(true)}>About Us</Button></li>
                <li><Button variant="link" className="footer-link" onClick={() => setShowContactModal(true)}>Contact Us</Button></li>
                <li><Button variant="link" className="footer-link" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</Button></li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="section-title">Customer Service</h5>
              <ul className="list-unstyled">
                <li><Button variant="link" className="footer-link" onClick={() => setShowCustomerServiceModal(true)}>Help Center</Button></li>
                <li><Button variant="link" className="footer-link" onClick={() => setShowCustomerServiceModal(true)}>Returns & Exchanges</Button></li>
                <li><Button variant="link" className="footer-link" onClick={() => setShowCustomerServiceModal(true)}>FAQs</Button></li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="section-title">Follow Us</h5>
              <div className="d-flex gap-3 social-icons">
                <a href="#" className="icon"><FaFacebookF /></a>
                <a href="#" className="icon"><FaTwitter /></a>
                <a href="#" className="icon"><FaInstagram /></a>
                <a href="#" className="icon"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="footer-bottom">© 2025 MultiVendor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton><Modal.Title>Our Products</Modal.Title></Modal.Header>
        <Modal.Body><ProductModal /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowProductModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      <Modal show={showAboutModal} onHide={() => setShowAboutModal(false)}>
        <Modal.Header closeButton><Modal.Title>About Us</Modal.Title></Modal.Header>
        <Modal.Body><AboutModal /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowAboutModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton><Modal.Title>Contact Us</Modal.Title></Modal.Header>
        <Modal.Body><ContactModal /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowContactModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)}>
        <Modal.Header closeButton><Modal.Title>Privacy Policy</Modal.Title></Modal.Header>
        <Modal.Body><PrivacyModal /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      <Modal show={showCustomerServiceModal} onHide={() => setShowCustomerServiceModal(false)}>
        <Modal.Header closeButton><Modal.Title>Customer Service</Modal.Title></Modal.Header>
        <Modal.Body><CustomerServiceModal /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowCustomerServiceModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      {/* CSS */}
      <style>{`
  /* Footer Styling */
  .custom-footer {
    background-color: #222;
    color: #ddd;
    padding: 3rem 0;
    font-family: 'Segoe UI', sans-serif;
  }

  .custom-footer h4,
  .custom-footer h5 {
    color: #4A6CF7;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .custom-footer p {
    font-size: 15px;
    line-height: 1.6;
  }

  .custom-footer ul {
    padding: 0;
    list-style: none;
  }

  .custom-footer li {
    margin-bottom: 10px;
  }

  .custom-footer .footer-link {
    color: #ddd !important;
    font-size: 15px;
    text-align: left;
    padding: 0;
  }

  .custom-footer .footer-link:hover {
    color: #FF7F50 !important;
    text-decoration: underline;
  }

  .custom-footer .social-icons .icon {
    color: #FF7F50;
    font-size: 1.3rem;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .custom-footer .social-icons .icon:hover {
    transform: scale(1.2);
    color: #4A6CF7;
  }

  .footer-bottom {
    font-size: 14px;
    color: #aaa;
    margin-top: 30px;
  }

  /* Modal Styling */
  .modal-content {
    background-color: #fff !important;
    color: #000 !important;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }

  .modal-header {
    border-bottom: 1px solid #dee2e6;
  }

  .modal-footer {
    border-top: 1px solid #dee2e6;
  }

  .modal-title {
    color: #4A6CF7 !important;
    font-weight: 600;
  }

  .modal-body p,
  .modal-body li {
    color: #000 !important;
    font-size: 15px;
    line-height: 1.6;
  }

  /* Responsive Enhancements */
  @media (max-width: 768px) {
    .custom-footer {
      text-align: center;
    }

    .custom-footer .social-icons {
      justify-content: center;
    }

    .custom-footer .footer-link {
      text-align: center;
    }
  }
`}</style>

    </>
  );
};

export default Footer;
