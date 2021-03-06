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
            <div className="section full-screen background-image-side" style={{ padding: 0 }}>
                <div style={{ textAlign: 'center' }}>
                    <br /><br /><br />
                    <div className="columns column w-row" style={{ display: 'inline-block', verticalAlign: 'middle' }} className="image-box">
                        <img src={require('../../WA/images/newimgs/13.png')} height={400} />
                        <div class="text">
                            <h1>PARTNERS</h1>
                        </div>
                    </div>
                    <div className="columns column w-row">
                        {/* <div className="w-col-1" /> */}
                        <div className="column herocontent w-col w-col-10" style={{justifyContent:'center'}}>
                            <p className="v1-paragraph" style={{ textAlign: "justify", paddingTop: 50 }}>	Platform brings together various stakeholders of trade & supply chain on one network
including banks, insurance logistics, government, certification agencies & others.								</p>
                            <p className="v1-paragraph" style={{ textAlign: "justify" }}>Problems -	Delays due to Paperwork, Manual Approvals, Forged Documents, Payment Disputes,
Partial / Empty Shipments,Transparency & Traceability of Transaction.							</p>
                            {/* <div className="value-proposition-container">
                              <div className="value-proposition-buttons"><a href="/partners#solutionsforBusiness" className="button2 margin-left ghost hero w-button">Scroll down to know more</a></div>
                          </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-block-new-1">
                <div id="solutionsforBusiness" className="section less-v-margin">
                    <div className="wrapper">
                        <div className="row-2" style={{ display: "flex", alignItems: "center" }}>
                            <div className="col lg-4 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/6-1.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6" id="banks" >
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Financial Services - Banks and Insurance</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Financial service providers, can observe automated trade flows on the platform after they are added to a project.</li>
                                        <li className="tab-class-inner">  Our digitized documentation application allows automation of documentation process & connected devices / sensors allow to track / trace product through its journey.</li>
                                        <li className="tab-class-inner">  Automation reduces the transaction time substantially and blockchain provides higher security and transparency.</li>
                                        <li className="tab-class-inner">  Proposed solutions for trade finance, import / export credit, guarantees, invoice factoring	.</li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-4" id="logistics">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Logistics</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Globally Shippers want to be more efficient and improve asset utilization to offer the most competitive prices.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/31.png')} />
                            </div>
                            <div className="col lg-4 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/16.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6" id="government">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Government / Government Authorities</h2>

                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Government / Government Authorities can be silent observers and monitor trade happening in a transparent way.</li>
                                        <li className="tab-class-inner">  They can chose to automate their processes especially documentation.</li>
                                    </ul>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col lg-4" id="certificationagencies">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Certification Agencies</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Certfication agencies will be able to digitally certify organizations seeking certification on the platform.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/28.png')} />
                            </div>
                            <div className="col lg-4 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/2.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6" id="portsandterminals">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Ports & Terminals</h2>
                                    {/* <p className="ondark">
                                        .					</p> */}
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Port communities and terminal operators are seeking ways to reduce the cost of connecting partners in the supply chain.</li>
                                        <li className="tab-class-inner">  Increase stack placement efficiency and optimize truck and vessel service times.</li>
                                    </ul>
                                </div>
                            </div>



                            <div className="col lg-4" id="hardwaresoftwareintegrators">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Hardware / Software Integrators </h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Hardware / Software developers for supply chain are welcome to build their applications around our ecosystem.</li>
                                        <li className="tab-class-inner">  Existing systems can be made blockchain compatible through open API's.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-5 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/10.png')} />
                            </div>

                            {/* 2 */}

                            <div className="col lg-4 extra-pad">
                                <img style={{ filter: "drop-shadow(16px 16px 10px gray)" }} src={require('../../WA/images/new/29.png')} />
                            </div>
                            <div className="col lg-1" />
                            <div className="col lg-6" id="recyclers">
                                <div className="margin-bottom">
                                    <h2 className="heading-2 ondark" style={{ color: "#333", }}>Recyclers</h2>
                                    <ul className="tab-class-main">
                                        <li className="tab-class-inner">  Circular economy - Turn waste to value, looped supply chains, reverse logistics.</li>
                                        <li className="tab-class-inner">  Extend working lifecycle of products and components by repairing, upgrading and reselling.</li>
                                        <li className="tab-class-inner">  Reuse or refurbish materials - Recover useful resources / energy out of disposed products.</li>
                                    </ul>
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
