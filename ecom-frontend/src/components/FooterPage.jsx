import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "./FooterPage.css";

export default function FooterPage() {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <img
                        src="../images/stepmatters-logo.jpg"
                        alt="Step Matters"
                        className="logo-footer"
                    />
                    <h2>STEP MATTERS</h2>
                    <p>
                        Crafted with passion. Designed for comfort.
                        Every pair is made to ensure that every step
                        you take truly matters.
                    </p>
                    <div className="footer-icons">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaTwitter />
                    </div>
                </div>
                <div className="footer-links">
                    <div>
                        <h3>Company</h3>
                        <p>About Us</p>
                        <p>FAQs</p>
                        <p>Contact Us</p>
                        <p>Stores</p>
                    </div>
                    <div>
                        <h3>Support</h3>
                        <p>Shipping Info</p>
                        <p>Returns</p>
                        <p>Refund Policy</p>
                        <p>Order Tracking</p>
                    </div>
                    <div>
                        <h3>Legal</h3>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>Cookies Policy</p>
                        <p>Legal Notice</p>
                    </div>
                    <div>
                        <h3>Contact</h3>
                        <p>
                            <FaMapMarkerAlt />
                            Manila, Philippines
                        </p>
                        <p>
                            <FaEnvelope />
                            stepmatters@gmail.com
                        </p>
                        <p>
                            <FaPhoneAlt />
                            +63 927-532-1604
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                © 2026 Step Matters. All Rights Reserved.
            </div>
        </footer>
    );
}