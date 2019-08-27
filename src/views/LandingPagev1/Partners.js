import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Header from './Header';
import Footer from './Footer';
export default function Partners(props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div className="body">
            <Header />
            <div className="section full-screen background-image-side">
                <div className="wrapper">
                    <div className="columns column w-row">
                        <div className="w-col-1" />
                        <div className="column herocontent w-col w-col-10">
                            <h2 className="heading">	Platform brings together various stakeholders of trade & supply chain on one network
	including banks, insurance logistics, government, certification agencies & others 								</h2>
                            <h4 className="short-paragraph">Problems -	Delays due to Paperwork, Manual Approvals, Forged Doccuments, Payment Disputes,
	Partial / Empty Shipments,Transparency & Traceability of Transaction							</h4>
                            <div className="value-proposition-container">
                                <div className="value-proposition-buttons"><a href="/partners#solutionsforBusiness" className="button2 margin-left w-button">Scroll down to know more</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-9">

                <div className="section">
                    {/* <h1 style={{ textAlign: 'center' }} className="heading-2 ondark">Solutions for Business</h1> */}
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
                                    <h2 className="heading-2 ondark">Financial Services - Banks and Insurance</h2>
                                    <p className="ondark">Financial service providers, can observe automated trade flows on the platform after they are added to a project<br />
                                        Our digitized documentation application allows automation of doccumentation process & connected devices / sensors allow to track / trace product through its journey<br />
                                        Automation reduces the transaction time substantially and blockchain provides higher security and transparency<br />
                                        Proposed solutions for trade finance, import / export credit, guarantees, invoice factoring					</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Logistics</h2>
                                    <p className="ondark">Globally Shippers want to be more efficient and improve asset utilization to offer the most competitive prices.</p>
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
                                    <h2 className="heading-2 ondark">Government / Government Authorities</h2>
                                    <p className="ondark">Government / Government Authorities can be silent observers and monitor trade happening in a transparent way	<br />
                                        They can chose to automate their processes especially doccumentation.</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Certification Agencies</h2>
                                    <p className="ondark">Certfication agencies will be able to digitally certify organizations seeking certification on the platform</p>
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
                                    <h2 className="heading-2 ondark">Hardware / Software Integrators </h2>
                                    <p className="ondark">Hardware / Software developers for supply chain are welcome to build their applications around our ecosystem<br />
                                        Existing systems can be made blockchain compatible through open API's					</p>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-5">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark">Ports & Terminals</h2>
                                    <p className="ondark">	Port communities and terminal operators are seeking ways to reduce the cost of connecting partners in the supply chain
	increase stack placement efficiency and optimize truck and vessel service times.					</p>
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
                                    <h2 className="heading-2 ondark">Recyclers</h2>
                                    <p className="ondark">Circular economy - Turn waste to value, looped supply chains, reverse logistics.<br />
                                        Extend working lifecycle of products and components by repairing, upgrading and reselling.<br />
                                        Reuse or refurbish materials - Recover useful resources / energy out of disposed products.<br />					</p>
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
