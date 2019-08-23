import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import '../../WA/css/normalize.css'
import '../../WA/css/detheme.css'
import '../../WA/css/kergan.detheme.css'


export default function Landing(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const [projects, setProjects] = React.useState(0);
    const [partners, setPartners] = React.useState(0);
    const [products, setProducts] = React.useState(0);

    return (
        <div className="body">
            <div data-collapse="medium" data-animation="default" data-duration={400} className="nav-bar w-nav">
                <div className="wrapper navbar-2 w-container">
                    <div className="div-block-8"><a href="#" className="nav-logo-2 w-inline-block"><img src="images/logo3.png" width={75} height={75} alt="" /></a></div>
                    <nav role="navigation" className="nav-menu-2 w-nav-menu"><a href="#product" className="nav-link-2 w-nav-link">Platform</a><a href="#Solutions" className="nav-link-2 w-nav-link">Partners</a><a href="#features" className="nav-link-2 w-nav-link">Solutions</a><a href="#testimonials" className="nav-link-2 w-nav-link">Industry</a><a href="#contact" className="nav-link-2 w-nav-link">About Us</a>
                        <div className="nav-cta-button-container"><a href="/login" className="nav-link-2 border w-nav-link">Get Started</a></div>
                    </nav>
                    <div className="menu-button-2 w-nav-button">
                        <div className="burger-icon w-icon-nav-menu" />
                    </div>
                </div>
            </div>
            <div className="section full-screen background-image-side">
                <AutoPlaySwipeableViews>
                    <div className="wrapper">
                        <div className="columns column w-row">
                            <div className="column herocontent w-col w-col-5">
                                <h1 className="heading">Decentralized Trade and Supply Chain<br /> on Blockchain</h1>
                                <p className="short-paragraph">Building solutions for transparency, automating processes, trade finance and protecting your brand from counterfeiting.</p>
                                <p className="short-paragraph">Leverage the power of digitized doccumentation, connected IoT devices, & smart contracts with our Dapps.</p>
                                <div className="value-proposition-container">
                                    <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                </div>
                            </div>
                            <div className="w-col w-col-7"><img src="/images/r2.png" width={1000} height={380} srcSet="/images/r2.png 500w, /images/r2.png 800w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 45vw" alt="" className="image" /></div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="columns column w-row">
                            <div className="column herocontent w-col w-col-7"><img src="/images/two.png" width={1000} height={380} srcSet="/images/two.png 500w, /images/two.png 800w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 45vw" alt="" className="image" /></div>
                            <div className="w-col w-col-5">
                                <h1 className="heading">Anti-Counterfeiting, Provenance and  <br /> Chain of Custody</h1>
                                <p className="short-paragraph">Create digital identities for physical assets through unique identifiers like connected IoT Devices / Sensors and track them through their journey and make selective information available to all stakeholders..</p>
                                <div className="value-proposition-container">
                                    <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AutoPlaySwipeableViews>
            </div>
            <div className="div-block-9">
                <div className="section">
                    {/* <div className="wrapper-2 space-around">
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={87} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                    </div> */}
                </div>
                <div id="product" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2">
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">What is Arthanium ?</h2>
                                    <p className="ondark">A decentralized platform for organizations to create trade consortiums for their various projects & bring all stakeholders on one platform.</p>
                                </div>
                                <div className="row-2">
                                    <div className="col lg-6 sm-1">
                                        <div>
                                            <h3 className="ondark">More Dynamic</h3>
                                            <p className="ondark">Access to more credible information on time for quicker decision making.</p>
                                        </div>
                                    </div>
                                    <div className="col lg-6 sm-1">
                                        <div>
                                            <h3 className="ondark">More Efficient</h3>
                                            <p className="ondark">Eliminate low value task so that people can focus on higher value activities.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col lg-6 sm-1"> */}
                                <div>
                                    <h3 className="ondark">More Value</h3>
                                    <p className="ondark">Integrate diverse activities between stake holders more effectively to create additional value and eliminate gaps.</p>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Solutions" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2 sm-reverse">
                            <div className="col lg-1 hidden-lg-down" />
                            <div className="col lg-4 sm-2 lg-vertical-align">
                                <div className="sm-align-centre">
                                    <h2 className="ondark">How does it work?</h2>
                                    {/* <p className="margin-bottom ondark">Our optimized configuration process saves your team time when running and scaling distributed applications, AI &amp; machine learning workloads, hosted services, client websites, or CI/CD environments.</p> */}
                                </div>
                                {/* <div className="row-2"> */}
                                <div className="col lg-12 sm-1">
                                    <div>
                                        <h3 className="ondark">Buyers / Sellers</h3>
                                        <p className="ondark">Register your organization on the platform, create projects, connect with partners & experience decentralized trade.</p>
                                    </div>
                                </div>
                                <div className="col lg-12 sm-1">
                                    <div>
                                        <h3 className="ondark">Partners</h3>
                                        <p className="ondark">Organizations can search / add partners for their supply chain Come onboard If you are in Banking, Logistics, Insurance, Certification.</p>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <div className="flex-readmore">
                                    <div className="readmore ondark"><a href="#" className="link">Learn More</a></div>
                                    <div className="icon"><br />‍</div>
                                </div> */}
                            </div>
                            <div className="col lg-1 hidden-lg-down" />
                            <div className="col lg-6"><iframe width="550" height="350"
                                src="https://www.youtube.com/embed/SSo_EIwHSd4" frameborder="0" allowfullscreen>
                            </iframe></div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="features" className="section">
                <div className="wrapper">
                    <h2 data-w-id="7b5c466a-962a-8742-1d10-203f426a0c19" style={{ opacity: 1 }} className="section-header withdesc">Why Arthanium?</h2>
                    {/* <p className="short-paragraph sectionsub">Built with education agencies in mind, Kergan is packed with features that you will actually use in your day-to-day business operations</p> */}
                    <div className="row-2">
                        <div className="col lg-3">
                            <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c1d" style={{ opacity: 1, justifyContent: 'center' }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/commision.png" width={150} alt="" className="icon" />
                                <h4>Blockchain</h4>
                                <p className="paragraph"><strong>Secure &nbsp;</strong>
                                    Heterogenous multi chain blockchain architecture Scalable, Interoperable Secure & High TPS.</p>
                            </div>
                        </div>
                        <div className="col lg-3">
                            <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c24" style={{ opacity: 1 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/timeline.png" width={150} alt="" className="icon" />
                                <h4>DApps</h4>
                                <p className="paragraph">Automate
Decentralized Apps ecosystem for digitized doccumentation, connected devices & trade finance.</p>
                            </div>
                        </div>
                        <div className="col lg-3">
                            <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c2b" style={{ opacity: 1 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/team.png" width={150} alt="" className="icon" />
                                <h4>Partners</h4>
                                <p className="paragraph">Collaborate
Brings all diverse stakeholders on one platform Integrate diverse activities more efficiently.</p>
                            </div>
                        </div>
                        <div className="col lg-3">
                            <div data-w-id="7b5c466a-962a-8742-1d10-203f426a0c32" style={{ opacity: 1 }} className="margin-bottom"><img src="http://detheme.com/templates/kergan/images/report.png" width={150} alt="" className="icon" />
                                <h4>Industry 4.0</h4>
                                <p className="paragraph">Innovate
Unlock new opportunities Eliminate low value activities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section bglite">
                <div className="wrapper">
                    <div className="row-2 align-centre">
                        <div className="col lg-6 md-3 xs-2">
                            <div className="centre-align">
                                <div className="margin-bottom">
                                    <h2 className="section-header withdesc ondark">A native app for every platform</h2>
                                    <p className="ondark">The platform is accessible on both web and mobile.</p>
                                    <div className="row-2 align-centre">
                                        <div className="col lg-6">
                                            <a href="#" className="link-block w-inline-block"><img src="images/nm11.png" width={1000} height={500} alt="" className="image-2" /></a>
                                        </div>
                                        <div className="col lg-6">
                                            <a href="#" className="w-inline-block"><img src="images/b.png" width={500} width={500} alt="" className="image-3" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="download" data-w-id="198c5aed-cf25-e317-0851-2c0c40bfb7e9" className="bgkluwer" />
            </div> */}
            <div id="testimonials" className="section bgtestimonial1">
                <div className="mask w-slider-mask">
                    <div className="wrapper">
                        <h2 style={{ paddingBottom: 30 }} className="section-header withdesc">Pricing Plan</h2>
                        <div className="row-2">
                            <div className="col lg-4" style={{ paddingBottom: 10 }}>
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="payment-plan-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp3.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">PRO</h4>
                                                    <p className="testimonial-text">400 Credits</p>
                                                    <h5 className="heading-3">$49/Month</h5>
                                                </div>
                                                <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col lg-4" style={{ paddingBottom: 10 }}>
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="payment-plan-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp1.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">BUSINESS</h4>
                                                    <p className="testimonial-text">1200 Credits</p>
                                                    <h5 className="heading-3">$149/Month</h5>
                                                </div>
                                                <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col lg-4" style={{ paddingBottom: 10 }}>
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="payment-plan-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">ENTERPRISE</h4>
                                                    <p className="testimonial-text">3600 Credits</p>
                                                    <h5 className="heading-3">$449/Month</h5>
                                                </div>
                                                <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section"> */}
            <div className="wrapper">
                <div className="row">
                    <div className="columns-2 w-row">
                        <div className="column-2 w-col w-col-6">
                            <div className="margin-bottom">
                                <h2 className="heading-2">Note</h2>
                                <p>Note -
Setup and customization charges could be applicable for certain customers.
For larger customized plans contact us directly.
Adittional monthly credits packs can be purchased at $ 49 for 400 Credits.
Validity of plan & credits is one month and it cannot be carried forward.
Currently we don’t charge any transaction based fee, but in future we might move to a transaction based fee model.</p>
                            </div>
                        </div>
                        <div className=" w-col w-col-6" style={{ textAlign: "-webkit-center", paddingTop: 50, paddingBottom: 50 }}>
                            <div data-animation="slide" data-duration={500} data-infinite={1} className="carousel">
                                <table className="tg">
                                    <tr>
                                        <th className="tg-rnhl" colspan="4">Credit Chart</th>
                                    </tr>
                                    <tr>
                                        <td className="tg-rnhl">name</td>
                                        <td className="tg-rnhl">Credits Used</td>
                                        <td className="tg-rnhl" colspan="2">Credit Calculator</td>
                                    </tr>
                                    <tr>
                                        <td className="tg-rnhl">Projects</td>
                                        <td className="tg-rnhl">75</td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}} value={projects} onChange={(e) => { setProjects(e.target.value) }} placeholder="Enter no. of project" /></td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}}  value={parseInt(projects) * 75} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td className="tg-rnhl">Partners</td>
                                        <td className="tg-rnhl">15</td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}}  value={partners} onChange={(e) => { setPartners(e.target.value) }} placeholder="Enter no. of partners" /></td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}}   value={parseInt(partners) * 15} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td className="tg-rnhl">Products / Docs / Devices</td>
                                        <td className="tg-g2pk">1</td>
                                        <td className="tg-rnhl"><input type="number"  style={{width:50}}  value={products} onChange={(e) => { setProducts(e.target.value) }} placeholder="Enter no. of products / docs / devices" /></td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}}   value={products} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td className="tg-g2pk" colspan="1"></td>
                                        <td className="tg-g2pk" colspan="2">Total</td>
                                        <td className="tg-rnhl"><input type="number" style={{width:50}}  value={parseInt(projects * 75) + parseInt(partners * 15) + parseInt(products)}  readOnly placeholder="Total" /></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div id="testimonials" className="section bgtestimonial">
                <div>
                    <div data-delay={4000} data-animation="slide" className="slider-3 w-slider" data-autoplay={1} data-easing="ease-in-out-expo" data-hide-arrows={1} data-nav-spacing={10} data-duration={1200} data-infinite={1}>
                        <div className="mask w-slider-mask">
                            <div className="slide w-slide">
                                <div className="container-div">
                                    <div className="testimonial-container">
                                        <div className="testimonial-content"><img src="https://via.placeholder.com/350x300" alt="" className="image-5" />
                                            <div className="quote-circle">
                                                <p className="big-quote">“</p>
                                            </div>
                                            <h4 className="testimonial-title">Detheme has done great job so far</h4>
                                            <p className="testimonial-text">We were very impressed with the quality and speed at which tasks were accomplished. Extremely appreciative of the senior leadsership and the effectivness it has on the day to day operations of the company. <br /></p>
                                            <h5 className="heading-3">Tom Shah</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-slide">
                                <div className="container-div">
                                    <div className="testimonial-container">
                                        <div className="testimonial-content"><img src="https://via.placeholder.com/350x300" alt="" className="image-5" />
                                            <div className="quote-circle">
                                                <p className="big-quote">“</p>
                                            </div>
                                            <h4 className="testimonial-title">Detheme has done great job so far</h4>
                                            <p className="testimonial-text">We were very impressed with the quality and speed at which tasks were accomplished. Extremely appreciative of the senior leadsership and the effectivness it has on the day to day operations of the company. <br /></p>
                                            <h5 className="heading-3">Tom Shah</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-slide">
                                <div className="container-div">
                                    <div className="testimonial-container">
                                        <div className="testimonial-content"><img src="https://via.placeholder.com/350x300" alt="" className="image-5" />
                                            <div className="quote-circle">
                                                <p className="big-quote">“</p>
                                            </div>
                                            <h4 className="testimonial-title">Detheme has done great job so far</h4>
                                            <p className="testimonial-text">We were very impressed with the quality and speed at which tasks were accomplished. Extremely appreciative of the senior leadsership and the effectivness it has on the day to day operations of the company. <br /></p>
                                            <h5 className="heading-3">Tom Shah</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-slide">
                                <div className="container-div">
                                    <div className="testimonial-container">
                                        <div className="testimonial-content"><img src="https://via.placeholder.com/350x300" alt="" className="image-5" />
                                            <div className="quote-circle">
                                                <p className="big-quote">“</p>
                                            </div>
                                            <h4 className="testimonial-title">Detheme has done great job so far</h4>
                                            <p className="testimonial-text">We were very impressed with the quality and speed at which tasks were accomplished. Extremely appreciative of the senior leadsership and the effectivness it has on the day to day operations of the company. <br /></p>
                                            <h5 className="heading-3">Tom Shah</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hide w-slider-arrow-left">
                            <div className="w-icon-slider-left" />
                        </div>
                        <div className="hide w-slider-arrow-right">
                            <div className="w-icon-slider-right" />
                        </div>
                        <div className="slide-nav-2 w-slider-nav w-slider-nav-invert w-round" />
                    </div>
                </div>
            </div>
            <div id="contact" className="section bgform">
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
                                    <form id="email-form" name="email-form" data-name="Email Form"><input type="text" className="text-field w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Enter your name" id="name-2" /><input type="text" className="text-field w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Enter your email" id="email-2" required /><textarea id="field-2" name="field-2" placeholder="Your message" maxLength={5000} data-name="Field 2" className="text-area w-input" defaultValue={""} /><input type="submit" defaultValue="Send message" data-wait="Please wait..." className="button2 w-button" /></form>
                                    <div className="w-form-done">
                                        <div>Thank you! Your submission has been received!</div>
                                    </div>
                                    <div className="w-form-fail">
                                        <div>Oops! Something went wrong while submitting the form.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><img src="/images/r5.png" width="500" data-w-id="47dfd708-6a6f-0d86-c48a-9297d9394903" style={{ WebkitTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0PX, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-6" /></div>
            <div className="section bggradient">
                <div className="wrapper">
                    <div className="flex-horizontal-space-between footer"><a href="#" className="w-inline-block"><img src="/images/logo2.png" width={75} height={75} alt="" className="footer-logo" /></a>
                        <div className="horizontal-footer-links-container"><a href="#" className="footer-link-2 spacing">
                            Platform</a><a href="/partner" className="footer-link-2 spacing">Partners</a><a href="#" className="footer-link-2 spacing">Solutions</a><a href="#" className="footer-link-2 spacing">Industry</a><a href="#" className="footer-link-2 spacing">About Us</a><a href="/login" className="footer-link-2 spacing">Get Started</a></div>
                        <div className="footer-social-links-container"><a href="#" className="footer-link-2 no-padding w-inline-block"><img src="images/iconmonstr-youtube-6.png" width={30} alt="" className="social-media-icon" /></a><a href="#" className="footer-link-2 no-padding w-inline-block"><img src="images/iconmonstr-twitter-1.png" width={30} alt="" className="social-media-icon" /></a><a href="#" className="footer-link-2 no-padding w-inline-block"><img src="images/iconmonstr-instagram-11.png" width={30} alt="" className="social-media-icon" /></a><a href="#" className="footer-link-2 no-padding w-inline-block"><img src="images/iconmonstr-facebook-1.png" width={24} alt="" className="social-media-icon" /></a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
