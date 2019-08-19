import React from 'react';

const WebsiteFooter = () => {
    return (
      <footer className="main-footer">
        <div className="auto-container">
          {/*Widgets Section*/}
          <div className="widgets-section">
            <div className="clearfix">
              {/*Footer Column*/}
              <div className="footer-column">
                <div className="footer-widget links-widget">
                  <h2>Company</h2>
                  <ul className="footer-list">
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                  </ul>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column">
                <div className="footer-widget links-widget">
                  <h2>Download</h2>
                  <ul className="footer-list">
                    <li><a href="#">iOS</a></li>
                    <li><a href="#">Android</a></li>
                  </ul>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column">
                <div className="footer-widget links-widget">
                  <h2>Quick Link</h2>
                  <ul className="footer-list">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column">
                <div className="footer-widget links-widget">
                  <h2>Support</h2>
                  <ul className="footer-list">
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">FAQ's</a></li>
                    <li><a href="#">Privacy</a></li>
                  </ul>
                </div>
              </div>
              {/*Footer Column*/}
              <div className="footer-column">
                <div className="footer-widget links-widget">
                  <h2>Address</h2>
                  <ul className="footer-list">
                    <li>(+91) 9892935802</li>
                    <li>sandesh@arthanium.com</li>
                    <li>Mumbai, India</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="auto-container">
            {/* Logo */}
            <div className="logo">
              <a href="index.html"><img src={require("../../websiteAssets/logo/logo.png")} width="80px" height="80px" alt="Image" /></a>
            </div>
            {/* Copyright */}
            <div className="copyright">Copyright © 2019 Arthanium . All Rights Reserved.</div>
            {/* Social Nav */}
            <div className="social-nav">
              <a href="https://www.facebook.com/Arthanium-776493409393469/"><span className="fa fa-facebook" /></a>
              <a href="https://twitter.com/arthanium"><span className="fa fa-twitter" /></a>
              <a href="https://www.linkedin.com/company/arthanium/about/"><span className="fa fa-linkedin" /></a>
            </div>
          </div>
        </div>
        {/* End Footer Bottom */}
      </footer>
    )
}
export default WebsiteFooter;