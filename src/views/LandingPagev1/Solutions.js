import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Header from './Header';
import Footer from './Footer';

export default function Solutions(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header />
            <div className="section full-screen background-image-side">
                <div className="wrapper">
                    <div className="columns column w-row">
                        <div className="column herocontent w-col w-col-6">
                            <h2 className="heading">At Arthanium<br /> we are creating an eco-system of Dapps around the platform to enable various use cases to make supply chains less complicated</h2>

                            <div className="value-proposition-container">
                                <div className="value-proposition-buttons"><a href="/demo" className="button2 margin-left w-button">GET TOUR</a><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                            </div>
                        </div>
                        <div className="w-col w-col-6">
                            <AutoPlaySwipeableViews>
                                {/* <div className="row-2">
                                    <div className="col lg-4" style={{ paddingBottom: 10 }}> */}
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="solution-slider-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp3.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">DocConekt</h4>
                                                    <p className="testimonial-text">Share Trade Doccuments securely with privacy
Access based on combination of role & permission
Permissioned Upload, download, Edit and Viewing
Share Documents with Partners for viewing or Action		</p>

                                                </div>
                                                {/* <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <div className="col lg-4" style={{ paddingBottom: 10 }}> */}
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="solution-slider-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp1.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">IoTConekt</h4>
                                                    <p className="testimonial-text">Securely links IoT identities to physical assets
Create digital identity and  provenance		</p>
                                                    {/* <h5 className="heading-3">$149/Month</h5> */}
                                                </div>
                                                {/* <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <div className="col lg-4" style={{ paddingBottom: 10 }}> */}
                                <div className="slide w-slide">
                                    <div className="container-div">
                                        <div className="solution-slider-container">
                                            <div className="payment-testimonial-content"><img src="/images/kp.png" alt="" className="image-5" />
                                                <div style={{ paddingTop: 20 }}>
                                                    <h4 className="testimonial-title">Trade Finance</h4>
                                                    <p className="testimonial-text">Coming Soon</p>
                                                    {/* <h5 className="heading-3">$449/Month</h5> */}
                                                </div>
                                                {/* <div className="value-proposition-container">
                                                    <div className="value-proposition-buttons"><a href="/login" className="button2 ghost hero w-button">GET STARTED</a></div>
                                                    <br />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div>
                                </div> */}
                            </AutoPlaySwipeableViews>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-9">

                <div className="section">
                    <h1 style={{ textAlign: 'center' }} className="heading-2 ondark">Solutions for Business</h1>
                    {/* <div className="wrapper-2 space-around">
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={109} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" width={87} alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                        <div className="partner-logo-container"><img src="https://via.placeholder.com/250" alt="" className="partner-logo" /></div>
                    </div> */}
                </div>
                <div id="solutionsforBusiness" className="section less-v-margin">
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
                                    <h2 className="heading-2 ondark">Supply Chain – Track & Trace</h2>
                                    <p className="ondark">Provide proof of any supply chain event or data point to a customer, vendor, regulator, or end consumer.<br />
                                        Key events in a supply chain are securely logged to a blockchain.<br />
                                        Access granted to supply chain partners on selective basis to "view" data on blockchain.<br />
                                        Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&B, precious metals, Industrials.<br />						</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Automation</h2>
                                    <p className="ondark">A ecosystem built around this can automate various cogs of global trade including trade finance,
	digitized doccumentation, provenance & supply chain.<br /> Time consuming work flows can be
	simplified using smart contracts.					</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
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
                                    <h2 className="heading-2 ondark">Track & Trace</h2>
                                    <p className="ondark">Operations Visibility Track and Trace, Chain of Custody. Securely track journey of a product / asset from production to market place.	<br />
                                        Various stakeholders can be connected through blockchain and access immutable information about products / assets throughout the journey.	<br />
                                        Using sensors can enhance the level of information. eg. temperature controlled logistics. <br />							</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Anti-Counterfeit</h2>
                                    <p className="ondark">	Secure, unique & low cost asset identifiers with blockchain registrations.<br />
                                        Keep a confidential & private record of chain of custody, validating that the chain has been maintained, without revealing proprietary data.<br />
                                        Track & synchronize chain of custody of physical object & digital record with IoT or audit-driven attestations.<br />
                                        Industry – Luxury, Fashion consumer electronics, Art / collectibles, Pharmaceuticals, F&B, precious metals.<br />							</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
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
                                    <h2 className="heading-2 ondark">Anti-Diversion</h2>
                                    <p className="ondark">Secure asset identities combined with blockchain registrations & chain-of-custody.	<br />
                                        Track product movements & identify where diversion occurred in the chain & intervene appropriately.		<br />
                                        Industries – Luxury, Pharmaceuticals, Consumer Electronics, Food & Beverages, Cosmetics.		</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Digital Identity & Provenance</h2>
                                    <p className="ondark">Tell the story of your brand and it's journey from production to market place.<br />
                                        Build trust and credibility with customers. Get a digital identity for physical products / assets on the.<br />
                                        block chain using a combination of connected tags which can be scanned using our app to reveal information.</p>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5">
                                <AutoPlaySwipeableViews>
                                    <img src="/images/m1.png" width={625} srcSet="/images/m1.png 500w, /images/m1.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="/images/2p.png" width={625} srcSet="/images/2p.png 500w, /images/2p.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                    <img src="http://detheme.com/templates/kergan/images/object-1.png" width={625} srcSet="http://detheme.com/templates/kergan/images/object-1.png, http://detheme.com/templates/kergan/images/object-1.png" sizes="(max-width: 479px) 100vw, (max-width: 767px) 89vw, (max-width: 991px) 45vw, 37vw" alt="" className="anim-b" />
                                </AutoPlaySwipeableViews>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="features" className="section">
                <div className="wrapper">
                    <h1 data-w-id="7b5c466a-962a-8742-1d10-203f426a0c19" style={{ opacity: 1 }} className="section-header withdesc">Solutions for Consumers</h1>
                    {/* <p className="short-paragraph sectionsub">Built with education agencies in mind, Kergan is packed with features that you will actually use in your day-to-day business operations</p> */}
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
                                    <h2 style={{ color: "#333", marginTop: 50 }}>For Consumer</h2>
                                    <h4>Look out for Arthanium compliant, products, assets & application</h4>
                                    <p style={{ color: "#333" }}>Use our consumer mobile app to scan custom NFC tags & know the journey and story behind the things you buy to make more confident
& informed choices.<br /> At Arthanium, we’re bringing provenance to the supply chain & empowering shopper’s with accurate information and powering the transparency movement through technology. 	<br />
                                        We work with reliable businesses and products to open verified information about their producers, origins and ingredients – creating transparency and accountability so you can trust what you buy.												</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
