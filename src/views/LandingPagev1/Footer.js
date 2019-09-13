import React from 'react';
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

export default function Landing() {
    const [name, setName] = React.useState(undefined);
    const [email, setEmail] = React.useState(undefined);
    const [message, setMessage] = React.useState(undefined);
    const [submitted, setSubmitted] = React.useState(true);
    const [error, setError] = React.useState(true);


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", data: { name: name, email: email, message: message } })
        })
            .then(() => {
                setSubmitted(false);
            })
            .catch(error => {
                setError(false);
            });

    }

    return (
        <div>
            <div id="contact" className="section bgform" id="contact">
                <div className="wrapper">
                    <div className="row-2">
                        <div className="col lg-6" />
                        <div className="col lg-1" />
                    </div>
                    <div className="row-2">
                        <div className="col lg-5 align-vertically" />
                        <div className="col lg-6">
                            <div className="contact-form-container card">
                                <div className="margin-bottom">
                                    <p>Have some question or feedback?<br /></p>
                                    <h2 className="heading-4">Get in touch</h2>
                                </div>
                                <div className="form w-form">
                                    <form id="email-form" name="email-form" data-name="Email Form" onSubmit={handleSubmit}>
                                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Enter your name" id="name-2" />
                                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="text-field w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Enter your email" id="email-2" required />
                                        <textarea id="field-2" value={message} onChange={(e) => { setMessage(e.target.value) }} name="field-2" placeholder="Your message" maxLength={5000} data-name="Field 2" className="text-area w-input" defaultValue={""} />
                                        <input type="submit" defaultValue="Send message" data-wait="Please wait..." className="button2 w-button" />
                                    </form>
                                    <div hidden={submitted} className="w-form-done">
                                        <div>Thank you! Your submission has been received!</div>
                                    </div>
                                    <div hidden={error} className="w-form-fail">
                                        <div>Oops! Something went wrong while submitting the form.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><img src="/images/r5.png" width="500" data-w-id="47dfd708-6a6f-0d86-c48a-9297d9394903" style={{ WebkitTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-6" /></div>
            <div className="section bggradient">
                <div className="wrapper">
                    <div className="flex-horizontal-space-between footer">
                        <a href="#" className="w-inline-block"><img src="/images/logo2.png" width={75} height={75} alt="" className="footer-logo" /></a>
                        <div className="horizontal-footer-links-container">
                            <Link to="/platform" className="footer-link-2 spacing">Platform</Link>
                            <Link to="/partners" className="footer-link-2 spacing">Partners</Link>
                            <Link to="/solutions" className="footer-link-2 spacing">Solutions</Link>
                            <Link to="/industry" className="footer-link-2 spacing">Industry</Link>
                            <Link to="/aboutus" className="footer-link-2 spacing">About Us</Link>
                            <Link to="/login" className="footer-link-2 spacing">Get Started</Link>
                        </div>
                        <div className="footer-social-links-container">
                            <a href="https://www.youtube.com/channel/UCFfwRoYGUfccrImWl4drlqA?view_as=subscriber" target="_blank" className="footer-link-2 no-padding w-inline-block"><img src="images/iconmonstr-youtube-6.png" width={30} alt="" className="social-media-icon" /></a>
                            <a href="https://twitter.com/arthanium" className="footer-link-2 no-padding w-inline-block" target="_blank"><img src="images/iconmonstr-twitter-1.png" width={30} alt="" className="social-media-icon" /></a>
                            <a href="https://www.instagram.com/arthanium/" className="footer-link-2 no-padding w-inline-block" target="_blank"><img src="images/iconmonstr-instagram-11.png" width={30} alt="" className="social-media-icon" /></a>
                            <a href="https://www.facebook.com/Arthanium-101627941214756/" className="footer-link-2 no-padding w-inline-block" target="_blank"><img src="images/iconmonstr-facebook-1.png" width={24} alt="" className="social-media-icon" /></a></div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "white", display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="textSecondary" align="right">
                    {'Copyright © '}
                    <Link color="none" style={{}} href="https://www.arthanium.com">
                        www.arthanium.com
              </Link>{' '}
                    {new Date().getFullYear()}
                    {'. Powered by '}
                    <Link color="inherit" href="https://www.arthanium.org">
                        Arthanium.
              </Link>
              {/* {' Contact us at '} */}
                    {/* <Link color="none" style={{}} href="info@arthanium.com">
                         info@arthanium.com
              </Link> */}
                </Typography>
            </div>
        </div >
    );
}
